import { Github, MessageCircle, Send } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { DemoBadge } from "@/components/site/DemoBadge";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.06] bg-ink-900/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-7" />
          <div>
            <p className="font-display text-sm font-semibold text-white">
              GameQube
            </p>
            <p className="text-xs text-zinc-500">
              Demo Mode · Simulation only · No real SOL is used
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DemoBadge />
          <div className="flex items-center gap-2 text-zinc-500">
            <span
              className="rounded-lg border border-white/10 p-2 transition-colors hover:text-zinc-300"
              aria-hidden
            >
              <MessageCircle className="h-4 w-4" />
            </span>
            <span
              className="rounded-lg border border-white/10 p-2 transition-colors hover:text-zinc-300"
              aria-hidden
            >
              <Send className="h-4 w-4" />
            </span>
            <span
              className="rounded-lg border border-white/10 p-2 transition-colors hover:text-zinc-300"
              aria-hidden
            >
              <Github className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04] px-4 py-3 text-center text-[11px] text-zinc-600 sm:px-6">
        GameQube is an independent demo project and is not affiliated with or
        endorsed by Solana. Dice outcomes are generated locally with
        JavaScript&apos;s standard random number generator.
      </div>
    </footer>
  );
}
