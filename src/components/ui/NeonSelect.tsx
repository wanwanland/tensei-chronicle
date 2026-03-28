import { cn } from "@/lib/cn";

interface NeonSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly { value: string; label: string }[];
}

export function NeonSelect({ label, options, className, ...props }: NeonSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/60">
        {label}
      </label>
      <select
        className={cn(
          "appearance-none rounded border border-white/15 bg-black/60 px-3 py-2.5 font-mono text-sm text-white outline-none transition-all duration-200",
          "focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.3)]",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
