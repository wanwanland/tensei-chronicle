import { cn } from "@/lib/cn";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassPanel({ children, className, glow = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-white/5 backdrop-blur-md",
        glow && "shadow-[0_0_15px_rgba(0,243,255,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
