"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Loader2, ExternalLink } from "lucide-react";

interface MediaLink {
  title: string;
  url: string;
  thumbnail: string | null;
  description: string;
  source: string;
}

interface MediaLinksProps {
  year: number;
  region: string;
  eventTitle: string;
  eventDescription: string;
}

export function MediaLinks({ year, region, eventTitle, eventDescription }: MediaLinksProps) {
  const [links, setLinks] = useState<MediaLink[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
    if (links) return;

    setLoading(true);
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, region, eventTitle, eventDescription }),
      });
      const data = await res.json();
      setLinks(Array.isArray(data) && data.length > 0 ? data : null);
    } catch {
      setLinks(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1">
      <button
        onClick={handleClick}
        className="flex items-center gap-1 font-mono text-[10px] text-white/20 transition-colors hover:text-neon-cyan/60"
      >
        <Link2 className="h-3 w-3" />
        <span>{open ? "閉じる" : "関連コンテンツ"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 rounded border border-neon-cyan/10 bg-neon-cyan/5 px-3 py-2"
                >
                  <Loader2 className="h-3 w-3 animate-spin text-neon-cyan/50" />
                  <span className="font-mono text-xs text-neon-cyan/40">検索中...</span>
                </motion.div>
              ) : links ? (
                links.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className="flex gap-3 rounded border border-neon-cyan/15 bg-neon-cyan/5 p-2 transition-colors hover:border-neon-cyan/30 hover:bg-neon-cyan/10"
                  >
                    {link.thumbnail && (
                      <img
                        src={link.thumbnail}
                        alt={link.title}
                        className="h-16 w-16 flex-shrink-0 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="truncate font-mono text-xs font-bold text-neon-cyan/80">
                          {link.title}
                        </p>
                        <ExternalLink className="h-3 w-3 flex-shrink-0 text-neon-cyan/40" />
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[10px] text-white/40">
                        {link.description}
                      </p>
                      <span className="mt-1 inline-block font-mono text-[9px] text-neon-cyan/30">
                        {link.source === "wikipedia_ja" ? "Wikipedia (日本語)" : "Wikipedia (English)"}
                      </span>
                    </div>
                  </motion.a>
                ))
              ) : (
                <p className="font-mono text-[10px] text-white/20">関連コンテンツが見つかりませんでした</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
