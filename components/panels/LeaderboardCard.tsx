import Link from "next/link";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_LEADERBOARD } from "@/lib/config";
import { formatSol } from "@/lib/game-logic";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/types";

function rankClasses(rank: number): string {
  if (rank === 1) return "bg-amber-400/20 text-amber-300 border-amber-400/30";
  if (rank === 2) return "bg-zinc-300/15 text-zinc-200 border-zinc-300/25";
  if (rank === 3) return "bg-orange-500/15 text-orange-300 border-orange-500/30";
  return "bg-white/[0.04] text-zinc-400 border-white/10";
}

export function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const initial = entry.name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.03]">
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
          rankClasses(entry.rank),
        )}
      >
        {entry.rank}
      </span>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-violet to-neon-teal text-xs font-bold text-white">
        {initial}
      </span>
      <span className="flex-1 truncate text-sm font-medium text-zinc-200">
        {entry.name}
      </span>
      <span className="font-mono text-sm font-semibold text-zinc-300">
        {formatSol(entry.winnings, 2)} SOL
      </span>
    </div>
  );
}

export function LeaderboardCard() {
  const top = DEMO_LEADERBOARD.slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-300" />
          Demo Leaderboard
        </CardTitle>
        <Link
          href="/leaderboard"
          className="text-[11px] text-neon-cyan transition-colors hover:text-neon-teal"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-0.5 pt-2">
        {top.map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} />
        ))}
        <p className="px-2 pt-2 text-[11px] text-zinc-600">
          Sample data — not real players or on-chain balances.
        </p>
      </CardContent>
    </Card>
  );
}
