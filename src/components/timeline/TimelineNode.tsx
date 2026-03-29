"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { TimelineEntry } from "@/types";
import { cn } from "@/lib/cn";
import { REGION_CURRENCY } from "@/lib/constants";
import { ReactionBubble } from "./ReactionBubble";
import { MediaLinks } from "./MediaLinks";

interface TimelineNodeProps {
  entry: TimelineEntry;
  index: number;
  gender: string;
  region: string;
}

export function TimelineNode({ entry, index, gender, region }: TimelineNodeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start" data-year={entry.year}>
      {/* Mobile: single column layout */}
      <div className="flex items-start md:hidden">
        {/* Age badge */}
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
        {/* Card */}
        <div className="min-w-0 flex-1 pl-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <NodeContent entry={entry} align="left" gender={gender} region={region} />
          </motion.div>
        </div>
      </div>

      {/* Desktop: alternating left/right layout */}
      <div className="hidden md:flex md:w-full md:items-start">
        {/* Left content */}
        <div className={cn("w-[calc(50%-20px)]", isLeft ? "pr-6" : "")}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <NodeContent entry={entry} align="right" gender={gender} region={region} />
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
              <NodeContent entry={entry} align="left" gender={gender} region={region} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function NodeContent({ entry, align, gender, region }: { entry: TimelineEntry; align: "left" | "right"; gender: string; region: string }) {
  return (
    <GlassPanel className={cn("p-4", align === "right" ? "md:text-right" : "text-left")}>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neon-cyan/70">
        {entry.year} / {entry.era_name}
      </p>

      {/* Life events */}
      {entry.life_events.map((evt, i) => (
        <p key={i} className="mb-1 font-mono text-base font-bold text-neon-magenta">
          {evt}
        </p>
      ))}

      {/* Social events */}
      {entry.social_events.map((evt) => (
        <div key={evt.id} className="mt-2" role="article" aria-label={`${entry.year}年: ${evt.title}`}>
          <span className="font-mono text-xs uppercase tracking-wider text-neon-cyan/80">
            {evt.category}
          </span>
          <p className="text-sm text-white/90">{evt.title}</p>
          <p className="text-xs text-white/60">{evt.description}</p>
          <ReactionBubble
            input={{
              year: entry.year,
              age: entry.age,
              gender,
              region,
              eventTitle: evt.title,
              eventDescription: evt.description,
            }}
          />
          <MediaLinks
            year={entry.year}
            region={region}
            eventTitle={evt.title}
            eventDescription={evt.description}
          />
        </div>
      ))}

      {/* Regional news */}
      {entry.regional_news.map((news) => (
        <div key={news.id} className="mt-2 border-l-2 border-neon-magenta/40 pl-2" role="article" aria-label={`${news.topic}: ${news.news_detail}`}>
          <span className="font-mono text-xs uppercase tracking-wider text-neon-magenta/70">
            {news.topic}
          </span>
          <p className="text-xs text-white/70">{news.news_detail}</p>
          <ReactionBubble
            input={{
              year: entry.year,
              age: entry.age,
              gender,
              region,
              eventTitle: news.topic,
              eventDescription: news.news_detail,
            }}
          />
          <MediaLinks
            year={entry.year}
            region={region}
            eventTitle={news.news_detail}
            eventDescription={news.topic}
          />
        </div>
      ))}

      {/* Income & life expectancy */}
      {(entry.avg_annual_income > 0 || entry.life_expectancy > 0) && (
        <div className="mt-3 border-t border-white/10 pt-2 font-mono text-[11px] text-white/40">
          {entry.avg_annual_income > 0 && (
            <span>
              {(() => {
                const cur = Object.values(REGION_CURRENCY).find((c) => c.code === entry.currency);
                return `${cur?.symbol ?? ""}${entry.avg_annual_income.toLocaleString()} ${entry.currency}`;
              })()}
            </span>
          )}
          {entry.avg_annual_income > 0 && entry.life_expectancy > 0 && <span> | </span>}
          {entry.life_expectancy > 0 && <span>Life Exp: {entry.life_expectancy}</span>}
        </div>
      )}
    </GlassPanel>
  );
}
