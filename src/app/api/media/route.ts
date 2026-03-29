import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "@/lib/supabase";

let _client: Anthropic | null = null;

function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

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

  // Step 1: Use Claude to generate optimal Wikipedia search queries
  const client = getClient();
  let queries: string[] = [];

  if (client) {
    try {
      const message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `以下の歴史的出来事について、Wikipedia記事を検索するための最適なクエリを生成してください。

出来事: ${eventTitle} (${year}年, ${region})
詳細: ${eventDescription}

ルール:
- 日本語Wikipedia用のクエリを2つ、英語Wikipedia用のクエリを2つ生成
- Wikipediaの記事タイトルに近い具体的な名称を使う
- JSON配列で出力: [{"lang":"ja","query":"..."},{"lang":"en","query":"..."}]のみ出力`,
        }],
      });

      const text = message.content[0].type === "text" ? message.content[0].text : "";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as Array<{ lang: string; query: string }>;
        queries = parsed.map((q) => `${q.lang}:${q.query}`);
      }
    } catch {
      // Fall back to direct search
    }
  }

  // Fallback: use event title directly
  if (queries.length === 0) {
    queries = [`ja:${eventTitle}`, `en:${eventTitle} ${year}`];
  }

  // Step 2: Search Wikipedia for each query
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

        // Get page summary with thumbnail
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

  // Step 3: Cache results
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
