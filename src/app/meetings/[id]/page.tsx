"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { executives, meetings } from "@/lib/demo-data";
import { askBoard } from "@/lib/board-api";
import { readJSON, STORAGE_KEYS, writeJSON } from "@/lib/client-store";

export default function MeetingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const meeting = useMemo(() => meetings.find((m) => m.id === params.id), [params.id]);
  const [question, setQuestion] = useState("");
  const [dynamicConfidence, setDynamicConfidence] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState(meeting?.recommendation ?? "PROCEED WITH CAUTION (PHASED ROLLOUT)");

  if (!meeting) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] p-10 text-[#1a1a1a]">
        <h1 className="font-headline text-5xl font-black uppercase">Meeting Not Found</h1>
        <p className="mt-4 font-body">This decision room does not exist.</p>
        <button onClick={() => router.push("/meetings")} className="mt-6 border-4 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-label text-xs font-bold uppercase text-white">
          Back To Meetings
        </button>
      </div>
    );
  }

  async function onAskBoard() {
    if (!question.trim()) return;
    const response = await askBoard(meeting!.id, question);
    setDynamicConfidence(response.confidence);
    setRecommendation(response.recommendation);
    setQuestion("");
  }

  function onRatify() {
    const existing = readJSON(STORAGE_KEYS.decisions, []);
    writeJSON(STORAGE_KEYS.decisions, [{ title: recommendation, note: `Ratified from ${meeting!.title}` }, ...existing]);
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1a1a]">
      <header className="border-b-4 border-[#1a1a1a] bg-[#ffcc00] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-headline text-5xl font-black uppercase">{meeting.title}</h1>
            <p className="font-body text-sm uppercase">{meeting.topic}</p>
          </div>
          <div className="neo-border bg-white p-3">
            <p className="font-label text-xs font-bold uppercase">Consensus</p>
            <p className="font-headline text-2xl font-black">{meeting.consensus}%</p>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-148px)] grid-cols-1 lg:grid-cols-[320px_1fr]">
        <aside className="border-r-4 border-[#1a1a1a] bg-white p-4">
          <h2 className="border-b-4 border-[#1a1a1a] pb-2 font-headline text-xl font-black uppercase">Board Members</h2>
          <div className="mt-4 space-y-3">
            {executives.slice(0, 5).map((exec, index) => (
              <article key={exec.id} className={`neo-border p-3 ${index === 0 ? "bg-[#ffefad]" : "bg-[#f5f0e8]"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-headline text-lg font-black uppercase">{exec.name}</p>
                    <p className="font-label text-xs font-bold uppercase">{exec.role}</p>
                  </div>
                  {index === 0 ? <span className="bg-red-500 px-2 py-1 font-label text-[10px] font-bold uppercase text-white">Speaking</span> : null}
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="relative flex min-h-[70vh] flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto p-6 pb-36">
            <div className="border-y-2 border-dashed border-[#1a1a1a] py-2 text-center font-mono text-xs font-bold uppercase">09:42 AM UTC</div>
            {meeting.turns.map((turn) => (
              <article key={turn.id} className={`max-w-3xl ${turn.speaker === "Vault" ? "ml-auto text-right" : ""}`}>
                <p className="mb-1 font-label text-xs font-bold uppercase">
                  {turn.speaker} <span className="font-body">{turn.role}</span>
                </p>
                <div className={`brutal-border p-4 font-body ${turn.tone === "oppose" ? "bg-red-100" : turn.tone === "support" ? "bg-[#fff3c6]" : "bg-white"}`}>
                  {turn.content}
                </div>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-24 left-1/2 w-[95%] max-w-3xl -translate-x-1/2">
            <div className="pointer-events-auto border-4 border-[#1a1a1a] bg-white p-4 neo-shadow">
              <p className="font-label text-xs font-bold uppercase">System Consensus</p>
              <p className="font-headline text-2xl font-black uppercase text-blue-700">{recommendation}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-mono text-xs uppercase">Confidence {(dynamicConfidence ?? meeting.confidence)}%</p>
                <button onClick={onRatify} className="border-4 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-label text-xs font-bold uppercase text-white">
                  Ratify
                </button>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-[#1a1a1a] bg-[#e2ddd4] p-4">
            <div className="mx-auto flex max-w-4xl gap-3">
              <input value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={1000} placeholder="ASK THE BOARD..." className="flex-1 border-[3px] border-[#1a1a1a] bg-white px-4 py-3 font-headline text-lg font-bold uppercase" />
              <button onClick={onAskBoard} disabled={!question.trim()} className="border-[3px] border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-label text-xs font-bold uppercase text-white disabled:opacity-50">
                send
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
