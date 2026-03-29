"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { REGION_CURRENCY } from "@/lib/constants";
import type { TimelineEntry } from "@/types";
import { TrendingUp, Heart, Newspaper, Clock, ArrowRight, Beef } from "lucide-react";

interface SummaryDashboardProps {
  timeline: TimelineEntry[];
  region: string;
}

export function SummaryDashboard({ timeline, region }: SummaryDashboardProps) {
  if (timeline.length === 0) return null;

  const first = timeline[0];
  const last = timeline[timeline.length - 1];
  const currencyCode = first.currency;
  const currencyInfo = Object.values(REGION_CURRENCY).find((c) => c.code === currencyCode);
  const symbol = currencyInfo?.symbol ?? "";
  const isJPY = currencyCode === "JPY";

  // Stats
  const peakIncome = Math.max(...timeline.map((e) => e.avg_annual_income));
  const peakIncomeEntry = timeline.find((e) => e.avg_annual_income === peakIncome);
  const incomeMultiplier = first.avg_annual_income > 0
    ? (peakIncome / first.avg_annual_income).toFixed(1)
    : "—";

  const firstIncomeDisplay = formatIncome(first.avg_annual_income, symbol, currencyCode);
  const peakIncomeDisplay = formatIncome(peakIncome, symbol, currencyCode);
  const firstJpyNote = !isJPY ? `(${formatJPY(toJPY(first.avg_annual_income, currencyCode, first.year))})` : "";
  const peakJpyNote = !isJPY ? `(${formatJPY(toJPY(peakIncome, currencyCode, peakIncomeEntry?.year ?? last.year))})` : "";

  // Hamburger price (currency may differ between birth year and now, e.g. FRF→EUR)
  const firstBurger = first.big_mac_price;
  const lastBurger = last.big_mac_price;
  const firstBurgerCurrency = first.currency;
  const lastBurgerCurrency = last.currency;
  const firstBurgerSymbol = currencySymbol(firstBurgerCurrency);
  const lastBurgerSymbol = currencySymbol(lastBurgerCurrency);
  // For multiplier, convert both to JPY for fair comparison when currency changed
  const firstBurgerJpy = firstBurger ? toJPY(firstBurger, firstBurgerCurrency) : 0;
  const lastBurgerJpy = lastBurger ? toJPY(lastBurger, lastBurgerCurrency) : 0;
  const burgerMultiplier = firstBurgerJpy > 0 && lastBurgerJpy > 0
    ? (lastBurgerJpy / firstBurgerJpy).toFixed(1)
    : null;
  const showFirstBurgerJpy = firstBurger && firstBurgerCurrency !== "JPY";
  const showLastBurgerJpy = lastBurger && lastBurgerCurrency !== "JPY";

  // Median life expectancy
  const firstMedian = first.median_life_expectancy;
  const lastMedian = last.median_life_expectancy;

  const totalEvents = timeline.reduce(
    (sum, e) => sum + e.social_events.length + e.regional_news.length,
    0
  );

  // Life milestones
  const milestones = timeline
    .filter((e) => e.life_events.length > 0)
    .flatMap((e) => e.life_events.map((evt) => ({ age: e.age, year: e.year, event: evt })));

  // Top 3 social events (pick from different decades for variety)
  const topEvents = selectTopEvents(timeline);

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard
          icon={<Heart className="h-4 w-4" />}
          label="平均寿命 / 中央値"
          fromValue={`${first.life_expectancy}歳${firstMedian ? ` (中央${firstMedian}歳)` : ""}`}
          toValue={`${last.life_expectancy}歳${lastMedian ? ` (中央${lastMedian}歳)` : ""}`}
          color="cyan"
          delay={0}
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="年収"
          fromValue={`${firstIncomeDisplay}${firstJpyNote ? ` ${firstJpyNote}` : ""}`}
          toValue={`${peakIncomeDisplay}${peakJpyNote ? ` ${peakJpyNote}` : ""}`}
          subtext={`${incomeMultiplier}倍 (${peakIncomeEntry?.age ?? 0}歳時ピーク)`}
          color="magenta"
          delay={0.1}
        />
        <StatCard
          icon={<Newspaper className="h-4 w-4" />}
          label="体験した出来事"
          fromValue=""
          toValue={`${totalEvents}件`}
          color="cyan"
          delay={0.2}
        />
        {firstBurger != null && lastBurger != null && (
          <StatCard
            icon={<Beef className="h-4 w-4" />}
            label="ハンバーガー価格"
            fromValue={`${firstBurgerSymbol}${firstBurger}${showFirstBurgerJpy ? ` (${Math.round(firstBurgerJpy)}円)` : ""}`}
            toValue={`${lastBurgerSymbol}${lastBurger}${showLastBurgerJpy ? ` (${Math.round(lastBurgerJpy)}円)` : ""}`}
            subtext={burgerMultiplier ? `${burgerMultiplier}倍に上昇` : undefined}
            color="cyan"
            delay={0.25}
          />
        )}
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="生きた時代"
          fromValue={`${first.era_name} (${first.year}年)`}
          toValue={`${last.era_name} (${last.year}年)`}
          color="magenta"
          delay={0.3}
        />
      </div>

      {/* Life Milestones */}
      <GlassPanel className="mb-6 p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/50">
          Life Milestones
        </p>
        <div className="flex flex-wrap gap-2">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              className="flex items-center gap-1.5"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neon-cyan/40 bg-neon-cyan/5 font-mono text-[10px] text-neon-cyan">
                {m.age}
              </span>
              <span className="font-mono text-xs text-neon-magenta">{m.event}</span>
              {i < milestones.length - 1 && (
                <ArrowRight className="mx-1 h-3 w-3 text-white/15" />
              )}
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Top Events */}
      {topEvents.length > 0 && (
        <GlassPanel className="mb-8 p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-magenta/50">
            時代を彩った出来事
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {topEvents.map((evt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="rounded border border-white/5 bg-white/3 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neon-cyan/60">
                    {evt.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/25">{evt.year}</span>
                </div>
                <p className="text-sm font-bold text-white/90">{evt.title}</p>
                <p className="mt-1 text-xs text-white/40">{evt.description}</p>
              </motion.div>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  fromValue,
  toValue,
  subtext,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  fromValue: string;
  toValue: string;
  subtext?: string;
  color: "cyan" | "magenta";
  delay: number;
}) {
  const borderColor = color === "cyan" ? "border-neon-cyan/20" : "border-neon-magenta/20";
  const textColor = color === "cyan" ? "text-neon-cyan" : "text-neon-magenta";
  const iconColor = color === "cyan" ? "text-neon-cyan/60" : "text-neon-magenta/60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <GlassPanel className={`p-3 ${borderColor}`}>
        <div className="mb-2 flex items-center gap-1.5">
          <span className={iconColor}>{icon}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
            {label}
          </span>
        </div>
        {fromValue ? (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs text-white/40">{fromValue}</span>
            <ArrowRight className="h-3 w-3 text-white/20" />
            <span className={`font-mono text-sm font-bold ${textColor}`}>{toValue}</span>
          </div>
        ) : (
          <span className={`font-mono text-lg font-bold ${textColor}`}>{toValue}</span>
        )}
        {subtext && (
          <p className="mt-1 font-mono text-[10px] text-white/25">{subtext}</p>
        )}
      </GlassPanel>
    </motion.div>
  );
}

// Format income in human-readable Japanese-friendly units
function formatIncome(num: number, symbol: string, currency: string): string {
  if (num === 0) return "—";

  if (currency === "JPY") {
    if (num >= 100_000_000) return `${symbol}${(num / 100_000_000).toFixed(1)}億`;
    if (num >= 10_000) return `${symbol}${(num / 10_000).toFixed(0)}万`;
    return `${symbol}${num.toLocaleString()}`;
  }

  // Non-JPY: use 万/億 style for large numbers, otherwise show full
  if (num >= 1_000_000) return `${symbol}${(num / 1_000_000).toFixed(1)}百万`;
  if (num >= 1_000) return `${symbol}${num.toLocaleString()}`;
  return `${symbol}${num}`;
}

// Format as Japanese Yen with 万 unit
function formatJPY(jpy: number): string {
  if (jpy <= 0) return "";
  if (jpy >= 100_000_000) return `約${(jpy / 100_000_000).toFixed(1)}億円`;
  if (jpy >= 10_000) return `約${Math.round(jpy / 10_000)}万円`;
  return `約${Math.round(jpy).toLocaleString()}円`;
}

// Approximate conversion to JPY (rough 2024 rates for intuitive comparison)
const JPY_RATES: Record<string, number> = {
  USD: 150,
  GBP: 190,
  EUR: 163,
  FRF: 25, // フランス・フラン (1 FRF ≈ 25 JPY)
  CNY: 21,
  INR: 1.8,
  BRL: 30,
  NGN: 0.09,
  ZAR: 8.2,
  SOS: 0.26,
  AUD: 98,
  RUB: 1.6,
  JPY: 1,
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  JPY: "¥", USD: "$", GBP: "£", EUR: "€", FRF: "₣",
  CNY: "¥", INR: "₹", BRL: "R$", NGN: "₦", ZAR: "R", SOS: "Sh", AUD: "A$", RUB: "₽",
};

function currencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] ?? "";
}

function toJPY(amount: number, currency: string, _year?: number): number {
  const rate = JPY_RATES[currency] ?? 1;
  return amount * rate;
}

function selectTopEvents(timeline: TimelineEntry[]) {
  const allEvents = timeline.flatMap((e) =>
    e.social_events.map((s) => ({ ...s, year: e.year }))
  );
  if (allEvents.length <= 3) return allEvents;

  // Prioritize region-specific events (region != null) over global ones
  const regionEvents = allEvents.filter((e) => e.region != null);
  const globalEvents = allEvents.filter((e) => e.region == null);

  // Pick from different decades, preferring region-specific events
  const byDecade = new Map<number, typeof allEvents>();
  const source = regionEvents.length >= 3 ? regionEvents : allEvents;
  for (const evt of source) {
    const decade = Math.floor(evt.year / 10) * 10;
    if (!byDecade.has(decade)) byDecade.set(decade, []);
    byDecade.get(decade)!.push(evt);
  }

  const result: typeof allEvents = [];
  const decades = [...byDecade.keys()].sort();
  const step = Math.max(1, Math.floor(decades.length / 3));

  for (let i = 0; i < 3 && i * step < decades.length; i++) {
    const decade = decades[Math.min(i * step, decades.length - 1)];
    const events = byDecade.get(decade)!;
    // Within the decade, prefer region-specific over global
    const best = events.find((e) => e.region != null) ?? events[0];
    result.push(best);
  }

  // If we still have global-only results, try to replace with region-specific from unused decades
  if (result.some((r) => r.region == null) && regionEvents.length > 0) {
    const usedYears = new Set(result.map((r) => r.year));
    const unused = regionEvents.filter((e) => !usedYears.has(e.year));
    for (let i = 0; i < result.length; i++) {
      if (result[i].region == null && unused.length > 0) {
        result[i] = unused.shift()!;
      }
    }
  }

  return result;
}
