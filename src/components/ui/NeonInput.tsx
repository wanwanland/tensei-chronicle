import { cn } from "@/lib/cn";

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function NeonInput({ label, className, ...props }: NeonInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/60">
        {label}
      </label>
      <input
        className={cn(
          "rounded border border-white/15 bg-black/60 px-3 py-2.5 font-mono text-sm text-white outline-none transition-all duration-200",
          "placeholder:text-white/20",
          "focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.3)]",
          className
        )}
        {...props}
      />
    </div>
  );
}
