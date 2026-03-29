import { NextRequest, NextResponse } from "next/server";
import { generateJSON, isLLMAvailable } from "@/lib/llm";
import { getSupabase } from "@/lib/supabase";

interface MediaLink {
  title: string;
  url: string;
  thumbnail: string | null;
  description: string;
  source: "wikipedia_ja" | "wikipedia_en";
}

export async function POST(request: NextRequest) {
  const { year, region, eventTitle, eventDescription } = await request.json();
  const eventKey = `${year}:${eventTitle}`;

  // Check cache
  try {
    const supabase = getSupabase();
    const { data: cached } = await supabase
      .from("event_media")
      .select("media_links")
      .eq("event_key", eventKey)
      .eq("region", region)
      .maybeSingle();

    if (cached?.media_links) {
      return NextResponse.json(cached.media_links);
    }
  } catch {
    // Cache miss
  }

  // Step 1: Generate Wikipedia search queries (LLM-assisted or fallback)
  let queries: string[] = [];

  if (isLLMAvailable()) {
    try {
      const prompt = `以下の歴史的出来事について、Wikipedia記事を検索するための最適なクエリを生成してください。

出来事: ${eventTitle} (${year}年, ${region})
詳細: ${eventDescription}

ルール:
- 日本語Wikipedia用のクエリを2つ、英語Wikipedia用のクエリを2つ生成
- Wikipediaの記事タイトルに近い具体的な名称を使う
- JSON配列で出力: [{"lang":"ja","query":"..."},{"lang":"en","query":"..."}]のみ出力`;

      const parsed = await generateJSON<Array<{ lang: string; query: string }>>(prompt, 300);
      if (parsed) {
        queries = parsed.map((q) => `${q.lang}:${q.query}`);
      }
    } catch {
      // Fall back to direct search
    }
  }

  if (queries.length === 0) {
    queries = [`ja:${eventTitle}`, `en:${eventTitle} ${year}`];
  }

  // Step 2: Search Wikipedia
  const results: MediaLink[] = [];
  const seenUrls = new Set<string>();

  for (const q of queries) {
    if (results.length >= 3) break;

    const [lang, query] = q.includes(":") ? [q.split(":")[0], q.slice(q.indexOf(":") + 1)] : ["ja", q];
    const wikiLang = lang === "en" ? "en" : "ja";

    try {
      const searchUrl = `https://${wikiLang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=2&format=json&origin=*`;
      const searchRes = await fetch(searchUrl, {
        headers: { "User-Agent": "TenseiChronicle/1.0" },
        signal: AbortSignal.timeout(5000),
      });

      if (!searchRes.ok) continue;
      const searchData = await searchRes.json();
      const searchResults = searchData?.query?.search ?? [];

      for (const sr of searchResults) {
        if (results.length >= 3) break;

        const pageTitle = sr.title as string;
        const pageUrl = `https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, "_"))}`;

        if (seenUrls.has(pageUrl)) continue;
        seenUrls.add(pageUrl);

        try {
          const summaryUrl = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
          const summaryRes = await fetch(summaryUrl, {
            headers: { "User-Agent": "TenseiChronicle/1.0" },
            signal: AbortSignal.timeout(5000),
          });

          if (!summaryRes.ok) {
            results.push({
              title: pageTitle,
              url: pageUrl,
              thumbnail: null,
              description: (sr.snippet as string).replace(/<[^>]+>/g, "").slice(0, 120),
              source: wikiLang === "ja" ? "wikipedia_ja" : "wikipedia_en",
            });
            continue;
          }

          const summary = await summaryRes.json();
          results.push({
            title: summary.title ?? pageTitle,
            url: summary.content_urls?.desktop?.page ?? pageUrl,
            thumbnail: summary.thumbnail?.source ?? null,
            description: (summary.extract ?? "").slice(0, 150),
            source: wikiLang === "ja" ? "wikipedia_ja" : "wikipedia_en",
          });
        } catch {
          results.push({
            title: pageTitle,
            url: pageUrl,
            thumbnail: null,
            description: "",
            source: wikiLang === "ja" ? "wikipedia_ja" : "wikipedia_en",
          });
        }
      }
    } catch {
      continue;
    }
  }

  // Step 3: Cache
  if (results.length > 0) {
    try {
      const supabase = getSupabase();
      await supabase.from("event_media").upsert(
        { event_key: eventKey, region, media_links: results },
        { onConflict: "event_key,region" }
      );
    } catch {
      // Non-fatal
    }
  }

  return NextResponse.json(results);
}
