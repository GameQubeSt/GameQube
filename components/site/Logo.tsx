import { cn } from "@/lib/utils";

/** Original isometric cube mark with three dice pips. Pure SVG, no external assets. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="GameQube logo"
    >
      <defs>
        <linearGradient id="gq-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="gq-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="gq-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      {/* top face */}
      <path d="M24 4 L42 14 L24 24 L6 14 Z" fill="url(#gq-top)" />
      {/* left face */}
      <path d="M6 14 L24 24 L24 44 L6 34 Z" fill="url(#gq-left)" />
      {/* right face */}
      <path d="M42 14 L24 24 L24 44 L42 34 Z" fill="url(#gq-right)" />

      {/* pips */}
      <circle cx="24" cy="13" r="2" fill="#0a0a12" opacity="0.85" />
      <circle cx="14" cy="26" r="1.7" fill="#e9d5ff" opacity="0.9" />
      <circle cx="18" cy="34" r="1.7" fill="#e9d5ff" opacity="0.9" />
      <circle cx="33" cy="27" r="1.7" fill="#d1fae5" opacity="0.9" />
      <circle cx="33" cy="35" r="1.7" fill="#d1fae5" opacity="0.9" />
    </svg>
  );
}
