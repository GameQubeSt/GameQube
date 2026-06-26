"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronRight, Info, User } from "lucide-react";
import { useGame } from "@/components/game/GameProvider";
import { DiceCube } from "@/components/game/DiceCube";
import { RulesModal } from "@/components/modals/RulesModal";
import { DemoBadge } from "@/components/site/DemoBadge";
import { SolMark } from "@/components/site/SolMark";
import { Button } from "@/components/ui/button";
import { GAME_CONFIG } from "@/lib/config";
import { formatSol } from "@/lib/game-logic";
import { cn } from "@/lib/utils";
import type { GameStatus } from "@/lib/types";

function statusText(status: GameStatus, canAfford: boolean): string {
  if (!canAfford && (status === "idle" || status === "win" || status === "loss")) {
    return "Add demo SOL to keep playing";
  }
  switch (status) {
    case "rolling":
      return "Rolling…";
    case "win":
      return "You won";
    case "loss":
      return "CPU won";
    case "draw":
      return "Draw — roll again";
    default:
      return "Ready to roll";
  }
}

function statusTone(status: GameStatus): string {
  switch (status) {
    case "win":
      return "text-neon-green";
    case "loss":
      return "text-rose-400";
    case "draw":
      return "text-amber-300";
    case "rolling":
      return "text-neon-cyan";
    default:
      return "text-zinc-400";
  }
}

export function GamePanel() {
  const {
    status,
    playerRoll,
    cpuRoll,
    roll,
    cooldown,
    canAfford,
    isReroll,
  } = useGame();

  const rolling = status === "rolling";
  const rollDisabled = rolling || cooldown || (!canAfford && !isReroll);
  const rollLabel = rolling ? "Rolling…" : isReroll ? "Roll Again" : "Roll";

  const { grossReward, entryFee, platformFee } = GAME_CONFIG.economy;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-glass backdrop-blur-xl sm:p-7">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-radial-glow" />

      {/* combatants */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green">
            <User className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-neon-green" />
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-neon-green">
            YOU
          </span>
        </div>

        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-sm font-bold text-zinc-200 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]">
          VS
        </span>

        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-bold tracking-wide text-neon-purple">
            CPU
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple">
            <Bot className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* arena */}
      <div className="relative mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex justify-center">
          <DiceCube
            value={playerRoll}
            rolling={rolling}
            theme="player"
            testId="player-dice"
          />
        </div>

        {/* center column */}
        <div className="flex w-full max-w-[230px] flex-col items-center gap-3 justify-self-center">
          <div className="w-full rounded-2xl border border-neon-green/20 bg-neon-green/[0.05] px-4 py-3 text-center">
            <p className="text-[11px] font-medium uppercase tracking-wider text-neon-green/80">
              Win Reward
            </p>
            <p className="mt-0.5 flex items-center justify-center gap-1.5 font-mono text-2xl font-bold text-white">
              <SolMark className="h-5 w-5" />
              {formatSol(grossReward)}
              <span className="text-sm font-semibold text-zinc-400">SOL</span>
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300">
            <span>Entry</span>
            <span className="font-mono font-semibold text-zinc-100">
              {formatSol(entryFee)} SOL
            </span>
          </div>

          <Button
            data-testid="roll-button"
            size="lg"
            className="w-full text-lg font-bold tracking-wide"
            onClick={roll}
            disabled={rollDisabled}
            aria-disabled={rollDisabled}
          >
            {rollLabel}
          </Button>

          <p
            data-testid="game-status"
            aria-live="polite"
            className={cn(
              "h-5 text-sm font-semibold transition-colors",
              statusTone(status),
            )}
          >
            {statusText(status, canAfford)}
          </p>

          <div className="flex items-center gap-2">
            <DemoBadge />
            <RulesModal>
              <button className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan">
                <Info className="h-3 w-3" /> Rules
              </button>
            </RulesModal>
          </div>
        </div>

        <div className="flex justify-center">
          <DiceCube
            value={cpuRoll}
            rolling={rolling}
            theme="cpu"
            testId="cpu-dice"
          />
        </div>
      </div>

      {/* explainer strip */}
      <div className="relative mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-teal/25 bg-neon-teal/[0.07] text-neon-teal">
            <SolMark className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">
              {GAME_CONFIG.tagline}
            </p>
            <p className="mt-0.5 max-w-md text-xs leading-relaxed text-zinc-500">
              Each die is generated locally from 1–6. Ties are rerolled, so the
              odds are an even 50/50. Estimated demo platform fee:{" "}
              {formatSol(platformFee)} SOL per round.
            </p>
          </div>
        </div>
        <RulesModal>
          <Button variant="ghost" size="sm" className="shrink-0">
            How It Works <ChevronRight className="h-4 w-4" />
          </Button>
        </RulesModal>
      </div>

      {/* result flash */}
      <AnimatePresence>
        {(status === "win" || status === "loss") && (
          <motion.div
            key={status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "pointer-events-none absolute inset-0 rounded-3xl",
              status === "win"
                ? "ring-1 ring-neon-green/40"
                : "ring-1 ring-rose-500/30",
            )}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
