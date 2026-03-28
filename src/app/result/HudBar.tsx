"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { TimelineEntry } from "@/types";

interface HudBarProps {
  entries: TimelineEntry[];
}

export function HudBar({ entries }: HudBarProps) {
  const [current, setCurrent] = useState<TimelineEntry | null>(entries[0] ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntries) => {
        for (const entry of observerEntries) {
          if (entry.isIntersecting) {
            const year = Number(entry.target.getAttribute("data-year"));
            const match = entries.find((e) => e.year === year);
            if (match) setCurrent(match);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const nodes = document.querySelectorAll("[data-year]");
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [entries]);

  if (!current) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-40 flex justify-center px-4 pt-3">
      <GlassPanel className="inline-flex items-center gap-4 px-6 py-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={current.year}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-white/80"
          >
            <span className="text-neon-cyan">AGE: {current.age}</span>
            <span className="mx-2 text-white/20">|</span>
            <span className="text-neon-magenta">YEAR: {current.year}</span>
            <span className="mx-2 text-white/20">|</span>
            <span className="text-white/50">{current.era_name}</span>
          </motion.span>
        </AnimatePresence>
      </GlassPanel>
    </div>
  );
}
