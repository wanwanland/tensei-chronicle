import { getSupabase } from "@/lib/supabase";
import { Timeline } from "@/components/timeline/Timeline";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { HudBar } from "./HudBar";
import type { SimulationResult, TimelineEntry } from "@/types";
import { User, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

interface ResultPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <GlassPanel className="p-8 text-center">
          <p className="text-white/60">シミュレーションIDが指定されていません</p>
          <Link href="/" className="mt-4 inline-block text-neon-cyan hover:underline">
            トップに戻る
          </Link>
        </GlassPanel>
      </div>
    );
  }

  let result: SimulationResult | null = null;

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("life_simulations")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      const resultData = data.result_data as { input: SimulationResult["input"]; timeline: TimelineEntry[] };
      result = {
        id: data.id,
        input: resultData.input,
        timeline: resultData.timeline,
        created_at: data.created_at,
      };
    }
  } catch {
    // Supabase not configured or error
  }

  if (!result) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <GlassPanel className="p-8 text-center">
          <p className="text-white/60">シミュレーション結果が見つかりません</p>
          <Link href="/" className="mt-4 inline-block text-neon-cyan hover:underline">
            トップに戻る
          </Link>
        </GlassPanel>
      </div>
    );
  }

  const genderLabel = result.input.gender === "male" ? "男性" : "女性";

  return (
    <div className="pb-20">
      <HudBar entries={result.timeline} />

      {/* Summary header */}
      <div className="mx-auto max-w-4xl px-4 pt-16">
        <GlassPanel glow className="mb-8 p-6">
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-sm">
            <div className="flex items-center gap-2 text-neon-cyan">
              <Calendar className="h-4 w-4" />
              <span>{result.input.birth_year}年生まれ</span>
            </div>
            <div className="flex items-center gap-2 text-neon-magenta">
              <User className="h-4 w-4" />
              <span>{genderLabel}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="h-4 w-4" />
              <span>{result.input.region}</span>
            </div>
          </div>
        </GlassPanel>
      </div>

      <Timeline entries={result.timeline} />

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="font-mono text-sm text-neon-cyan/60 transition-colors hover:text-neon-cyan"
        >
          [ 別の人生をシミュレーション ]
        </Link>
      </div>
    </div>
  );
}
