"use client";

import { useEffect, useMemo, useState } from "react";
import { dashboardTiles, reports as defaultReports } from "@/lib/demo-data";
import { readJSON, STORAGE_KEYS } from "@/lib/client-store";
import { AlertTriangle, Gavel, Lightbulb, MessageSquare } from "lucide-react";

type DecisionLog = { title: string; note: string };
type ReportLog = { id: string };

export default function DashboardPage() {
  const [decisions, setDecisions] = useState<DecisionLog[]>(dashboardTiles.decisions);
  const [reportCount, setReportCount] = useState(defaultReports.length);

  useEffect(() => {
    setDecisions(readJSON(STORAGE_KEYS.decisions, dashboardTiles.decisions));
    const reports = readJSON<ReportLog[]>(STORAGE_KEYS.reports, defaultReports.map((r) => ({ id: r.id })));
    setReportCount(reports.length);
  }, []);

  const latestDecisions = useMemo(() => decisions.slice(0, 3), [decisions]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1a1a]">
      <header className="sticky top-0 z-10 border-b-4 border-[#1a1a1a] bg-white px-8 py-5">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-4xl font-black uppercase md:text-5xl">WELCOME, FOUNDER</h1>
          <div className="text-right">
            <div className="font-label text-sm font-bold uppercase">NIMBUS INTERNAL</div>
            <div className="font-mono text-xs uppercase">SYSTEM STATUS: NOMINAL</div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <section className="neo-border bg-[#ffcc00] p-8 neo-shadow">
          <h2 className="font-label text-xs font-bold uppercase">Primary Directive</h2>
          <p className="mt-3 font-headline text-4xl font-black uppercase leading-tight md:text-5xl">{dashboardTiles.directive}</p>
          <div className="mt-6 flex gap-4">
            <button className="border-4 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-2 font-label text-xs font-bold uppercase text-white">Acknowledge</button>
            <button className="border-4 border-[#1a1a1a] bg-transparent px-5 py-2 font-label text-xs font-bold uppercase">View Analysis</button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section id="discussions" className="space-y-4">
            <div className="flex items-center justify-between border-b-4 border-[#1a1a1a] pb-2">
              <h3 className="font-headline text-2xl font-black uppercase">Discussions</h3>
              <MessageSquare className="h-6 w-6" />
            </div>
            {dashboardTiles.discussions.map((item) => (
              <article key={item.title} className="neo-border bg-white p-5">
                <div className="flex items-center justify-between text-xs font-mono uppercase">
                  <span>{item.at}</span>
                </div>
                <h4 className="mt-2 font-headline text-xl font-bold uppercase">{item.title}</h4>
                <p className="mt-2 font-body text-sm">{item.note}</p>
              </article>
            ))}
            <p className="border-2 border-dashed border-[#1a1a1a] bg-[#f2ede5] p-3 font-body text-sm">No discussions scheduled</p>
          </section>

          <section id="insights" className="space-y-4">
            <div className="flex items-center justify-between border-b-4 border-[#1a1a1a] pb-2">
              <h3 className="font-headline text-2xl font-black uppercase">Insights</h3>
              <Lightbulb className="h-6 w-6" />
            </div>
            {dashboardTiles.insights.map((item) => (
              <article key={item.title} className={`neo-border p-5 ${item.severity === "Risk" ? "bg-red-100" : "bg-blue-100"}`}>
                <h4 className="font-headline text-xl font-black uppercase">{item.title}</h4>
                <p className="mt-2 font-body text-sm">{item.note}</p>
              </article>
            ))}
          </section>

          <section id="decisions" className="space-y-4">
            <div className="flex items-center justify-between border-b-4 border-[#1a1a1a] pb-2">
              <h3 className="font-headline text-2xl font-black uppercase">Decisions</h3>
              <Gavel className="h-6 w-6" />
            </div>
            {latestDecisions.map((item) => (
              <article key={item.title} className="neo-border bg-white p-5">
                <h4 className="font-headline text-xl font-bold uppercase">{item.title}</h4>
                <p className="mt-2 font-body text-sm">{item.note}</p>
              </article>
            ))}
            <p className="border-2 border-dashed border-[#1a1a1a] bg-[#f2ede5] p-3 font-body text-sm">No decisions recorded</p>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="neo-border bg-white p-4">
            <div className="font-label text-xs font-bold uppercase">Reports Indexed</div>
            <div id="reports-count-widget" className="font-headline text-3xl font-black">
              {reportCount}
            </div>
          </div>
          <div className="neo-border bg-red-100 p-4">
            <div className="flex items-center gap-2 font-label text-xs font-bold uppercase">
              <AlertTriangle className="h-4 w-4" />
              Active Risk Signal
            </div>
            <div className="font-body text-sm">Technical debt acceleration in core queueing service.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
