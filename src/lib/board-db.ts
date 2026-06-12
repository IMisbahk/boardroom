import type { AskBoardComputation } from "@/lib/ai-engine";
import { meetings as seedMeetings, type MeetingDebateTurn, type MeetingRecord } from "@/lib/demo-data";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { SupabaseClient } from "@supabase/supabase-js";

type MeetingRow = {
  id: string;
  title: string;
  topic: string;
  status: MeetingRecord["status"];
  consensus: number;
  confidence: number;
  recommendation: string;
  risks: string[] | null;
  opportunities: string[] | null;
  created_at?: string;
};

type TurnRow = {
  id: string;
  meeting_id: string;
  speaker: string;
  role: string;
  content: string;
  tone: MeetingDebateTurn["tone"];
  event_time: string;
  created_at?: string;
};

function mapMeeting(row: MeetingRow, turns: MeetingDebateTurn[]): MeetingRecord {
  return {
    id: row.id,
    title: row.title,
    topic: row.topic,
    status: row.status,
    consensus: row.consensus,
    confidence: row.confidence,
    recommendation: row.recommendation,
    risks: row.risks ?? [],
    opportunities: row.opportunities ?? [],
    turns,
  };
}

function mapTurn(row: TurnRow): MeetingDebateTurn {
  return {
    id: row.id,
    speaker: row.speaker,
    role: row.role,
    content: row.content,
    tone: row.tone,
    time: row.event_time,
  };
}

async function seedDatabaseIfEmpty(supabase: SupabaseClient) {
  const meetingRows = seedMeetings.map((meeting) => ({
    id: meeting.id,
    title: meeting.title,
    topic: meeting.topic,
    status: meeting.status,
    consensus: meeting.consensus,
    confidence: meeting.confidence,
    recommendation: meeting.recommendation,
    risks: meeting.risks,
    opportunities: meeting.opportunities,
  }));

  const meetingInsert = await supabase.from("board_meetings").insert(meetingRows);
  if (meetingInsert.error) return false;

  const turns = seedMeetings.flatMap((meeting) =>
    meeting.turns.map((turn) => ({
      meeting_id: meeting.id,
      speaker: turn.speaker,
      role: turn.role,
      content: turn.content,
      tone: turn.tone,
      event_time: turn.time,
    })),
  );
  if (turns.length) {
    const turnInsert = await supabase.from("board_turns").insert(turns);
    if (turnInsert.error) return false;
  }
  return true;
}

export async function listMeetingsFromDb(): Promise<MeetingRecord[] | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const meetingsQuery = await supabase
    .from("board_meetings")
    .select("id,title,topic,status,consensus,confidence,recommendation,risks,opportunities,created_at")
    .order("created_at", { ascending: false });
  if (meetingsQuery.error) return null;

  let meetingRows = (meetingsQuery.data ?? []) as MeetingRow[];
  if (meetingRows.length === 0) {
    const seeded = await seedDatabaseIfEmpty(supabase);
    if (seeded) {
      const retry = await supabase
        .from("board_meetings")
        .select("id,title,topic,status,consensus,confidence,recommendation,risks,opportunities,created_at")
        .order("created_at", { ascending: false });
      if (!retry.error) {
        meetingRows = (retry.data ?? []) as MeetingRow[];
      }
    }
  }
  if (meetingRows.length === 0) return [];

  const meetingIds = meetingRows.map((row) => row.id);
  const turnsQuery = await supabase
    .from("board_turns")
    .select("id,meeting_id,speaker,role,content,tone,event_time,created_at")
    .in("meeting_id", meetingIds)
    .order("created_at", { ascending: true });
  if (turnsQuery.error) return null;

  const turnsByMeeting = new Map<string, MeetingDebateTurn[]>();
  for (const turn of (turnsQuery.data ?? []) as TurnRow[]) {
    const mapped = mapTurn(turn);
    const bucket = turnsByMeeting.get(turn.meeting_id) ?? [];
    bucket.push(mapped);
    turnsByMeeting.set(turn.meeting_id, bucket);
  }

  return meetingRows.map((row) => mapMeeting(row, turnsByMeeting.get(row.id) ?? []));
}

export async function getMeetingFromDb(id: string): Promise<MeetingRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const meetingQuery = await supabase
    .from("board_meetings")
    .select("id,title,topic,status,consensus,confidence,recommendation,risks,opportunities,created_at")
    .eq("id", id)
    .maybeSingle();
  if (meetingQuery.error || !meetingQuery.data) return null;

  const turnsQuery = await supabase
    .from("board_turns")
    .select("id,meeting_id,speaker,role,content,tone,event_time,created_at")
    .eq("meeting_id", id)
    .order("created_at", { ascending: true });
  if (turnsQuery.error) return null;

  return mapMeeting(meetingQuery.data as MeetingRow, ((turnsQuery.data ?? []) as TurnRow[]).map(mapTurn));
}

export async function createMeetingInDb(topic: string): Promise<MeetingRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const id = topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  const existing = await getMeetingFromDb(id);
  if (existing) return existing;

  const insert = await supabase
    .from("board_meetings")
    .insert({
      id,
      title: topic,
      topic,
      status: "live",
      consensus: 72,
      confidence: 74,
      recommendation: "RUN 30-DAY VALIDATION SPRINT BEFORE FULL COMMITMENT",
      risks: ["Insufficient data on this topic", "Execution assumptions still unverified"],
      opportunities: ["Fast synthesis from the executive team", "Rapid iteration on strategy with board checkpoints"],
    })
    .select("id,title,topic,status,consensus,confidence,recommendation,risks,opportunities,created_at")
    .single();
  if (insert.error || !insert.data) return null;

  return mapMeeting(insert.data as MeetingRow, []);
}

export async function applyComputationInDb(meetingId: string, computed: AskBoardComputation): Promise<MeetingRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const update = await supabase
    .from("board_meetings")
    .update({
      recommendation: computed.recommendation,
      confidence: computed.confidence,
      consensus: computed.consensus,
      risks: computed.risks,
      opportunities: computed.opportunities,
    })
    .eq("id", meetingId)
    .select("id,title,topic,status,consensus,confidence,recommendation,risks,opportunities,created_at")
    .single();
  if (update.error || !update.data) return null;

  const turnInserts = computed.newTurns.map((turn) => ({
    meeting_id: meetingId,
    speaker: turn.speaker,
    role: turn.role,
    content: turn.content,
    tone: turn.tone,
    event_time: turn.time,
  }));

  const insertedTurns = turnInserts.length
    ? await supabase
        .from("board_turns")
        .insert(turnInserts)
        .select("id,meeting_id,speaker,role,content,tone,event_time,created_at")
        .order("created_at", { ascending: true })
    : { data: [], error: null };
  if (insertedTurns.error) return null;

  const currentTurns = await supabase
    .from("board_turns")
    .select("id,meeting_id,speaker,role,content,tone,event_time,created_at")
    .eq("meeting_id", meetingId)
    .order("created_at", { ascending: true });
  if (currentTurns.error) return null;

  return mapMeeting(update.data as MeetingRow, ((currentTurns.data ?? []) as TurnRow[]).map(mapTurn));
}

export function fallbackSeedMeetings(): MeetingRecord[] {
  return seedMeetings.map((meeting) => ({
    ...meeting,
    turns: meeting.turns.map((turn) => ({ ...turn })),
    risks: [...meeting.risks],
    opportunities: [...meeting.opportunities],
  }));
}
