"use client";

import { useEffect, useState } from "react";
import { dashboardTiles } from "@/lib/demo-data";
import { readJSON, STORAGE_KEYS } from "@/lib/client-store";

type Decision = { title: string; note: string };

export default function DecisionHistoryPage() {
  const [decisions, setDecisions] = useState<Decision[]>(dashboardTiles.decisions);

  useEffect(() => {
    setDecisions(readJSON<Decision[]>(STORAGE_KEYS.decisions, dashboardTiles.decisions));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 border-b-4 border-[#1a1a1a] pb-4">
        <h1 className="font-headline text-5xl font-black uppercase">Decision History</h1>
      </header>
      <div className="space-y-4">
        {decisions.map((decision) => (
          <article key={`${decision.title}-${decision.note}`} className="neo-border bg-white p-5">
            <h2 className="font-headline text-2xl font-black uppercase">{decision.title}</h2>
            <p className="mt-2 font-body text-sm">{decision.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
