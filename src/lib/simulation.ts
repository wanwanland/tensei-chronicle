import { getSupabase } from "@/lib/supabase";
import type { SimulationResult, TimelineEntry } from "@/types";

export async function getSimulationById(id: string): Promise<SimulationResult | null> {
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("life_simulations")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return null;

    const resultData = data.result_data as {
      input: SimulationResult["input"];
      timeline: TimelineEntry[];
    };

    return {
      id: data.id,
      input: resultData.input,
      timeline: resultData.timeline,
      created_at: data.created_at,
    };
  } catch {
    return null;
  }
}
