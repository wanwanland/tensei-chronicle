"use server";

import { getSupabase } from "@/lib/supabase";
import type { SimulationInput, SimulationResult, TimelineEntry, SocialEvent, RegionalData, EraMaster } from "@/types";

function generateLifeEvents(age: number, year: number, gender: string): string[] {
  const events: string[] = [];

  if (age === 0) events.push("誕生");
  if (age === 6) events.push("小学校入学");
  if (age === 12) events.push("中学校入学");
  if (age === 15) events.push("高校入学");
  if (age === 18) {
    events.push(year < 1975 ? "就職" : "大学入学");
  }
  if (age === 22 && year >= 1975) events.push("大学卒業・就職");
  if (age === 18 && year < 1975) {
    // already handled
  }
  if (gender === "female") {
    if (age === (year < 1990 ? 24 : 29)) events.push("結婚");
    if (age === (year < 1990 ? 26 : 31)) events.push("第一子誕生");
  } else {
    if (age === (year < 1990 ? 27 : 31)) events.push("結婚");
    if (age === (year < 1990 ? 29 : 33)) events.push("第一子誕生");
  }
  if (age === 40) events.push("キャリアの転換期");
  if (age === 50) events.push("人生の折り返し地点");
  if (age === (year < 2000 ? 60 : 65)) events.push("定年退職");
  if (age === 70) events.push("古希を迎える");
  if (age === 77) events.push("喜寿を迎える");
  if (age === 80) events.push("傘寿を迎える");

  return events;
}

export async function simulate(input: SimulationInput): Promise<SimulationResult> {
  const { birth_year, gender, region } = input;
  const supabase = getSupabase();

  // Fetch era data
  const { data: eras } = await supabase
    .from("eras_master")
    .select("*")
    .gte("year", birth_year)
    .lte("year", birth_year + 85)
    .order("year");

  // Fetch social events
  const { data: events } = await supabase
    .from("social_events")
    .select("*")
    .gte("year", birth_year)
    .lte("year", birth_year + 85)
    .order("year");

  // Fetch regional data
  const { data: regionalData } = await supabase
    .from("regional_data")
    .select("*")
    .eq("region_name", region)
    .gte("year", birth_year)
    .lte("year", birth_year + 85)
    .order("year");

  const eraMap = new Map<number, EraMaster>();
  (eras || []).forEach((e) => eraMap.set(e.year, e));

  const eventMap = new Map<number, SocialEvent[]>();
  (events || []).forEach((e) => {
    if (!eventMap.has(e.year)) eventMap.set(e.year, []);
    eventMap.get(e.year)!.push(e);
  });

  const regionalMap = new Map<number, RegionalData[]>();
  (regionalData || []).forEach((r) => {
    if (!regionalMap.has(r.year)) regionalMap.set(r.year, []);
    regionalMap.get(r.year)!.push(r);
  });

  // Build timeline
  const timeline: TimelineEntry[] = [];
  const firstEra = eraMap.values().next().value;
  const lifeExpectancy = firstEra?.life_expectancy ?? 80;
  const endYear = Math.min(birth_year + Math.ceil(lifeExpectancy), 2025);

  for (let year = birth_year; year <= endYear; year++) {
    const age = year - birth_year;
    const era = eraMap.get(year);
    const yearEvents = eventMap.get(year) || [];
    const yearRegional = regionalMap.get(year) || [];
    const lifeEvents = generateLifeEvents(age, year, gender);

    // Only include years with notable content
    if (lifeEvents.length === 0 && yearEvents.length === 0 && yearRegional.length === 0 && age % 10 !== 0) {
      continue;
    }

    timeline.push({
      age,
      year,
      era_name: era?.era_name ?? `${year}年`,
      life_events: lifeEvents,
      social_events: yearEvents,
      regional_news: yearRegional,
      avg_annual_income: era?.avg_annual_income ?? 0,
      life_expectancy: era?.life_expectancy ?? 0,
    });
  }

  // Save to database
  const { data: saved } = await supabase
    .from("life_simulations")
    .insert({
      birth_year,
      gender,
      region,
      result_data: { input, timeline },
    })
    .select("id")
    .single();

  return {
    id: saved?.id,
    input,
    timeline,
  };
}
