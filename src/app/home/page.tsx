import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1a1a]">
      <nav className="sticky top-0 z-20 border-b-[3px] border-[#1a1a1a] bg-[#f5f0e8] px-6 py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 font-headline text-2xl font-black uppercase">
            <Building2 className="h-6 w-6" />
            Boardroom
          </div>
          <div className="hidden items-center gap-8 font-label text-sm font-bold uppercase md:flex">
            <a href="#platform">Platform</a>
            <a href="#governance">Governance</a>
            <a href="#insights">Insights</a>
            <a href="#case-studies">Case Studies</a>
          </div>
          <Link href="/signin?returnTo=/dashboard" className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-2 font-label text-xs font-bold uppercase text-white">
            Start a Meeting
          </Link>
        </div>
      </nav>

      <main>
        <section className="border-b-[3px] border-[#1a1a1a] px-6 py-20 text-center">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 inline-flex items-center gap-2 border-2 border-[#1a1a1a] bg-white px-3 py-1 font-label text-xs font-bold uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Now In Beta
            </p>
            <h1 className="font-headline text-6xl font-black uppercase leading-[0.9] md:text-8xl">
              Your AI
              <br />
              Executive Team.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-body text-lg">
              Simulate a real board meeting with Investor, CTO, Product, Growth, Finance, Operations, and Legal in one command center.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
              <Link href="/signin?returnTo=/dashboard" className="inline-flex items-center justify-center gap-2 border-[3px] border-[#1a1a1a] bg-[#1a1a1a] px-8 py-4 font-label text-sm font-bold uppercase text-white neo-shadow">
                Assemble Your Board
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/meetings/nimbus" className="inline-flex items-center justify-center gap-2 border-[3px] border-[#1a1a1a] bg-white px-8 py-4 font-label text-sm font-bold uppercase">
                View Demo Simulation
              </Link>
            </div>
          </div>
        </section>

        <section id="platform" className="border-b-[3px] border-[#1a1a1a] bg-[#f2ede5] px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between border-b-[3px] border-[#1a1a1a] pb-5">
              <h2 className="font-headline text-5xl font-black uppercase leading-none">The Principals</h2>
              <p className="max-w-md font-body text-sm">Purpose-built executives with clear role incentives and structured disagreements.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="neo-border bg-white p-6 neo-shadow">
                <div className="mb-4 flex items-center justify-between">
                  <Target className="h-8 w-8 text-blue-700" />
                  <span className="border border-[#1a1a1a] px-2 py-1 font-mono text-xs">Tech / Infra</span>
                </div>
                <h3 className="font-headline text-2xl font-bold uppercase">The Architect</h3>
                <p className="mt-3 font-body text-sm">Evaluates technical debt, scalability constraints, and infrastructure risks.</p>
              </article>
              <article className="neo-border bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <TrendingUp className="h-8 w-8 text-amber-600" />
                  <span className="border border-[#1a1a1a] px-2 py-1 font-mono text-xs">GTM / Sales</span>
                </div>
                <h3 className="font-headline text-2xl font-bold uppercase">The Catalyst</h3>
                <p className="mt-3 font-body text-sm">Optimizes acquisition loops, pipeline growth, and channel efficiency.</p>
              </article>
              <article className="neo-border bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <ShieldCheck className="h-8 w-8 text-red-600" />
                  <span className="border border-[#1a1a1a] px-2 py-1 font-mono text-xs">Capital / Risk</span>
                </div>
                <h3 className="font-headline text-2xl font-bold uppercase">The Auditor</h3>
                <p className="mt-3 font-body text-sm">Stress-tests downside exposure, burn profile, and financing options.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="insights" className="bg-[#ffcc00] px-6 py-16 text-[#1a1a1a]">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-headline text-6xl font-black uppercase leading-none">Stop Guessing. Start Governing.</h2>
            <p className="mx-auto mt-6 max-w-3xl font-body text-xl">
              Boardroom gives founders a strategic command center that feels like a funded startup operating room from minute one.
            </p>
            <Link href="/signin?returnTo=/dashboard" className="mt-8 inline-flex items-center gap-2 border-[3px] border-[#1a1a1a] bg-[#1a1a1a] px-8 py-4 font-label text-sm font-bold uppercase text-white">
              Deploy Your Board
              <BriefcaseBusiness className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
