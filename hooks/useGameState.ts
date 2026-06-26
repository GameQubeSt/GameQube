"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "@/lib/config";
import {
  decideOutcome,
  rollDie,
  round6,
  roundDelta,
} from "@/lib/game-logic";
import { STORAGE_KEYS, loadJSON, saveJSON } from "@/lib/storage";
import type {
  DiceValue,
  GameResult,
  GameStatus,
  PlayerStats,
} from "@/lib/types";

const DEFAULT_STATS: PlayerStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  currentStreak: 0,
  bestStreak: 0,
  netProfit: 0,
};

const MAX_HISTORY = 50;

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useGameState() {
  // Initialised to deterministic defaults so server and first client render
  // match; real values are loaded from localStorage after mount.
  const [hydrated, setHydrated] = useState(false);
  const [demoBalance, setDemoBalance] = useState<number>(
    GAME_CONFIG.startingDemoBalance,
  );
  const [stats, setStats] = useState<PlayerStats>(DEFAULT_STATS);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [playerRoll, setPlayerRoll] = useState<DiceValue>(1);
  const [cpuRoll, setCpuRoll] = useState<DiceValue>(1);
  const [cooldown, setCooldown] = useState(false);

  // True while the current round is waiting on a free reroll after a draw.
  const rerollRef = useRef(false);
  const timers = useRef<number[]>([]);

  // ---- hydrate from localStorage (client only) ----
  useEffect(() => {
    setDemoBalance(loadJSON(STORAGE_KEYS.balance, GAME_CONFIG.startingDemoBalance));
    setStats(loadJSON(STORAGE_KEYS.stats, DEFAULT_STATS));
    setHistory(loadJSON(STORAGE_KEYS.history, []));
    setHydrated(true);

    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // ---- persist on change (after hydration) ----
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.balance, demoBalance);
  }, [demoBalance, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.stats, stats);
  }, [stats, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.history, history);
  }, [history, hydrated]);

  const canAfford = demoBalance >= GAME_CONFIG.economy.entryFee;
  const isRolling = status === "rolling";

  const resolveRound = useCallback((p: DiceValue, c: DiceValue) => {
    const outcome = decideOutcome(p, c);

    if (outcome === "draw") {
      rerollRef.current = true;
      setStats((s) => ({ ...s, draws: s.draws + 1 }));
      setStatus("draw");
      return;
    }

    // Resolved round.
    rerollRef.current = false;
    const delta = roundDelta(outcome);

    if (outcome === "win") {
      setDemoBalance((b) => round6(b + GAME_CONFIG.economy.grossReward));
    }

    setStats((s) => {
      const wins = s.wins + (outcome === "win" ? 1 : 0);
      const losses = s.losses + (outcome === "loss" ? 1 : 0);
      const currentStreak = outcome === "win" ? s.currentStreak + 1 : 0;
      return {
        ...s,
        totalGames: s.totalGames + 1,
        wins,
        losses,
        currentStreak,
        bestStreak: Math.max(s.bestStreak, currentStreak),
        netProfit: round6(s.netProfit + delta),
      };
    });

    setHistory((h) =>
      [
        {
          id: makeId(),
          outcome,
          playerRoll: p,
          cpuRoll: c,
          delta,
          timestamp: Date.now(),
        },
        ...h,
      ].slice(0, MAX_HISTORY),
    );

    setStatus(outcome);
  }, []);

  const roll = useCallback(() => {
    if (isRolling || cooldown) return;

    const isReroll = rerollRef.current;
    if (!isReroll) {
      if (!canAfford) return;
      setDemoBalance((b) => round6(b - GAME_CONFIG.economy.entryFee));
    }

    const p = rollDie();
    const c = rollDie();
    setPlayerRoll(p);
    setCpuRoll(c);
    setStatus("rolling");

    const revealTimer = window.setTimeout(() => {
      resolveRound(p, c);
      // Apply the spam-guard cooldown only when a round actually resolves;
      // a draw should let the player reroll immediately.
      if (decideOutcome(p, c) !== "draw") {
        setCooldown(true);
        const cooldownTimer = window.setTimeout(
          () => setCooldown(false),
          GAME_CONFIG.rollCooldownMs,
        );
        timers.current.push(cooldownTimer);
      }
    }, GAME_CONFIG.rollAnimationMs);

    timers.current.push(revealTimer);
  }, [isRolling, cooldown, canAfford, resolveRound]);

  const addDemoSol = useCallback(() => {
    setDemoBalance((b) => round6(b + GAME_CONFIG.addDemoSolAmount));
  }, []);

  const resetBalance = useCallback(() => {
    setDemoBalance(GAME_CONFIG.startingDemoBalance);
  }, []);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    setHistory([]);
    setStatus("idle");
    rerollRef.current = false;
  }, []);

  const decided = stats.wins + stats.losses;
  const winRate = decided > 0 ? (stats.wins / decided) * 100 : 0;

  return {
    hydrated,
    demoBalance,
    stats,
    history,
    status,
    playerRoll,
    cpuRoll,
    cooldown,
    canAfford,
    winRate,
    isReroll: rerollRef.current,
    roll,
    addDemoSol,
    resetBalance,
    resetStats,
  };
}

export type GameState = ReturnType<typeof useGameState>;
