export const BIRTH_YEAR_MIN = 1950;
export const BIRTH_YEAR_MAX = 2020;

export const GENDER_OPTIONS = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
] as const;

export const REGION_OPTIONS = [
  { value: "日本", label: "🇯🇵 日本" },
  { value: "アメリカ", label: "🇺🇸 アメリカ" },
  { value: "イギリス", label: "🇬🇧 イギリス" },
  { value: "フランス", label: "🇫🇷 フランス" },
  { value: "中国", label: "🇨🇳 中国" },
  { value: "インド", label: "🇮🇳 インド" },
  { value: "ブラジル", label: "🇧🇷 ブラジル" },
  { value: "ナイジェリア", label: "🇳🇬 ナイジェリア" },
  { value: "南アフリカ", label: "🇿🇦 南アフリカ" },
  { value: "ソマリア", label: "🇸🇴 ソマリア" },
  { value: "オーストラリア", label: "🇦🇺 オーストラリア" },
  { value: "ロシア", label: "🇷🇺 ロシア" },
] as const;

export const REGION_CURRENCY: Record<string, { symbol: string; code: string }> = {
  "日本": { symbol: "¥", code: "JPY" },
  "アメリカ": { symbol: "$", code: "USD" },
  "イギリス": { symbol: "£", code: "GBP" },
  "フランス": { symbol: "€", code: "EUR" },
  "中国": { symbol: "¥", code: "CNY" },
  "インド": { symbol: "₹", code: "INR" },
  "ブラジル": { symbol: "R$", code: "BRL" },
  "ナイジェリア": { symbol: "₦", code: "NGN" },
  "南アフリカ": { symbol: "R", code: "ZAR" },
  "ソマリア": { symbol: "Sh", code: "SOS" },
  "オーストラリア": { symbol: "A$", code: "AUD" },
  "ロシア": { symbol: "₽", code: "RUB" },
};

export type Gender = (typeof GENDER_OPTIONS)[number]["value"];
export type Region = (typeof REGION_OPTIONS)[number]["value"];
