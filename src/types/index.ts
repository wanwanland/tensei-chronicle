export interface EraMaster {
  year: number;
  era_name: string;
  avg_annual_income: number;
  inflation_rate: number;
  life_expectancy: number;
}

export interface SocialEvent {
  id: string;
  year: number;
  category: string;
  title: string;
  description: string;
}

export interface RegionalData {
  id: string;
  region_name: string;
  year: number;
  topic: string;
  news_detail: string;
}

export interface SimulationInput {
  birth_year: number;
  gender: "male" | "female";
  region: string;
}

export interface TimelineEntry {
  age: number;
  year: number;
  era_name: string;
  life_events: string[];
  social_events: SocialEvent[];
  regional_news: RegionalData[];
  avg_annual_income: number;
  life_expectancy: number;
}

export interface SimulationResult {
  id?: string;
  input: SimulationInput;
  timeline: TimelineEntry[];
  created_at?: string;
}
