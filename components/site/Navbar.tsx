"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";
import { useGame } from "@/components/game/GameProvider";
import { WalletModal } from "@/components/modals/WalletModal";
import { Logo } from "@/components/site/Logo";
import { DemoBadge } from "@/components/site/DemoBadge";
import { Button } from "@/components/ui/button";
import { SolMark } from "@/components/site/SolMark";
import { formatSol } from "@/lib/game-logic";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Play" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" },
];

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-1 py-1 text-sm font-medium transition-colors",
              active ? "text-white" : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            {item.label}
            {active && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-neon-purple to-neon-teal" />
            )}
          </Link>
        );
      })}
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { demoBalance, hydrated } = useGame();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Game<span className="text-neon-purple">Qube</span>
            </span>
          </Link>
          <DemoBadge className="hidden sm:inline-flex" />
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLinks pathname={pathname} />
        </nav>

        <div className="flex items-center gap-2.5">
          <div
            data-testid="nav-demo-balance"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex"
          >
            <SolMark className="h-4 w-4" />
            <span className="font-mono text-sm font-semibold text-zinc-100">
              {hydrated ? formatSol(demoBalance) : "—"}
            </span>
            <span className="text-xs text-zinc-500">demo</span>
          </div>

          <WalletModal>
            <Button data-testid="connect-wallet-button" size="sm" className="px-4">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Wallet</span>
            </Button>
          </WalletModal>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-white/[0.05] px-4 py-2.5 md:hidden">
        <NavLinks pathname={pathname} />
      </nav>
    </header>
  );
}
