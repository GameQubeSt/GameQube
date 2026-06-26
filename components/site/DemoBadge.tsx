import { cn } from "@/lib/utils";

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-amber-300" />
      Demo Mode
    </span>
  );
}
