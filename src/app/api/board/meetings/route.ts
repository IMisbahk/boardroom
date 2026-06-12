import { NextResponse } from "next/server";
import { createMeeting, listMeetings } from "@/lib/server-board-store";

export async function GET() {
  return NextResponse.json({ meetings: await listMeetings() });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as { topic?: string };
  const topic = payload.topic?.trim();
  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const meeting = await createMeeting(topic);
  return NextResponse.json({ meeting }, { status: 201 });
}
