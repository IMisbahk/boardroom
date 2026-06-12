import { meetings } from "@/lib/demo-data";

type AskBoardResponse = {
  recommendation: string;
  confidence: number;
  riskSignal: "low" | "medium" | "high";
};

export async function askBoard(meetingId: string, question: string): Promise<AskBoardResponse> {
  const meeting = meetings.find((m) => m.id === meetingId);
  const lowered = question.toLowerCase();
  const cautious = /(risk|gdpr|defer|compliance|legal|debt|runway)/.test(lowered);

  return Promise.resolve({
    recommendation: meeting?.recommendation || "PROCEED WITH CAUTION (PHASED ROLLOUT)",
    confidence: cautious ? 78 : 84,
    riskSignal: cautious ? "high" : "medium",
  });
}

export async function createMeeting(topic: string) {
  return Promise.resolve({
    id: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    topic,
    status: "live" as const,
  });
}

export async function retrieveDiscussion(meetingId: string) {
  return Promise.resolve(meetings.find((m) => m.id === meetingId) ?? meetings[0]);
}

export async function retrieveRecommendation(meetingId: string) {
  const meeting = meetings.find((m) => m.id === meetingId) ?? meetings[0];
  return Promise.resolve({
    recommendation: meeting.recommendation,
    confidence: meeting.confidence,
  });
}

export async function retrieveContext() {
  return Promise.resolve({
    startup: "Nimbus",
    stage: "Series A",
    runwayMonths: 18,
  });
}
