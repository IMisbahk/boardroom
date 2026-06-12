"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { reports as seedReports } from "@/lib/demo-data";
import { STORAGE_KEYS, readJSON, writeJSON } from "@/lib/client-store";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type ReportRecord = {
  id: string;
  name: string;
  kind: string;
  size: string;
  timestamp: string;
};

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [reportList, setReportList] = useState<ReportRecord[]>(seedReports);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const stored = readJSON<ReportRecord[]>(STORAGE_KEYS.reports, seedReports);
    setReportList(stored);
  }, []);

  const filtered = useMemo(
    () => reportList.filter((r) => `${r.name} ${r.kind}`.toLowerCase().includes(query.toLowerCase())),
    [query, reportList],
  );

  async function onUpload(event: FormEvent) {
    event.preventDefault();
    if (!selectedFile) return;

    const created: ReportRecord = {
      id: `${Date.now()}`,
      name: selectedFile.name,
      kind: selectedFile.type.includes("pdf") ? "PDF" : "Text",
      size: `${Math.max(1, Math.round(selectedFile.size / 1024))} KB`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC",
    };

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.storage.from("documents").upload(`nimbus/${created.id}-${created.name}`, selectedFile, { upsert: true });
    }

    const nextList = [created, ...reportList];
    setReportList(nextList);
    writeJSON(STORAGE_KEYS.reports, nextList);
    setSelectedFile(null);
  }

  function onDownload(item: ReportRecord) {
    const blob = new Blob([`Boardroom Report\nName: ${item.name}\nType: ${item.kind}\nGenerated: ${item.timestamp}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.name.endsWith(".txt") ? item.name : `${item.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 border-b-4 border-[#1a1a1a] pb-4">
        <h1 className="font-headline text-5xl font-black uppercase">Reports</h1>
      </header>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports..." className="w-full border-2 border-[#1a1a1a] bg-white px-4 py-3 font-body" />
        <form className="flex items-center gap-3" onSubmit={onUpload}>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} className="border-2 border-[#1a1a1a] bg-white p-2" />
          <button type="submit" className="border-4 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-label text-xs font-bold uppercase text-white">
            Upload
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? <p className="neo-border bg-white p-4 font-body">No files uploaded yet</p> : null}
        {filtered.map((item) => (
          <article key={item.id} className="report-item neo-border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-headline text-xl font-bold">{item.name}</h2>
                <p className="metadata-timestamp font-mono text-xs uppercase">
                  {item.kind} • {item.size} • {item.timestamp}
                </p>
              </div>
              <button onClick={() => onDownload(item)} className="download-btn border-2 border-[#1a1a1a] px-4 py-2 font-label text-xs font-bold uppercase">
                Download
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
