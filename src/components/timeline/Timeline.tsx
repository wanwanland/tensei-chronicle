"use client";

import type { TimelineEntry } from "@/types";
import { TimelineNode } from "./TimelineNode";
import { TimelineConnector } from "./TimelineConnector";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12">
      {/* Central vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-neon-cyan/40 via-neon-cyan/15 to-transparent" />

      {entries.map((entry, i) => (
        <div key={entry.year}>
          <TimelineNode entry={entry} index={i} />
          {i < entries.length - 1 && <TimelineConnector />}
        </div>
      ))}
    </div>
  );
}
