"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createMeeting, listBoardMeetings } from "@/lib/board-api";
import type { MeetingRecord } from "@/lib/demo-data";
import { useRouter } from "next/navigation";

export default function MeetingsPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [meetings, setMeetings] = useState<MeetingRecord[]>([]);

  useEffect(() => {
    listBoardMeetings().then(setMeetings);
  }, []);

  useEffect(() => {
    const newMeetingMode = new URLSearchParams(window.location.search).get("new");
    if (newMeetingMode === "1") {
      const element = document.getElementById("meeting-topic");
      element?.focus();
    }
  }, []);

  async function onStartMeeting() {
    if (!topic.trim()) return;
    const created = await createMeeting(topic);
    setMeetings((current) => [created, ...current.filter((meeting) => meeting.id !== created.id)]);
    setTopic("");
    router.push(`/meetings/${created.id}`);
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 flex flex-col justify-between gap-4 border-b-4 border-[#1a1a1a] pb-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-5xl font-black uppercase">Board Meetings</h1>
          <p className="font-body">Strategic decision sessions for Nimbus.</p>
        </div>
        <div className="flex gap-3">
          <input id="meeting-topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Meeting topic" className="border-2 border-[#1a1a1a] bg-white px-3 py-2 font-body" />
          <button onClick={onStartMeeting} className="border-4 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-label text-xs font-bold uppercase text-white">
            Start Meeting
          </button>
        </div>
      </header>

      <div className="grid gap-5">
        {meetings.length === 0 ? (
          <article className="meeting-item neo-border bg-white p-5">
            <h2 className="font-headline text-2xl font-black uppercase">No Meetings Yet</h2>
            <p className="font-body text-sm">Create your first board discussion using the topic input above.</p>
          </article>
        ) : null}
        {meetings.map((meeting) => (
          <Link key={meeting.id} href={`/meetings/${meeting.id}`} className="meeting-item neo-border bg-white p-5 hover:bg-[#f2ede5]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl font-black uppercase">{meeting.title}</h2>
                <p className="font-body text-sm">{meeting.topic}</p>
              </div>
              <div className="font-mono text-xs uppercase">Consensus {meeting.consensus}%</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
