// All domain types for GameQube. Demo / simulation only — no real SOL.

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

/** Outcome of a single dice comparison. */
export type RoundOutcome = "win" | "loss" | "draw";

/** A round only *resolves* to win or loss; draws are rerolled. */
export type ResolvedOutcome = "win" | "loss";

/** UI status of the game panel. */
export type GameStatus = "idle" | "rolling" | "win" | "loss" | "draw";

/** A single resolved round, stored in local history. */
export interface GameResult {
  id: string;
  outcome: ResolvedOutcome;
  playerRoll: DiceValue;
  cpuRoll: DiceValue;
  /** Net change to the demo balance for this round (e.g. +0.0095 or -0.0105). */
  delta: number;
  timestamp: number;
}

/** Persisted player statistics. */
export interface PlayerStats {
  totalGames: number; // resolved rounds (wins + losses)
  wins: number;
  losses: number;
  draws: number; // draw rolls observed (rerolled, not counted as games)
  currentStreak: number; // current consecutive wins
  bestStreak: number;
  netProfit: number; // cumulative demo P/L
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  /** Demo winnings in SOL — sample data, not real on-chain values. */
  winnings: number;
}
