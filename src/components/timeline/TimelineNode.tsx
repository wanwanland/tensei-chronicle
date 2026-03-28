"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { TimelineEntry } from "@/types";
import { cn } from "@/lib/cn";

interface TimelineNodeProps {
  entry: TimelineEntry;
  index: number;
}

export function TimelineNode({ entry, index }: TimelineNodeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start" data-year={entry.year}>
      {/* Left content */}
      <div className={cn("w-[calc(50%-20px)]", isLeft ? "pr-6" : "")}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <NodeContent entry={entry} align="right" />
          </motion.div>
        )}
      </div>

      {/* Center age badge */}
      <div className="relative z-10 flex w-10 flex-shrink-0 justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neon-cyan bg-black font-mono text-xs text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.3)]"
        >
          {entry.age}
        </motion.div>
      </div>

      {/* Right content */}
      <div className={cn("w-[calc(50%-20px)]", !isLeft ? "pl-6" : "")}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <NodeContent entry={entry} align="left" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function NodeContent({ entry, align }: { entry: TimelineEntry; align: "left" | "right" }) {
  return (
    <GlassPanel className={cn("p-4", align === "right" ? "text-right" : "text-left")}>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neon-cyan/50">
        {entry.year} / {entry.era_name}
      </p>

      {/* Life events */}
      {entry.life_events.map((evt, i) => (
        <p key={i} className="mb-1 font-mono text-sm font-bold text-neon-magenta">
          {evt}
        </p>
      ))}

      {/* Social events */}
      {entry.social_events.map((evt) => (
        <div key={evt.id} className="mt-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neon-cyan/70">
            {evt.category}
          </span>
          <p className="text-sm text-white/80">{evt.title}</p>
          <p className="text-xs text-white/40">{evt.description}</p>
        </div>
      ))}

      {/* Regional news */}
      {entry.regional_news.map((news) => (
        <div key={news.id} className="mt-2 border-l-2 border-neon-magenta/30 pl-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neon-magenta/60">
            {news.topic}
          </span>
          <p className="text-xs text-white/50">{news.news_detail}</p>
        </div>
      ))}

      {/* Income & life expectancy */}
      {(entry.avg_annual_income > 0 || entry.life_expectancy > 0) && (
        <div className="mt-3 border-t border-white/5 pt-2 font-mono text-[10px] text-white/25">
          {entry.avg_annual_income > 0 && (
            <span>年収: ¥{entry.avg_annual_income.toLocaleString()}</span>
          )}
          {entry.avg_annual_income > 0 && entry.life_expectancy > 0 && <span> | </span>}
          {entry.life_expectancy > 0 && <span>平均寿命: {entry.life_expectancy}歳</span>}
        </div>
      )}
    </GlassPanel>
  );
}
