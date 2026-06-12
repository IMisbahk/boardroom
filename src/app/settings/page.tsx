"use client";

import { useState } from "react";
import { clearSessionCookie } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { readJSON, STORAGE_KEYS, writeJSON } from "@/lib/client-store";

export default function SettingsPage() {
  const router = useRouter();
  const seeded = readJSON(STORAGE_KEYS.settings, { risk: 65, innovation: 80, ethics: 95, org: "Acme Corporation" });
  const [risk, setRisk] = useState(seeded.risk);
  const [innovation, setInnovation] = useState(seeded.innovation);
  const [ethics, setEthics] = useState(seeded.ethics);
  const [org, setOrg] = useState(seeded.org);
  const [showSaved, setShowSaved] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  function onSave() {
    writeJSON(STORAGE_KEYS.settings, { risk, innovation, ethics, org });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1200);
  }

  function onSignOut() {
    clearSessionCookie();
    router.push("/signin");
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 text-[#1a1a1a] md:p-8">
      <header className="mb-8 border-b-4 border-[#1a1a1a] pb-4">
        <h1 className="font-headline text-6xl font-black uppercase">SYSTEM CONFIG</h1>
      </header>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="neo-border bg-white p-6 neo-shadow">
          <h2 className="font-headline text-3xl font-black uppercase">Governance Protocol</h2>
          <div className="mt-6 space-y-6">
            <label className="block">
              <div className="mb-2 flex justify-between font-label text-sm font-bold uppercase">
                <span>Risk Tolerance</span>
                <span>{risk}%</span>
              </div>
              <input type="range" min={0} max={100} value={risk} onChange={(e) => setRisk(Number(e.target.value))} className="w-full" />
            </label>
            <label className="block">
              <div className="mb-2 flex justify-between font-label text-sm font-bold uppercase">
                <span>Innovation Bias</span>
                <span>{innovation}%</span>
              </div>
              <input type="range" min={0} max={100} value={innovation} onChange={(e) => setInnovation(Number(e.target.value))} className="w-full" />
            </label>
            <label className="block">
              <div className="mb-2 flex justify-between font-label text-sm font-bold uppercase">
                <span>Ethical Guardrails</span>
                <span>{ethics}%</span>
              </div>
              <input type="range" min={0} max={100} value={ethics} onChange={(e) => setEthics(Number(e.target.value))} className="w-full" />
            </label>
          </div>
          <button onClick={onSave} className="mt-8 w-full border-4 border-[#1a1a1a] bg-[#ffcc00] px-4 py-3 font-label text-sm font-bold uppercase">
            Commit Protocol Changes
          </button>
          {showSaved ? <p className="toast-success mt-3 border-2 border-green-700 bg-green-100 px-3 py-2 font-body text-sm">Protocol changes saved.</p> : null}
        </section>

        <div className="space-y-8">
          <section className="neo-border bg-[#d6e3ff] p-6">
            <h2 className="font-headline text-3xl font-black uppercase">Executive Team</h2>
            <button onClick={() => setShowInvite(true)} className="mt-5 border-4 border-[#1a1a1a] bg-white px-4 py-2 font-label text-xs font-bold uppercase">
              Invite Member
            </button>
          </section>

          <section className="neo-border bg-white p-6">
            <h2 className="font-headline text-3xl font-black uppercase">Data Ingestion</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <label className="flex items-center justify-between border-2 border-[#1a1a1a] p-3 font-label text-xs font-bold uppercase">Salesforce CRM <input id="toggle1" type="checkbox" defaultChecked /></label>
              <label className="flex items-center justify-between border-2 border-[#1a1a1a] p-3 font-label text-xs font-bold uppercase">Bloomberg API <input id="toggle2" type="checkbox" defaultChecked /></label>
              <label className="flex items-center justify-between border-2 border-[#1a1a1a] p-3 font-label text-xs font-bold uppercase">Internal DB <input id="toggle3" type="checkbox" defaultChecked /></label>
              <label className="flex items-center justify-between border-2 border-[#1a1a1a] p-3 font-label text-xs font-bold uppercase">Legacy ERP <input id="toggle4" type="checkbox" /></label>
            </div>
          </section>

          <section className="neo-border bg-white p-6">
            <h2 className="font-headline text-3xl font-black uppercase">Account</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block font-label text-xs font-bold uppercase">Organization Name</label>
                <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} className="w-full border-0 border-b-4 border-[#1a1a1a] bg-transparent py-2 font-body text-lg" />
              </div>
              <p className="font-label text-xs font-bold uppercase">
                License Tier <span className="ml-2 border-2 border-[#1a1a1a] bg-[#ffcc00] px-2 py-1">ENTERPRISE</span>
              </p>
            </div>
            <button onClick={onSignOut} className="mt-6 border-4 border-red-700 px-4 py-2 font-label text-xs font-bold uppercase text-red-700">
              Sign Out
            </button>
          </section>
        </div>
      </div>

      {showInvite ? (
        <div role="dialog" className="fixed inset-0 z-40 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md border-4 border-[#1a1a1a] bg-white p-6">
            <h3 className="font-headline text-2xl font-black uppercase">Invite Member</h3>
            <div className="mt-4 space-y-3">
              <input id="member-name" placeholder="Full name" className="w-full border-2 border-[#1a1a1a] p-2" />
              <input id="member-email" placeholder="Work email" className="w-full border-2 border-[#1a1a1a] p-2" />
              <input id="member-role" placeholder="Role" className="w-full border-2 border-[#1a1a1a] p-2" />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setShowInvite(false)} className="border-2 border-[#1a1a1a] px-4 py-2 font-label text-xs font-bold uppercase">Cancel</button>
              <button onClick={() => setShowInvite(false)} className="border-4 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-label text-xs font-bold uppercase text-white">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
