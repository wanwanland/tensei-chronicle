"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Terminal } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeonButton } from "@/components/ui/NeonButton";
import { NeonInput } from "@/components/ui/NeonInput";
import { NeonSelect } from "@/components/ui/NeonSelect";
import { BIRTH_YEAR_MIN, BIRTH_YEAR_MAX, GENDER_OPTIONS, REGION_OPTIONS } from "@/lib/constants";
import { simulate } from "@/actions/simulate";

export function InputTerminal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [birthYear, setBirthYear] = useState("1980");
  const [gender, setGender] = useState("male");
  const [region, setRegion] = useState("東京");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await simulate({
        birth_year: parseInt(birthYear),
        gender: gender as "male" | "female",
        region,
      });
      if (result.id) {
        router.push(`/result?id=${result.id}`);
      }
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassPanel glow className="mx-auto w-full max-w-lg p-6">
      {/* Terminal header */}
      <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
        <Terminal className="h-4 w-4 text-neon-cyan" />
        <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan/70">
          Life Simulation Terminal
        </span>
        <div className="ml-auto flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-neon-cyan/60" />
          <div className="h-2 w-2 rounded-full bg-neon-magenta/60" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <NeonInput
          label="Birth Year / 出生年"
          type="number"
          min={BIRTH_YEAR_MIN}
          max={BIRTH_YEAR_MAX}
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="1980"
        />

        <NeonSelect
          label="Gender / 性別"
          options={GENDER_OPTIONS}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <NeonSelect
          label="Region / 地域"
          options={REGION_OPTIONS}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <div className="mt-2 border-t border-white/10 pt-4">
          <NeonButton type="submit" loading={loading} className="w-full">
            <Play className="h-4 w-4" />
            Simulate
          </NeonButton>
        </div>
      </form>
    </GlassPanel>
  );
}
