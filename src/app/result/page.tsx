import type { Metadata } from "next";
import { getSimulationById } from "@/lib/simulation";
import { Timeline } from "@/components/timeline/Timeline";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { HudBar } from "./HudBar";
import { User, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

interface ResultPageProps {
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ searchParams }: ResultPageProps): Promise<Metadata> {
  const { id } = await searchParams;
  if (!id) return { title: "結果が見つかりません | 転生年表" };

  const result = await getSimulationById(id);
  if (!result) return { title: "結果が見つかりません | 転生年表" };

  const genderLabel = result.input.gender === "male" ? "男性" : "女性";
  const { birth_year, region } = result.input;

  // Pick key life highlights for the description
  const highlights = result.timeline
    .filter((e) => e.life_events.length > 0)
    .slice(0, 5)
    .map((e) => `${e.age}歳: ${e.life_events[0]}`)
    .join(" → ");

  const bigEvents = result.timeline
    .flatMap((e) => e.social_events)
    .slice(0, 3)
    .map((e) => e.title);

  const title = `${birth_year}年 ${region}生まれ ${genderLabel}の人生 | 転生年表`;
  const description = `${birth_year}年に${region}で${genderLabel}として生まれた人生をシミュレーション。${highlights}。${bigEvents.length > 0 ? `時代の出来事: ${bigEvents.join("、")}` : ""}`;

  const ogImageUrl = new URL(`/api/og`, process.env.NEXT_PUBLIC_SITE_URL || "https://app-be48400b-4f16-4b12-a577-5f823963167e.ingress.apprun.sakura.ne.jp");
  ogImageUrl.searchParams.set("id", id);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl.toString()],
    },
  };
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

  const result = await getSimulationById(id);

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
