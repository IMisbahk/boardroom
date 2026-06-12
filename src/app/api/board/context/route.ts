import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const query = await supabase
      .from("startup_context")
      .select("startup,stage,runway_months,active_priorities")
      .eq("startup", "Nimbus")
      .maybeSingle();
    if (!query.error && query.data) {
      return NextResponse.json({
        startup: query.data.startup,
        stage: query.data.stage,
        runwayMonths: query.data.runway_months,
        activePriorities: query.data.active_priorities ?? [],
      });
    }
  }

  return NextResponse.json({
    startup: "Nimbus",
    stage: "Series A",
    runwayMonths: 18,
    activePriorities: ["Retention over pure acquisition", "Compliance-ready EU expansion", "Engineering debt reduction"],
  });
}
