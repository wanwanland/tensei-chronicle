"use client";

import type { TimelineEntry } from "@/types";
import { TimelineNode } from "./TimelineNode";
import { TimelineConnector } from "./TimelineConnector";

interface TimelineProps {
  entries: TimelineEntry[];
  gender: string;
  region: string;
}

export function Timeline({ entries, gender, region }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12">
      {/* Central vertical line - left on mobile, center on desktop */}
      <div className="absolute top-0 bottom-0 left-[36px] w-px bg-gradient-to-b from-neon-cyan/40 via-neon-cyan/15 to-transparent md:left-1/2 md:-translate-x-1/2" />

      {entries.map((entry, i) => (
        <div key={entry.year}>
          <TimelineNode entry={entry} index={i} gender={gender} region={region} />
          {i < entries.length - 1 && <TimelineConnector />}
        </div>
      ))}
    </div>
  );
}
