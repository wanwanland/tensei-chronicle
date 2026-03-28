"use server";

import { getSupabase } from "@/lib/supabase";
import type { SimulationInput, SimulationResult, TimelineEntry, SocialEvent, RegionalData, EraMaster } from "@/types";

interface LifePattern {
  schoolStart: number;
  middleSchool: number;
  highSchool: number;
  university: number;
  universityEnd: number;
  workStart: number;
  marriageMale: [number, number]; // [early era, modern]
  marriageFemale: [number, number];
  firstChildOffset: number;
  retirement: [number, number]; // [early era, modern]
  milestoneLabels: {
    birth: string;
    schoolStart: string;
    middleSchool: string;
    highSchool: string;
    university: string;
    universityEnd: string;
    work: string;
    marriage: string;
    firstChild: string;
    midCareer: string;
    halfLife: string;
    retirement: string;
  };
}

const LIFE_PATTERNS: Record<string, LifePattern> = {
  "日本": {
    schoolStart: 6, middleSchool: 12, highSchool: 15, university: 18, universityEnd: 22, workStart: 18,
    marriageMale: [27, 31], marriageFemale: [24, 29], firstChildOffset: 2, retirement: [60, 65],
    milestoneLabels: {
      birth: "誕生", schoolStart: "小学校入学", middleSchool: "中学校入学", highSchool: "高校入学",
      university: "大学入学", universityEnd: "大学卒業・就職", work: "就職",
      marriage: "結婚", firstChild: "第一子誕生", midCareer: "キャリアの転換期",
      halfLife: "人生の折り返し地点", retirement: "定年退職",
    },
  },
  "アメリカ": {
    schoolStart: 5, middleSchool: 11, highSchool: 14, university: 18, universityEnd: 22, workStart: 18,
    marriageMale: [26, 30], marriageFemale: [24, 28], firstChildOffset: 2, retirement: [62, 67],
    milestoneLabels: {
      birth: "Born", schoolStart: "Elementary School", middleSchool: "Middle School", highSchool: "High School",
      university: "Enter College", universityEnd: "College Graduation", work: "Start Working",
      marriage: "Marriage", firstChild: "First Child Born", midCareer: "Mid-Career Transition",
      halfLife: "Halfway Point", retirement: "Retirement",
    },
  },
  "イギリス": {
    schoolStart: 5, middleSchool: 11, highSchool: 14, university: 18, universityEnd: 21, workStart: 16,
    marriageMale: [28, 32], marriageFemale: [26, 30], firstChildOffset: 2, retirement: [60, 66],
    milestoneLabels: {
      birth: "Born", schoolStart: "Primary School", middleSchool: "Secondary School", highSchool: "Sixth Form / College",
      university: "Enter University", universityEnd: "University Graduation", work: "Start Working",
      marriage: "Marriage", firstChild: "First Child Born", midCareer: "Mid-Career Shift",
      halfLife: "Halfway Through Life", retirement: "Retirement",
    },
  },
  "フランス": {
    schoolStart: 6, middleSchool: 11, highSchool: 15, university: 18, universityEnd: 23, workStart: 18,
    marriageMale: [30, 34], marriageFemale: [28, 32], firstChildOffset: 1, retirement: [60, 62],
    milestoneLabels: {
      birth: "Naissance", schoolStart: "École primaire", middleSchool: "Collège", highSchool: "Lycée",
      university: "Entrée à l'université", universityEnd: "Diplôme universitaire", work: "Début de carrière",
      marriage: "Mariage", firstChild: "Premier enfant", midCareer: "Tournant de carrière",
      halfLife: "Mi-vie", retirement: "Retraite",
    },
  },
  "中国": {
    schoolStart: 7, middleSchool: 13, highSchool: 16, university: 18, universityEnd: 22, workStart: 16,
    marriageMale: [24, 28], marriageFemale: [22, 26], firstChildOffset: 2, retirement: [55, 60],
    milestoneLabels: {
      birth: "出生", schoolStart: "小学入学", middleSchool: "初中入学", highSchool: "高中入学",
      university: "大学入学", universityEnd: "大学毕业・就业", work: "开始工作",
      marriage: "结婚", firstChild: "第一个孩子出生", midCareer: "职业转折",
      halfLife: "人生半程", retirement: "退休",
    },
  },
  "インド": {
    schoolStart: 6, middleSchool: 11, highSchool: 14, university: 18, universityEnd: 22, workStart: 15,
    marriageMale: [22, 27], marriageFemale: [18, 24], firstChildOffset: 2, retirement: [58, 60],
    milestoneLabels: {
      birth: "जन्म (Birth)", schoolStart: "Primary School", middleSchool: "Middle School", highSchool: "High School",
      university: "Enter University", universityEnd: "Graduation", work: "Start Working",
      marriage: "विवाह (Marriage)", firstChild: "First Child", midCareer: "Career Turning Point",
      halfLife: "Halfway Point", retirement: "सेवानिवृत्ति (Retirement)",
    },
  },
  "ブラジル": {
    schoolStart: 6, middleSchool: 11, highSchool: 15, university: 18, universityEnd: 22, workStart: 16,
    marriageMale: [26, 30], marriageFemale: [23, 28], firstChildOffset: 2, retirement: [60, 65],
    milestoneLabels: {
      birth: "Nascimento", schoolStart: "Escola Primária", middleSchool: "Ensino Fundamental", highSchool: "Ensino Médio",
      university: "Entrada na Universidade", universityEnd: "Formatura", work: "Início da Carreira",
      marriage: "Casamento", firstChild: "Primeiro Filho", midCareer: "Mudança de Carreira",
      halfLife: "Metade da Vida", retirement: "Aposentadoria",
    },
  },
  "ナイジェリア": {
    schoolStart: 6, middleSchool: 12, highSchool: 15, university: 18, universityEnd: 23, workStart: 15,
    marriageMale: [25, 28], marriageFemale: [18, 23], firstChildOffset: 1, retirement: [60, 60],
    milestoneLabels: {
      birth: "Birth", schoolStart: "Primary School", middleSchool: "Junior Secondary", highSchool: "Senior Secondary",
      university: "Enter University", universityEnd: "Graduation / NYSC", work: "Start Working",
      marriage: "Marriage", firstChild: "First Child Born", midCareer: "Career Shift",
      halfLife: "Halfway Through Life", retirement: "Retirement",
    },
  },
  "オーストラリア": {
    schoolStart: 5, middleSchool: 12, highSchool: 13, university: 18, universityEnd: 21, workStart: 17,
    marriageMale: [28, 32], marriageFemale: [26, 30], firstChildOffset: 2, retirement: [60, 67],
    milestoneLabels: {
      birth: "Born", schoolStart: "Primary School", middleSchool: "Year 7", highSchool: "High School",
      university: "Enter University", universityEnd: "University Graduation", work: "Start Working",
      marriage: "Marriage", firstChild: "First Child Born", midCareer: "Mid-Career Transition",
      halfLife: "Halfway Point", retirement: "Retirement",
    },
  },
  "ロシア": {
    schoolStart: 7, middleSchool: 11, highSchool: 15, university: 17, universityEnd: 22, workStart: 17,
    marriageMale: [24, 28], marriageFemale: [21, 25], firstChildOffset: 2, retirement: [55, 60],
    milestoneLabels: {
      birth: "Рождение (Birth)", schoolStart: "Начальная школа", middleSchool: "Средняя школа", highSchool: "Старшая школа",
      university: "Поступление в университет", universityEnd: "Окончание университета", work: "Начало работы",
      marriage: "Свадьба (Marriage)", firstChild: "Первый ребёнок", midCareer: "Карьерный переход",
      halfLife: "Середина жизни", retirement: "Выход на пенсию",
    },
  },
};

function generateLifeEvents(age: number, year: number, gender: string, region: string): string[] {
  const pattern = LIFE_PATTERNS[region] || LIFE_PATTERNS["日本"];
  const labels = pattern.milestoneLabels;
  const events: string[] = [];
  const isModern = year >= 1990;

  if (age === 0) events.push(labels.birth);
  if (age === pattern.schoolStart) events.push(labels.schoolStart);
  if (age === pattern.middleSchool) events.push(labels.middleSchool);
  if (age === pattern.highSchool) events.push(labels.highSchool);

  if (age === pattern.university && isModern) {
    events.push(labels.university);
  } else if (age === pattern.workStart && !isModern) {
    events.push(labels.work);
  }

  if (age === pattern.universityEnd && isModern) events.push(labels.universityEnd);

  const marriageAge = gender === "female"
    ? (isModern ? pattern.marriageFemale[1] : pattern.marriageFemale[0])
    : (isModern ? pattern.marriageMale[1] : pattern.marriageMale[0]);

  if (age === marriageAge) events.push(labels.marriage);
  if (age === marriageAge + pattern.firstChildOffset) events.push(labels.firstChild);
  if (age === 40) events.push(labels.midCareer);
  if (age === 50) events.push(labels.halfLife);

  const retirementAge = isModern ? pattern.retirement[1] : pattern.retirement[0];
  if (age === retirementAge) events.push(labels.retirement);

  return events;
}

export async function simulate(input: SimulationInput): Promise<SimulationResult> {
  const { birth_year, gender, region } = input;
  const supabase = getSupabase();

  // Fetch era data for the specific region
  const { data: eras } = await supabase
    .from("eras_master")
    .select("*")
    .eq("region", region)
    .gte("year", birth_year)
    .lte("year", birth_year + 85)
    .order("year");

  // Fetch social events (global + region-specific)
  const { data: events } = await supabase
    .from("social_events")
    .select("*")
    .or(`region.is.null,region.eq.${region}`)
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
  const lifeExpectancy = firstEra?.life_expectancy ?? 75;
  const endYear = Math.min(birth_year + Math.ceil(lifeExpectancy), 2025);
  const defaultCurrency = firstEra?.currency ?? "USD";

  for (let year = birth_year; year <= endYear; year++) {
    const age = year - birth_year;
    const era = eraMap.get(year);
    const yearEvents = eventMap.get(year) || [];
    const yearRegional = regionalMap.get(year) || [];
    const lifeEvents = generateLifeEvents(age, year, gender, region);

    if (lifeEvents.length === 0 && yearEvents.length === 0 && yearRegional.length === 0 && age % 10 !== 0) {
      continue;
    }

    timeline.push({
      age,
      year,
      era_name: era?.era_name ?? `${year}`,
      life_events: lifeEvents,
      social_events: yearEvents,
      regional_news: yearRegional,
      avg_annual_income: era?.avg_annual_income ?? 0,
      currency: era?.currency ?? defaultCurrency,
      life_expectancy: era?.life_expectancy ?? 0,
    });
  }

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
