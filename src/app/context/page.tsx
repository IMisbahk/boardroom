"use client";

import { useEffect, useState } from "react";
import { retrieveContext } from "@/lib/board-api";

export default function StartupContextPage() {
  const [context, setContext] = useState({ startup: "Nimbus", stage: "Series A", runwayMonths: 18 });

  useEffect(() => {
    retrieveContext().then(setContext);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 border-b-4 border-[#1a1a1a] pb-4">
        <h1 className="font-headline text-5xl font-black uppercase">Startup Context</h1>
      </header>
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="neo-border bg-white p-5">
          <h2 className="font-headline text-2xl font-black uppercase">{context.startup}</h2>
          <p className="mt-2 font-body text-sm">
            {context.stage} B2B workflow intelligence platform with {context.runwayMonths} months of runway.
          </p>
        </article>
        <article className="neo-border bg-white p-5">
          <h2 className="font-headline text-2xl font-black uppercase">Top Risks</h2>
          <ul className="mt-2 list-disc pl-5 font-body text-sm">
            <li>Localization debt in German market onboarding.</li>
            <li>Vendor concentration in infra cost stack.</li>
          </ul>
        </article>
        <article className="neo-border bg-white p-5">
          <h2 className="font-headline text-2xl font-black uppercase">Opportunities</h2>
          <ul className="mt-2 list-disc pl-5 font-body text-sm">
            <li>Enterprise inbound up 40% after industry summit.</li>
            <li>Channel partnerships in UK/Nordics near close.</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
