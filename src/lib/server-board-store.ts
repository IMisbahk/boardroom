import type { MeetingRecord } from "@/lib/demo-data";
import { computeBoardResponse, type AskBoardComputation } from "@/lib/ai-engine";
import {
  applyComputationInDb,
  createMeetingInDb,
  fallbackSeedMeetings,
  getMeetingFromDb,
  listMeetingsFromDb,
} from "@/lib/board-db";

type ServerStore = {
  meetings: MeetingRecord[];
};

declare global {
  // eslint-disable-next-line no-var
  var __boardroomStore: ServerStore | undefined;
}

function getStore() {
  if (!globalThis.__boardroomStore) {
    globalThis.__boardroomStore = { meetings: fallbackSeedMeetings() };
  }
  return globalThis.__boardroomStore;
}

export async function listMeetings() {
  const fromDb = await listMeetingsFromDb();
  if (fromDb) {
    if (fromDb.length > 0) return fromDb;
  }
  return getStore().meetings;
}

export async function getMeetingById(id: string) {
  const fromDb = await getMeetingFromDb(id);
  if (fromDb) return fromDb;
  return getStore().meetings.find((meeting) => meeting.id === id) ?? null;
}

export async function createMeeting(topic: string) {
  const fromDb = await createMeetingInDb(topic);
  if (fromDb) return fromDb;

  const id = topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  const existing = getStore().meetings.find((meeting) => meeting.id === id) ?? null;
  if (existing) return existing;

  const created: MeetingRecord = {
    id,
    title: topic,
    topic,
    status: "live",
    consensus: 72,
    confidence: 74,
    recommendation: "RUN 30-DAY VALIDATION SPRINT BEFORE FULL COMMITMENT",
    risks: ["Insufficient data on this topic", "Execution assumptions still unverified"],
    opportunities: ["Fast synthesis from the executive team", "Rapid iteration on strategy with board checkpoints"],
    turns: [],
  };

  getStore().meetings = [created, ...getStore().meetings];
  return created;
}

export async function askBoardInMeeting(id: string, question: string) {
  const meeting = await getMeetingById(id);
  if (!meeting) return null;

  const computed = computeBoardResponse(meeting, question);
  return applyBoardComputation(id, computed);
}

export async function applyBoardComputation(id: string, computed: AskBoardComputation) {
  const fromDb = await applyComputationInDb(id, computed);
  if (fromDb) return fromDb;

  const meeting = getStore().meetings.find((current) => current.id === id) ?? null;
  if (!meeting) return null;

  meeting.turns = [...meeting.turns, ...computed.newTurns];
  meeting.recommendation = computed.recommendation;
  meeting.confidence = computed.confidence;
  meeting.consensus = computed.consensus;
  meeting.risks = computed.risks;
  meeting.opportunities = computed.opportunities;
  return meeting;
}
