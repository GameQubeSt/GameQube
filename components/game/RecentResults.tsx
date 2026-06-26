"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { useGame } from "@/components/game/GameProvider";
import { formatSolSigned, timeAgo } from "@/lib/game-logic";
import { cn } from "@/lib/utils";
import type { DiceValue, ResolvedOutcome } from "@/lib/types";

const PIP_LAYOUT: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function MiniDie({
  value,
  theme,
}: {
  value: DiceValue;
  theme: "player" | "cpu";
}) {
  const pip =
    theme === "player"
      ? "bg-neon-green"
      : "bg-neon-purple";
  const border = theme === "player" ? "border-neon-green/30" : "border-neon-purple/30";
  return (
    <span
      className={cn(
        "grid h-7 w-7 grid-cols-3 grid-rows-3 place-items-center rounded-md border bg-white/[0.03] p-1",
        border,
      )}
      aria-hidden
    >
      {Array.from({ length: 9 }).map((_, cell) => (
        <span
          key={cell}
          className={cn(
            "h-1 w-1 rounded-full",
            PIP_LAYOUT[value].includes(cell) ? pip : "opacity-0",
          )}
        />
      ))}
    </span>
  );
}

const OUTCOME_LABEL: Record<ResolvedOutcome, string> = {
  win: "WIN",
  loss: "LOSS",
};

export function RecentResults() {
  const { history, hydrated } = useGame();
  const recent = history.slice(0, 5);

  // Re-render periodically so relative times stay fresh.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      data-testid="recent-results"
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-zinc-400" />
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-zinc-200">
          Recent Results
        </h2>
      </div>

      {!hydrated || recent.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.01] px-4 py-8 text-center text-sm text-zinc-500">
          {hydrated
            ? "No rounds yet — hit Roll to play your first demo round."
            : "Loading recent results…"}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {recent.map((r) => {
            const win = r.outcome === "win";
            return (
              <div
                key={r.id}
                className={cn(
                  "rounded-xl border bg-white/[0.02] p-3",
                  win ? "border-neon-green/20" : "border-rose-500/20",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-xs font-bold tracking-wide",
                      win ? "text-neon-green" : "text-rose-400",
                    )}
                  >
                    {OUTCOME_LABEL[r.outcome]}
                  </span>
                  <span className="text-[10px] text-zinc-500">vs CPU</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <MiniDie value={r.playerRoll} theme="player" />
                  <span className="text-[10px] text-zinc-600">vs</span>
                  <MiniDie value={r.cpuRoll} theme="cpu" />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold",
                      win ? "text-neon-green" : "text-rose-400",
                    )}
                  >
                    {formatSolSigned(r.delta)} SOL
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {timeAgo(r.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
