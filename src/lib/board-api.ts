import { computeBoardResponse } from "@/lib/ai-engine";
import { meetings as seedMeetings, type MeetingRecord } from "@/lib/demo-data";

export type AskBoardResponse = {
  meeting: MeetingRecord;
};

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(await response.text());
  return (await response.json()) as T;
}

function fallbackMeeting(meetingId: string) {
  return seedMeetings.find((meeting) => meeting.id === meetingId) ?? seedMeetings[0];
}

export async function listBoardMeetings(): Promise<MeetingRecord[]> {
  try {
    const response = await fetch("/api/board/meetings", { cache: "no-store" });
    const payload = await parseJson<{ meetings: MeetingRecord[] }>(response);
    return payload.meetings;
  } catch {
    return seedMeetings;
  }
}

export async function createMeeting(topic: string): Promise<MeetingRecord> {
  try {
    const response = await fetch("/api/board/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const payload = await parseJson<{ meeting: MeetingRecord }>(response);
    return payload.meeting;
  } catch {
    const id = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return {
      id,
      title: topic,
      topic,
      status: "live",
      consensus: 72,
      confidence: 74,
      recommendation: "RUN 30-DAY VALIDATION SPRINT BEFORE FULL COMMITMENT",
      risks: ["No backend persistence available"],
      opportunities: ["Demo mode fallback active"],
      turns: [],
    };
  }
}

export async function retrieveDiscussion(meetingId: string): Promise<MeetingRecord | null> {
  try {
    const response = await fetch(`/api/board/meetings/${meetingId}`, { cache: "no-store" });
    const payload = await parseJson<{ meeting: MeetingRecord }>(response);
    return payload.meeting;
  } catch {
    return fallbackMeeting(meetingId);
  }
}

export async function askBoard(meetingId: string, question: string): Promise<AskBoardResponse> {
  try {
    const response = await fetch(`/api/board/meetings/${meetingId}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const payload = await parseJson<{ meeting: MeetingRecord }>(response);
    return payload;
  } catch {
    const meeting = fallbackMeeting(meetingId);
    const computed = computeBoardResponse(meeting, question);
    return {
      meeting: {
        ...meeting,
        recommendation: computed.recommendation,
        confidence: computed.confidence,
        consensus: computed.consensus,
        turns: [...meeting.turns, ...computed.newTurns],
        risks: computed.risks,
        opportunities: computed.opportunities,
      },
    };
  }
}

export async function retrieveRecommendation(meetingId: string) {
  const meeting = await retrieveDiscussion(meetingId);
  if (!meeting) return { recommendation: "Unavailable", confidence: 0 };
  return {
    recommendation: meeting.recommendation,
    confidence: meeting.confidence,
  };
}

export async function retrieveContext() {
  try {
    const response = await fetch("/api/board/context", { cache: "no-store" });
    return await parseJson<{ startup: string; stage: string; runwayMonths: number }>(response);
  } catch {
    return { startup: "Nimbus", stage: "Series A", runwayMonths: 18 };
  }
}
