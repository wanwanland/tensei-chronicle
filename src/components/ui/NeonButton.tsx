"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "cyan" | "magenta";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function NeonButton({
  children,
  onClick,
  type = "button",
  variant = "cyan",
  disabled = false,
  loading = false,
  className,
}: NeonButtonProps) {
  const colors = {
    cyan: {
      border: "border-neon-cyan",
      text: "text-neon-cyan",
      hover: "hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:bg-neon-cyan/10",
    },
    magenta: {
      border: "border-neon-magenta",
      text: "text-neon-magenta",
      hover: "hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:bg-neon-magenta/10",
    },
  };

  const c = colors[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex items-center justify-center gap-2 rounded border px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-200",
        c.border,
        c.text,
        c.hover,
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
