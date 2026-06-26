import { GAME_CONFIG } from "./config";
import type { DiceValue, ResolvedOutcome, RoundOutcome } from "./types";

/** Round a number to 6 decimal places to avoid float drift on SOL amounts. */
export function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

/** Uniform random die in [diceMin, diceMax]. */
export function rollDie(): DiceValue {
  const { diceMin, diceMax } = GAME_CONFIG;
  const range = diceMax - diceMin + 1;
  return (Math.floor(Math.random() * range) + diceMin) as DiceValue;
}

/**
 * Compare two rolls.
 * Higher player roll wins; equal values are a draw (which the game rerolls).
 */
export function decideOutcome(player: DiceValue, cpu: DiceValue): RoundOutcome {
  if (player > cpu) return "win";
  if (player < cpu) return "loss";
  return "draw";
}

/**
 * Net change to the demo balance for a *resolved* round.
 *
 * The entry fee is charged once when a round begins; a draw rerolls without an
 * additional charge. So the net result of a round is:
 *   win  -> grossReward - entryFee   (e.g. +0.0095)
 *   loss -> -entryFee                (e.g. -0.0105)
 *
 * Because ties are rerolled, the player and CPU each win exactly 50% of the
 * time, so the expected value per round is -platformFee. These numbers are not
 * inflated or faked — the demo player loses the platform fee on average.
 */
export function roundDelta(outcome: ResolvedOutcome): number {
  const { entryFee, grossReward } = GAME_CONFIG.economy;
  return outcome === "win" ? round6(grossReward - entryFee) : round6(-entryFee);
}

/** Format a SOL amount with a fixed number of decimals and an explicit sign for negatives. */
export function formatSol(n: number, digits = 4): string {
  const fixed = Math.abs(n).toFixed(digits);
  return `${n < 0 ? "-" : ""}${fixed}`;
}

/** Format a SOL amount with a leading + or - (used for P/L style displays). */
export function formatSolSigned(n: number, digits = 4): string {
  const fixed = Math.abs(n).toFixed(digits);
  if (n > 0) return `+${fixed}`;
  if (n < 0) return `-${fixed}`;
  return fixed;
}

/** "2m ago" style relative time. */
export function timeAgo(timestamp: number, now: number = Date.now()): string {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
