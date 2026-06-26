import type { LeaderboardEntry } from "./types";

/**
 * Single source of truth for GameQube's configuration.
 *
 * IMPORTANT: Every monetary value here is a DEMO value. GameQube is a
 * simulation MVP. No real SOL is transferred, deposited, withdrawn, or staked.
 */
export const GAME_CONFIG = {
  appName: "GameQube",
  tagline: "Roll higher than the CPU to win.",
  currency: "SOL",
  demoMode: true as const,

  economy: {
    /** Demo entry cost per round. */
    entryFee: 0.0105,
    /** Gross demo prize paid to the winner of a round. */
    grossReward: 0.02,
    /**
     * Shown separately for transparency. Over many rounds at true 50/50 odds,
     * the demo "house edge" per round equals this amount:
     *   EV = 0.5 * grossReward - entryFee = 0.5 * 0.02 - 0.0105 = -0.0005
     */
    platformFee: 0.0005,
  },

  /** Starting demo balance (enough for a handful of rounds). */
  startingDemoBalance: 0.05,
  /** Amount added by the "Add Demo SOL" button. */
  addDemoSolAmount: 0.05,

  /** Cooldown after a resolved round so the Roll button can't be spammed. */
  rollCooldownMs: 1200,
  /** Roughly how long the dice animation runs before the result is revealed. */
  rollAnimationMs: 1100,

  diceMin: 1,
  diceMax: 6,
} as const;

/** Static, clearly-labelled sample leaderboard. Not real on-chain data. */
export const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "SolKing", winnings: 12.45 },
  { rank: 2, name: "DegenDan", winnings: 8.32 },
  { rank: 3, name: "CryptoQueen", winnings: 6.9 },
  { rank: 4, name: "CubeMaster", winnings: 5.21 },
  { rank: 5, name: "Roll4Win", winnings: 4.05 },
  { rank: 6, name: "NeonNomad", winnings: 3.18 },
  { rank: 7, name: "PixelPirate", winnings: 2.74 },
  { rank: 8, name: "QubeQueen", winnings: 2.1 },
];
