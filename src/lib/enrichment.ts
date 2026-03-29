import { getSupabaseAdmin } from "@/lib/supabase";
import { fetchWikidataEvents } from "@/lib/wikidata";
import { generateRegionalEntries } from "@/lib/enrichment-llm";
import { isLLMAvailable } from "@/lib/llm";
import type { RegionalData } from "@/types";

export async function enrichRegionalData(
  region: string,
  birthYear: number,
  endYear: number,
  existingData: RegionalData[]
): Promise<RegionalData[]> {
  // Skip if no LLM API key configured
  if (!isLLMAvailable()) {
    return existingData;
  }

  // Find decades with sparse data (fewer than 2 entries)
  const yearSet = new Set(existingData.map((d) => d.year));
  const gapDecades: number[] = [];

  for (let decade = Math.floor(birthYear / 10) * 10; decade <= endYear; decade += 10) {
    const decadeEnd = Math.min(decade + 9, endYear);
    let count = 0;
    for (let y = decade; y <= decadeEnd; y++) {
      if (yearSet.has(y)) count++;
    }
    if (count < 2) {
      gapDecades.push(decade);
    }
  }

  if (gapDecades.length === 0) {
    return existingData;
  }

  // Process gap decades in parallel (max 2 concurrent)
  const allEnriched: RegionalData[] = [];

  for (let i = 0; i < gapDecades.length; i += 2) {
    const batch = gapDecades.slice(i, i + 2);
    const results = await Promise.all(
      batch.map(async (decade) => {
        try {
          const decadeEnd = Math.min(decade + 9, 2025);
          const wikidataEvents = await fetchWikidataEvents(region, decade, decadeEnd);
          const entries = await generateRegionalEntries(region, decade, wikidataEvents);
          return entries;
        } catch {
          return [];
        }
      })
    );
    allEnriched.push(
      ...results.flat().map((e) => ({
        id: crypto.randomUUID(),
        region_name: e.region_name,
        year: e.year,
        topic: e.topic,
        news_detail: e.news_detail,
        source: e.source as "wikidata_llm",
      }))
    );
  }

  // Cache enriched data to Supabase
  if (allEnriched.length > 0) {
    try {
      const admin = getSupabaseAdmin();
      const insertData = allEnriched.map(({ id: _, ...rest }) => rest);
      await admin
        .from("regional_data")
        .upsert(insertData, { onConflict: "region_name,year,topic", ignoreDuplicates: true });
    } catch {
      // Cache failure is non-fatal
    }
  }

  return [...existingData, ...allEnriched];
}
