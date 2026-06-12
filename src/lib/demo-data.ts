export type Executive = {
  id: string;
  name: string;
  initials: string;
  role: string;
  archetype: string;
  bias: string;
  confidence: number;
  stance: "support" | "caution" | "oppose";
};

export type MeetingDebateTurn = {
  id: string;
  time: string;
  speaker: string;
  role: string;
  content: string;
  tone: "support" | "caution" | "oppose";
};

export type MeetingRecord = {
  id: string;
  title: string;
  topic: string;
  status: "live" | "scheduled" | "closed";
  consensus: number;
  confidence: number;
  recommendation: string;
  risks: string[];
  opportunities: string[];
  turns: MeetingDebateTurn[];
};

export type ReportItem = {
  id: string;
  name: string;
  kind: string;
  size: string;
  timestamp: string;
};

export const startupName = "Nimbus";

export const executives: Executive[] = [
  { id: "aura", name: "Aura", initials: "AU", role: "Growth Lead", archetype: "The Catalyst", bias: "Aggressive market capture and velocity.", confidence: 86, stance: "support" },
  { id: "vault", name: "Vault", initials: "VA", role: "Investor Proxy", archetype: "The Auditor", bias: "Capital efficiency and downside protection.", confidence: 82, stance: "caution" },
  { id: "nexus", name: "Nexus", initials: "NX", role: "CTO", archetype: "The Architect", bias: "Long-term stability over short-term speed.", confidence: 78, stance: "caution" },
  { id: "prism", name: "Prism", initials: "PR", role: "Product Strategy", archetype: "The Navigator", bias: "Customer value and product coherence.", confidence: 84, stance: "support" },
  { id: "echo", name: "Echo", initials: "EC", role: "Customer Advocate", archetype: "The Listener", bias: "Retention, trust, and NPS resilience.", confidence: 75, stance: "support" },
  { id: "ledger", name: "Ledger", initials: "LG", role: "Finance Lead", archetype: "The Controller", bias: "Cash runway and budget discipline.", confidence: 80, stance: "caution" },
  { id: "stride", name: "Stride", initials: "ST", role: "Operations Lead", archetype: "The Operator", bias: "Execution reliability and process throughput.", confidence: 73, stance: "support" },
  { id: "counsel", name: "Counsel", initials: "LC", role: "Legal Lead", archetype: "The Guardrail", bias: "Compliance first for expansion moves.", confidence: 88, stance: "caution" },
  { id: "north", name: "North", initials: "NR", role: "Strategy Lead", archetype: "The Synthesizer", bias: "Portfolio-level trade-off clarity.", confidence: 79, stance: "support" },
  { id: "pulse", name: "Pulse", initials: "PL", role: "Customer Success", archetype: "The Retainer", bias: "Reduce churn before scale.", confidence: 77, stance: "support" },
];

export const meetings: MeetingRecord[] = [
  {
    id: "nimbus",
    title: "Project Nimbus",
    topic: "European Expansion Strategy",
    status: "live",
    consensus: 84,
    confidence: 81,
    recommendation: "PROCEED WITH CAUTION (PHASED ROLLOUT)",
    risks: ["GDPR exposure in Germany before legal playbook is finalized", "Support bandwidth in multilingual onboarding"],
    opportunities: ["UK/Nordics launch can unlock enterprise references", "Staggered launch preserves runway while learning demand"],
    turns: [
      { id: "t1", time: "09:42 AM UTC", speaker: "Prism", role: "Product", content: "Localization depth is below enterprise expectation for Germany. A direct launch risks churn and reputational drag.", tone: "caution" },
      { id: "t2", time: "09:45 AM UTC", speaker: "Vault", role: "Investor", content: "A six-month delay damages Q3 narrative. We need forward momentum with a controlled scope.", tone: "oppose" },
      { id: "t3", time: "09:49 AM UTC", speaker: "Aura", role: "Growth", content: "Split the rollout: launch UK/Nordics now, collect revenue and behavior signals, then fund German localization in Q4.", tone: "support" },
    ],
  },
  {
    id: "q3-funding-round",
    title: "Q3 Funding Round",
    topic: "Debt vs runway extension",
    status: "scheduled",
    consensus: 71,
    confidence: 74,
    recommendation: "EXTEND RUNWAY WITH EXISTING INVESTORS",
    risks: ["Higher interest burden from venture debt", "Covenant constraints on GTM flexibility"],
    opportunities: ["Avoids dilution shock from emergency raise", "Improves narrative before priced round"],
    turns: [],
  },
];

export const reports: ReportItem[] = [
  { id: "r1", name: "Nimbus Q3 financial audit.pdf", kind: "Finance", size: "2.4 MB", timestamp: "2026-06-11 18:42 UTC" },
  { id: "r2", name: "roadmap updates v7.pdf", kind: "Product", size: "1.1 MB", timestamp: "2026-06-10 14:10 UTC" },
  { id: "r3", name: "EU compliance briefing.txt", kind: "Legal", size: "418 KB", timestamp: "2026-06-09 09:20 UTC" },
  { id: "r4", name: "uploaded-report.pdf", kind: "General", size: "879 KB", timestamp: "2026-06-08 11:31 UTC" },
];

export const dashboardTiles = {
  directive: "THE BOARD RECOMMENDS PRIORITIZING RETENTION OVER GROWTH THIS QUARTER.",
  discussions: [
    { title: "Seed Round Strategy", note: "Aligning term sheet expectations before final partner meeting.", at: "14:00 EST" },
    { title: "European Expansion", note: "Reviewing regulatory compliance blockers in DACH region.", at: "TMW" },
  ],
  insights: [
    { title: "Technical Debt", note: "Core infrastructure refactor delayed by 3 sprints. Latency increased 12% WoW.", severity: "Risk" },
    { title: "Enterprise Pipeline", note: "Inbound enterprise leads up 40% post-conference with constrained sales capacity.", severity: "Opportunity" },
  ],
  decisions: [
    { title: "Hiring Freeze Lifted", note: "Approved for Q3 engineering roles only." },
    { title: "Acquisition Offer", note: "Rejected preliminary terms from Competitor X." },
    { title: "Pivot to B2B", note: "Ongoing rollout phase 2 of 4." },
  ],
};
