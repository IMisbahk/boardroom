"use client";

import Link from "next/link";
import { executives } from "@/lib/demo-data";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 border-b-4 border-[#1a1a1a] pb-4">
        <h1 className="font-headline text-5xl font-black uppercase">Executive Team</h1>
        <p className="font-body">Boardroom profiles seeded for Nimbus.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {executives.map((exec) => (
          <Link key={exec.id} href={`/team/${exec.id}`} className="team-card neo-border bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-2xl font-black uppercase">{exec.name}</h2>
              <span className="border border-[#1a1a1a] px-2 py-1 font-mono text-xs uppercase">{exec.confidence}%</span>
            </div>
            <p className="mt-1 font-label text-xs font-bold uppercase">{exec.role}</p>
            <p className="mt-3 font-body text-sm">{exec.bias}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
