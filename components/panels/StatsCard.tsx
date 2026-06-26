"use client";

import { TrendingUp } from "lucide-react";
import { useGame } from "@/components/game/GameProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatSolSigned } from "@/lib/game-logic";
import { cn } from "@/lib/utils";

function Stat({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-mono text-lg font-semibold text-zinc-100",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function StatsCard() {
  const { stats, winRate, hydrated, resetStats } = useGame();

  const show = (n: number) => (hydrated ? String(n) : "—");
  const pl = stats.netProfit;

  return (
    <Card data-testid="stats-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-neon-teal" />
          Your Stats
        </CardTitle>
        <button
          onClick={resetStats}
          className="text-[11px] text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
        >
          Reset
        </button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2.5">
        <Stat label="Total games" value={show(stats.totalGames)} />
        <Stat
          label="Win rate"
          value={hydrated ? `${winRate.toFixed(0)}%` : "—"}
        />
        <Stat
          label="Wins"
          value={show(stats.wins)}
          valueClassName="text-neon-green"
        />
        <Stat
          label="Losses"
          value={show(stats.losses)}
          valueClassName="text-rose-400"
        />
        <Stat label="Draws" value={show(stats.draws)} />
        <Stat label="Current streak" value={show(stats.currentStreak)} />
        <Stat label="Best streak" value={show(stats.bestStreak)} />
        <Stat
          label="Demo P/L"
          value={hydrated ? `${formatSolSigned(pl)}` : "—"}
          valueClassName={
            pl > 0
              ? "text-neon-green"
              : pl < 0
                ? "text-rose-400"
                : "text-zinc-100"
          }
        />
      </CardContent>
    </Card>
  );
}
