import { cn } from "@/lib/utils";

/**
 * Abstract neon "token" mark used next to demo SOL amounts.
 * Intentionally original (not the Solana brand logo) to avoid using
 * trademarked assets.
 */
export function SolMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      role="img"
      aria-label="Demo token"
    >
      <defs>
        <linearGradient id="sol-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="url(#sol-mark)"
        strokeWidth="2"
      />
      <rect x="6.5" y="8" width="11" height="2.4" rx="1.2" fill="url(#sol-mark)" />
      <rect x="6.5" y="13.6" width="11" height="2.4" rx="1.2" fill="url(#sol-mark)" />
    </svg>
  );
}
