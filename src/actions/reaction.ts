"use server";

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

export interface ReactionInput {
  year: number;
  age: number;
  gender: string;
  region: string;
  eventTitle: string;
  eventDescription: string;
}

export async function generateReaction(input: ReactionInput): Promise<string[]> {
  const { year, age, gender, region, eventTitle, eventDescription } = input;

  // Create a cache key from the event + persona
  const eventKey = `${year}:${eventTitle}`;

  // Check cache first
  try {
    const supabase = getSupabase();
    const { data: cached } = await supabase
      .from("event_reactions")
      .select("reactions")
      .eq("event_key", eventKey)
      .eq("age", age)
      .eq("gender", gender)
      .eq("region", region)
      .single();

    if (cached?.reactions) {
      return cached.reactions as string[];
    }
  } catch {
    // Cache miss, proceed to generate
  }

  // Generate via Claude API
  const client = getClient();
  if (!client) return [];

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
    if (!jsonMatch) return [];

    const reactions = JSON.parse(jsonMatch[0]) as string[];
    if (!Array.isArray(reactions) || reactions.length === 0) return [];

    // Cache the result
    try {
      const supabase = getSupabase();
      await supabase.from("event_reactions").upsert(
        { event_key: eventKey, age, gender, region, reactions },
        { onConflict: "event_key,age,gender,region" }
      );
    } catch {
      // Cache failure is non-fatal
    }

    return reactions.slice(0, 3);
  } catch {
    return [];
  }
}
