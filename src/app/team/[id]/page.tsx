import Link from "next/link";
import { executives } from "@/lib/demo-data";

export default async function ExecutiveProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const executive = executives.find((item) => item.id === id);

  if (!executive) {
    return <div className="p-8 font-body">Executive profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <div className="mx-auto max-w-4xl neo-border bg-white p-8 neo-shadow">
        <h1 className="font-headline text-6xl font-black uppercase">{executive.name}</h1>
        <p className="mt-2 font-label text-sm font-bold uppercase">{executive.role}</p>
        <p className="mt-5 font-body text-lg">{executive.bias}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="border-2 border-[#1a1a1a] p-3">
            <p className="font-label text-xs font-bold uppercase">Archetype</p>
            <p className="font-body">{executive.archetype}</p>
          </div>
          <div className="border-2 border-[#1a1a1a] p-3">
            <p className="font-label text-xs font-bold uppercase">Confidence</p>
            <p className="font-body">{executive.confidence}%</p>
          </div>
          <div className="border-2 border-[#1a1a1a] p-3">
            <p className="font-label text-xs font-bold uppercase">Current Stance</p>
            <p className="font-body uppercase">{executive.stance}</p>
          </div>
        </div>
        <Link href="/team" className="mt-8 inline-block border-4 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-label text-xs font-bold uppercase text-white">
          Back To Team
        </Link>
      </div>
    </div>
  );
}
