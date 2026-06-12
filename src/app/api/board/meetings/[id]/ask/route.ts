import { NextResponse } from "next/server";
import { askBoardInMeeting, applyBoardComputation, getMeetingById } from "@/lib/server-board-store";
import type { AskBoardComputation } from "@/lib/ai-engine";
import { executives, type MeetingDebateTurn } from "@/lib/demo-data";

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function normalizeTone(input: string): MeetingDebateTurn["tone"] {
  if (input === "oppose") return "oppose";
  if (input === "caution") return "caution";
  return "support";
}

function toIsoMinuteTime(index: number) {
  const now = new Date();
  const minute = String((now.getUTCMinutes() + index) % 60).padStart(2, "0");
  const hour = String(now.getUTCHours() % 12 || 12).padStart(2, "0");
  return `${hour}:${minute} UTC`;
}

async function computeViaModel(meetingId: string, question: string): Promise<AskBoardComputation | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const meeting = await getMeetingById(meetingId);
  if (!meeting) return null;

  const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  const body = {
    model,
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an executive-board simulation engine. Return ONLY JSON with keys: recommendation (string), confidence (0-100 number), consensus (0-100 number), risks (string[] length 2-4), opportunities (string[] length 2-4), turns (array length 3 where each item has speaker, role, content, tone in support|caution|oppose).",
      },
      {
        role: "user",
        content: JSON.stringify({
          startup: "Nimbus",
          meeting: { id: meeting.id, title: meeting.title, topic: meeting.topic },
          executives: executives.map((exec) => ({ name: exec.name, role: exec.role, bias: exec.bias })),
          question,
          existing_recommendation: meeting.recommendation,
        }),
      },
    ],
  };

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) return null;
  const payload = (await response.json()) as OpenAIChatResponse;
  const content = payload.choices?.[0]?.message?.content;
  if (!content) return null;

  const parsed = JSON.parse(content) as {
    recommendation?: string;
    confidence?: number;
    consensus?: number;
    risks?: string[];
    opportunities?: string[];
    turns?: Array<{ speaker?: string; role?: string; content?: string; tone?: string }>;
  };

  if (!parsed.recommendation || !Array.isArray(parsed.risks) || !Array.isArray(parsed.opportunities) || !Array.isArray(parsed.turns)) {
    return null;
  }

  const newTurns: MeetingDebateTurn[] = parsed.turns.slice(0, 3).map((turn, index) => ({
    id: `ai-${Date.now()}-${index}`,
    time: toIsoMinuteTime(index),
    speaker: turn.speaker || executives[index]?.name || `Exec-${index + 1}`,
    role: turn.role || executives[index]?.role || "Executive",
    content: turn.content || "No additional commentary.",
    tone: normalizeTone(turn.tone || "support"),
  }));

  return {
    recommendation: parsed.recommendation,
    confidence: Math.max(0, Math.min(100, Math.round(parsed.confidence ?? 80))),
    consensus: Math.max(0, Math.min(100, Math.round(parsed.consensus ?? 80))),
    risks: parsed.risks.slice(0, 4),
    opportunities: parsed.opportunities.slice(0, 4),
    newTurns,
  };
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = (await request.json().catch(() => ({}))) as { question?: string };
  const question = payload.question?.trim();
  if (!question) {
    return NextResponse.json({ error: "Question is required" }, { status: 400 });
  }

  const aiComputed = await computeViaModel(id, question).catch(() => null);
  const meeting = aiComputed ? await applyBoardComputation(id, aiComputed) : await askBoardInMeeting(id, question);
  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }
  return NextResponse.json({ meeting });
}
