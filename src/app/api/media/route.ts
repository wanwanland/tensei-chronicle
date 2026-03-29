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

  // Step 1: LLMで正確なWikipedia記事タイトルを推測
  let articleTitles: Array<{ lang: string; title: string }> = [];

  if (isLLMAvailable()) {
    try {
      const prompt = `あなたはWikipediaの専門家です。以下の歴史的出来事に直接該当するWikipedia記事の正確なタイトルを教えてください。

出来事: ${eventTitle} (${year}年, ${region})
詳細: ${eventDescription}

ルール:
- Wikipediaに実在する可能性が高い記事タイトルを正確に推測する
- 禁止: 国名のみ(例:「ナイジェリア」)、年のみ(例:「1960年」)、無関係な記事
- その出来事そのものを直接解説する記事のみ
- 例: 「ナイジェリア独立」→ ja:「ナイジェリアの歴史」, en:「History of Nigeria」
- 例: 「東京オリンピック 1964」→ ja:「1964年東京オリンピック」, en:「1964 Summer Olympics」
- 日本語版2つ、英語版2つ（確実に存在すると思われるもの）
- JSON配列のみ出力: [{"lang":"ja","title":"記事タイトル"},{"lang":"en","title":"Article Title"}]`;

      const parsed = await generateJSON<Array<{ lang: string; title: string }>>(prompt, 500);
      if (parsed) {
        articleTitles = parsed;
      }
    } catch {
      // Fallback below
    }
  }

  // Fallback
  if (articleTitles.length === 0) {
    articleTitles = [
      { lang: "ja", title: eventTitle },
      { lang: "en", title: `${eventTitle} ${year}` },
    ];
  }

  // Step 2: 各タイトルでWikipedia記事を直接取得（検索ではなくダイレクトアクセス）
  const results: MediaLink[] = [];
  const seenUrls = new Set<string>();

  for (const { lang, title } of articleTitles) {
    if (results.length >= 3) break;
    const wikiLang = lang === "en" ? "en" : "ja";

    // まず直接記事取得を試みる
    const directResult = await fetchWikiSummary(wikiLang, title);
    if (directResult && !seenUrls.has(directResult.url)) {
      seenUrls.add(directResult.url);
      results.push(directResult);
      continue;
    }

    // 直接取得失敗時のみ検索にフォールバック（上位1件のみ）
    const searchResult = await searchWiki(wikiLang, `${title} ${year}`);
    if (searchResult && !seenUrls.has(searchResult.url)) {
      seenUrls.add(searchResult.url);
      results.push(searchResult);
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

async function fetchWikiSummary(lang: string, title: string): Promise<MediaLink | null> {
  try {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "TenseiChronicle/1.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;

    const data = await res.json();
    // disambiguation、not found、一般的すぎる記事は除外
    if (data.type === "disambiguation" || data.type === "no-extract" || !data.extract) return null;

    return {
      title: data.title,
      url: data.content_urls?.desktop?.page ?? `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      thumbnail: data.thumbnail?.source ?? null,
      description: (data.extract ?? "").slice(0, 150),
      source: lang === "ja" ? "wikipedia_ja" : "wikipedia_en",
    };
  } catch {
    return null;
  }
}

async function searchWiki(lang: string, query: string): Promise<MediaLink | null> {
  try {
    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=1&format=json&origin=*`;
    const res = await fetch(searchUrl, {
      headers: { "User-Agent": "TenseiChronicle/1.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;

    const data = await res.json();
    const sr = data?.query?.search?.[0];
    if (!sr) return null;

    // 検索結果の記事を直接取得してサムネイルを得る
    return fetchWikiSummary(lang, sr.title);
  } catch {
    return null;
  }
}
