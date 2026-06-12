"use client";

import Link from "next/link";
import { useState } from "react";
import { meetings } from "@/lib/demo-data";
import { createMeeting } from "@/lib/board-api";

export default function MeetingsPage() {
  const [topic, setTopic] = useState("");

  async function onStartMeeting() {
    if (!topic.trim()) return;
    await createMeeting(topic);
    setTopic("");
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
