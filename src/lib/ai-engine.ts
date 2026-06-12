import { executives, type MeetingDebateTurn, type MeetingRecord } from "@/lib/demo-data";

export type AskBoardComputation = {
  recommendation: string;
  confidence: number;
  consensus: number;
  risks: string[];
  opportunities: string[];
  newTurns: MeetingDebateTurn[];
};

function containsAny(input: string, words: string[]) {
  return words.some((word) => input.includes(word));
}

function inferMode(question: string) {
  const normalized = question.toLowerCase();
  if (containsAny(normalized, ["legal", "gdpr", "compliance", "covenant", "regulatory"])) return "legal";
  if (containsAny(normalized, ["debt", "runway", "budget", "finance", "burn", "cash"])) return "finance";
  if (containsAny(normalized, ["launch", "growth", "market", "acquisition", "ads", "cac"])) return "growth";
  if (containsAny(normalized, ["product", "roadmap", "feature", "ux", "customer"])) return "product";
  return "strategy";
}

export function computeBoardResponse(meeting: MeetingRecord, question: string): AskBoardComputation {
  const mode = inferMode(question);
  const cautionMode = mode === "legal" || mode === "finance";

  const recommendation =
    mode === "growth"
      ? "APPROVE ACCELERATED GTM WITH GUARDRAILS"
      : cautionMode
        ? "PROCEED WITH CAUTION (PHASED ROLLOUT)"
        : "RUN 30-DAY VALIDATION SPRINT BEFORE FULL COMMITMENT";

  const confidence = cautionMode ? 78 : mode === "growth" ? 84 : 81;
  const consensus = cautionMode ? 82 : mode === "growth" ? 87 : 80;

  const riskMap: Record<string, string[]> = {
    legal: ["Regulatory exposure if expansion precedes legal controls", "Contractual covenant risk in cross-border sales"],
    finance: ["Runway compression from upfront investment", "Debt obligations may restrict strategic flexibility"],
    growth: ["Channel saturation could increase CAC quickly", "Rapid expansion may degrade onboarding quality"],
    product: ["Roadmap dilution may reduce core product quality", "Feature commitments can outpace engineering capacity"],
    strategy: ["Execution complexity across teams", "Misaligned sequencing between product and GTM"],
  };

  const opportunityMap: Record<string, string[]> = {
    legal: ["Compliance-first posture strengthens enterprise trust", "Creates durable expansion playbook"],
    finance: ["Disciplined capital plan improves investor confidence", "Sharper budgeting can extend runway"],
    growth: ["Faster market entry can capture category momentum", "Revenue growth unlocks stronger pricing leverage"],
    product: ["Clear product focus improves retention and NPS", "Roadmap discipline lowers churn in core segment"],
    strategy: ["Structured experimentation increases decision quality", "Cross-functional alignment improves execution speed"],
  };

  const speakingExecs = executives.slice(0, 3);
  const now = new Date();
  const baseMinute = now.getUTCMinutes();
  const newTurns: MeetingDebateTurn[] = speakingExecs.map((exec, index) => {
    const minute = String((baseMinute + index) % 60).padStart(2, "0");
    const hour = String(now.getUTCHours() % 12 || 12).padStart(2, "0");
    const roleTag = exec.role.split(" ")[0];

    const content =
      index === 0
        ? `${exec.name} (${roleTag}) argues that "${question}" needs a scoped decision path with explicit milestones before rollout.`
        : index === 1
          ? `${exec.name} challenges the downside profile and requests quantified risk controls tied to weekly metrics.`
          : `${exec.name} proposes a practical compromise: phased execution with measurable checkpoints and fallback triggers.`;

    return {
      id: `t-${Date.now()}-${index}`,
      time: `${hour}:${minute} UTC`,
      speaker: exec.name,
      role: roleTag,
      content,
      tone: index === 1 ? "caution" : "support",
    };
  });

  return {
    recommendation,
    confidence,
    consensus,
    risks: riskMap[mode],
    opportunities: opportunityMap[mode],
    newTurns,
  };
}
