import Link from "next/link";

export default function UploadsPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 border-b-4 border-[#1a1a1a] pb-4">
        <h1 className="font-headline text-5xl font-black uppercase">Document Upload</h1>
        <p className="font-body">Upload board packs, audits, and customer interviews to enrich discussion context.</p>
      </header>

      <div className="neo-border bg-white p-8">
        <p className="font-body">Use the dedicated report ingest pipeline to upload files and sync metadata.</p>
        <Link href="/reports" className="mt-6 inline-block border-4 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-label text-xs font-bold uppercase text-white">
          Go To Reports Upload
        </Link>
      </div>
    </div>
  );
}
