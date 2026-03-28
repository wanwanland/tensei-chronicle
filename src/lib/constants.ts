export const BIRTH_YEAR_MIN = 1950;
export const BIRTH_YEAR_MAX = 2020;

export const GENDER_OPTIONS = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
] as const;

export const REGION_OPTIONS = [
  { value: "東京", label: "東京" },
  { value: "大阪", label: "大阪" },
  { value: "北海道", label: "北海道" },
  { value: "福岡", label: "福岡" },
  { value: "沖縄", label: "沖縄" },
  { value: "愛知", label: "愛知" },
  { value: "広島", label: "広島" },
  { value: "宮城", label: "宮城" },
] as const;

export type Gender = (typeof GENDER_OPTIONS)[number]["value"];
export type Region = (typeof REGION_OPTIONS)[number]["value"];
