"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Loader2 } from "lucide-react";
import { generateReaction, type ReactionInput } from "@/actions/reaction";

interface ReactionBubbleProps {
  input: ReactionInput;
}

export function ReactionBubble({ input }: ReactionBubbleProps) {
  const [reactions, setReactions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    if (reactions) return; // Already loaded

    setLoading(true);
    try {
      const result = await generateReaction(input);
      setReactions(result.length > 0 ? result : ["...考えがまとまらない"]);
    } catch {
      setReactions(["...考えがまとまらない"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1">
      <button
        onClick={handleClick}
        className="flex items-center gap-1 font-mono text-[10px] text-white/20 transition-colors hover:text-neon-magenta/60"
      >
        <MessageCircle className="h-3 w-3" />
        <span>{open ? "閉じる" : "この人の声"}</span>
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
                  className="flex items-center gap-2 rounded border border-neon-magenta/10 bg-neon-magenta/5 px-3 py-2"
                >
                  <Loader2 className="h-3 w-3 animate-spin text-neon-magenta/50" />
                  <span className="font-mono text-xs text-neon-magenta/40">考え中...</span>
                </motion.div>
              ) : (
                reactions?.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.3 }}
                    className="relative rounded border border-neon-magenta/15 bg-neon-magenta/5 px-3 py-2"
                  >
                    {/* Speech bubble triangle */}
                    <div className="absolute -top-1 left-3 h-2 w-2 rotate-45 border-l border-t border-neon-magenta/15 bg-neon-magenta/5" />
                    <p className="font-mono text-xs text-white/70">
                      <span className="mr-1 text-neon-magenta/40">💬</span>
                      {text}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
