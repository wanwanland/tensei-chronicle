import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Provider = "gemini" | "claude";

function getProvider(): Provider {
  const env = process.env.LLM_PROVIDER?.toLowerCase();
  if (env === "claude") return "claude";
  if (env === "gemini") return "gemini";
  // Auto-detect from available keys
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.ANTHROPIC_API_KEY) return "claude";
  return "gemini"; // default
}

// ---- Claude ----
let _claude: Anthropic | null = null;

function getClaude(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!_claude) {
    _claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _claude;
}

async function callClaude(prompt: string, maxTokens: number): Promise<string> {
  const client = getClaude();
  if (!client) throw new Error("ANTHROPIC_API_KEY not set");

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

// ---- Gemini ----
let _gemini: GoogleGenerativeAI | null = null;

function getGemini(): GoogleGenerativeAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!_gemini) {
    _gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return _gemini;
}

async function callGemini(prompt: string, maxTokens: number): Promise<string> {
  const genAI = getGemini();
  if (!genAI) throw new Error("GEMINI_API_KEY not set");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { maxOutputTokens: maxTokens },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ---- Public API ----

export function isLLMAvailable(): boolean {
  const provider = getProvider();
  if (provider === "claude") return !!process.env.ANTHROPIC_API_KEY;
  return !!process.env.GEMINI_API_KEY;
}

export async function generateText(prompt: string, maxTokens: number = 500): Promise<string> {
  const provider = getProvider();
  if (provider === "claude") return callClaude(prompt, maxTokens);
  return callGemini(prompt, maxTokens);
}

export async function generateJSON<T>(prompt: string, maxTokens: number = 500): Promise<T | null> {
  const text = await generateText(prompt, maxTokens);
  const jsonMatch = text.match(/\[[\s\S]*?\]/);
  if (!jsonMatch) return null;
  try {
    return JSON.parse(jsonMatch[0]) as T;
  } catch {
    return null;
  }
}
