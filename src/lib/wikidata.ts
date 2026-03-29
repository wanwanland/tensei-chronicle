const COUNTRY_WIKIDATA_MAP: Record<string, string> = {
  "日本": "Q17",
  "アメリカ": "Q30",
  "イギリス": "Q145",
  "フランス": "Q142",
  "中国": "Q148",
  "インド": "Q668",
  "ブラジル": "Q155",
  "ナイジェリア": "Q1033",
  "オーストラリア": "Q408",
  "ロシア": "Q159",
};

export interface WikidataEvent {
  year: number;
  label: string;
  description: string;
}

export async function fetchWikidataEvents(
  region: string,
  decadeStart: number,
  decadeEnd: number
): Promise<WikidataEvent[]> {
  const countryCode = COUNTRY_WIKIDATA_MAP[region];
  if (!countryCode) return [];

  const sparql = `
    SELECT DISTINCT ?event ?eventLabel ?eventDescription (YEAR(?date) AS ?year) WHERE {
      ?event wdt:P31/wdt:P279* wd:Q1190554 .
      ?event wdt:P17 wd:${countryCode} .
      ?event wdt:P585 ?date .
      FILTER(YEAR(?date) >= ${decadeStart} && YEAR(?date) <= ${decadeEnd})
      SERVICE wikibase:label { bd:serviceParam wikibase:language "ja,en" . }
    }
    ORDER BY ?year
    LIMIT 50
  `;

  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}&format=json`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json", "User-Agent": "TenseiChronicle/1.0" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const bindings = data?.results?.bindings ?? [];

    return bindings.map((b: Record<string, { value: string }>) => ({
      year: parseInt(b.year.value),
      label: b.eventLabel?.value ?? "",
      description: b.eventDescription?.value ?? "",
    })).filter((e: WikidataEvent) => e.label && !e.label.startsWith("Q"));
  } catch {
    return [];
  }
}
