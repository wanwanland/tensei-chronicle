import { generateJSON, isLLMAvailable } from "./llm";
import type { WikidataEvent } from "./wikidata";

interface EnrichedEntry {
  region_name: string;
  year: number;
  topic: string;
  news_detail: string;
  source: string;
}

export async function generateRegionalEntries(
  region: string,
  decadeStart: number,
  wikidataEvents: WikidataEvent[]
): Promise<EnrichedEntry[]> {
  if (!isLLMAvailable()) return [];

  const factsText = wikidataEvents
    .map((e) => `- ${e.year}年: ${e.label}${e.description ? ` (${e.description})` : ""}`)
    .join("\n");

  const prompt = `あなたは「転生年表」という人生シミュレーションアプリの歴史データキュレーターです。

以下はWikidataから取得した${region}の${decadeStart}年代の出来事です:

${factsText || `(Wikidataからのデータが少ないため、あなたの知識で${region}の${decadeStart}年代の重要な出来事を補完してください)`}

これらの事実を元に、${region}に住む一般市民が体感したであろう出来事を、各年について1〜3件生成してください。

ルール:
- topicは「政治」「経済」「文化」「技術」「社会」「災害」「スポーツ」「環境」のいずれか
- news_detailは30〜80文字の日本語で、その出来事が市民生活にどう影響したかを生き生きと描写
- Wikidataの事実に基づきつつ、市民目線の体験として語る
- ${decadeStart}〜${decadeStart + 9}年の範囲で、各年最低1件は生成
- 重要度の高い出来事を優先

以下のJSON配列形式で出力してください（他の文章は不要）:
[{"year": 1960, "topic": "政治", "news_detail": "..."}]`;

  try {
    const parsed = await generateJSON<Array<{ year: number; topic: string; news_detail: string }>>(prompt, 4096);
    if (!parsed) return [];

    return parsed.map((entry) => ({
      region_name: region,
      year: entry.year,
      topic: entry.topic,
      news_detail: entry.news_detail,
      source: "wikidata_llm",
    }));
  } catch {
    return [];
  }
}
