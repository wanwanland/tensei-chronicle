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

export async function POST(request: NextRequest) {
  const { year, age, gender, region, eventTitle, eventDescription } = await request.json();

  const eventKey = `${year}:${eventTitle}`;

  // Check cache
  try {
    const supabase = getSupabase();
    const { data: cached } = await supabase
      .from("event_reactions")
      .select("reactions")
      .eq("event_key", eventKey)
      .eq("age", age)
      .eq("gender", gender)
      .eq("region", region)
      .maybeSingle();

    if (cached?.reactions) {
      return NextResponse.json(cached.reactions);
    }
  } catch {
    // Cache miss
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json([], { status: 503 });
  }

  const genderLabel = gender === "male" ? "男性" : "女性";
  const ageContext = age < 5
    ? `${age}歳の子供の親の目線で`
    : `${age}歳の${genderLabel}として`;

  const prompt = `あなたは${year}年の${region}に住む${ageContext}、以下のニュースを聞きました。

ニュース: ${eventTitle}
詳細: ${eventDescription}

この出来事に対する素直なつぶやきを3つ生成してください。

ルール:
- ${year}年当時の言葉遣いや価値観で話す
- ${region}の${age}歳の${genderLabel}らしい視点で
- 1つ30〜60文字程度の短いつぶやき
- 日常生活への影響や個人的な感情を含める
- 大げさすぎず、リアルな市民の声として
- 日本語で出力

以下のJSON配列のみ出力してください:
["つぶやき1", "つぶやき2", "つぶやき3"]`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return NextResponse.json([]);

    const reactions = JSON.parse(jsonMatch[0]) as string[];
    if (!Array.isArray(reactions) || reactions.length === 0) return NextResponse.json([]);

    // Cache
    try {
      const supabase = getSupabase();
      await supabase.from("event_reactions").upsert(
        { event_key: eventKey, age, gender, region, reactions },
        { onConflict: "event_key,age,gender,region" }
      );
    } catch {
      // Non-fatal
    }

    return NextResponse.json(reactions.slice(0, 3));
  } catch (err) {
    console.error("[reaction] API error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
