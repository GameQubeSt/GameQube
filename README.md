# GameQube 🎲

A polished, Solana-themed **dice battle** game. You roll against the CPU — higher roll wins, ties are rerolled.

> ⚠️ **Demo / simulation only.** GameQube does **not** use real SOL. There are no wallet transactions, deposits, withdrawals, smart contracts, or on-chain randomness. The wallet balance, rewards, stats, and leaderboard are all simulated and stored in your browser. The randomness is JavaScript's standard RNG — it is **not** provably fair, audited, or on-chain. This is a UI/MVP demonstration, not a real-money game.

---

## ✨ Features

- **Dice battle** vs CPU with a 3D CSS dice tumble animation (Framer Motion)
- **True 50/50 odds** — ties reroll for free, so neither side has an edge
- **Local persistence** — stats and game history saved to `localStorage` (hydration-safe)
- **Demo wallet** — add or reset a simulated balance
- **Pages**: Play, How It Works, Leaderboard, About
- **Honest economy** — entry `0.0105`, win reward `0.0200`, platform fee `0.0005` shown transparently (no faked profitability)
- Accessible controls, keyboard focus states, and reduced-motion support
- `data-testid` hooks on key controls for future Playwright tests

## 🧱 Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix Dialog](https://www.radix-ui.com/) + shadcn-style UI primitives
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Lucide](https://lucide.dev/) icons

No backend, no database, no Solana RPC.

## 🚀 Getting started

Requires **Node.js 18.18+** (or 20+).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# http://localhost:3000
```

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint (optional)
```

## 🗂️ Project structure

```
gameqube/
├─ app/
│  ├─ globals.css            # base theme, grid background, scrollbar
│  ├─ layout.tsx             # fonts, GameProvider, navbar, footer
│  ├─ page.tsx               # Play (game + sidebar + recent results)
│  ├─ how-it-works/page.tsx
│  ├─ leaderboard/page.tsx
│  └─ about/page.tsx
├─ components/
│  ├─ ui/                    # button, card, dialog (shadcn-style)
│  ├─ site/                  # Navbar, Footer, Logo, SolMark, DemoBadge
│  ├─ game/                  # DiceCube, GamePanel, FeatureCards, RecentResults, GameProvider
│  ├─ panels/                # DemoWalletCard, StatsCard, LeaderboardCard
│  └─ modals/                # WalletModal, RulesModal
├─ hooks/
│  └─ useGameState.ts        # all game state + roll lifecycle
└─ lib/
   ├─ config.ts              # 🎯 single source of truth for the economy
   ├─ game-logic.ts          # pure logic (rollDie, decideOutcome, payouts)
   ├─ storage.ts             # SSR-safe localStorage helpers
   ├─ types.ts               # shared TypeScript types
   └─ utils.ts               # cn() class merge
```

## ⚙️ Configuration

All tunable values live in **`lib/config.ts`** — entry fee, gross reward, platform fee, starting demo balance, cooldown, and animation timing. Game logic is kept entirely separate from the UI in `lib/game-logic.ts`.

## 🧪 Test hooks

The following `data-testid` attributes are wired up for future end-to-end tests:

`roll-button`, `player-dice`, `cpu-dice`, `game-status`, `demo-balance`, `recent-results`, `stats-card`, `connect-wallet-button`.

## 📝 A note on the design

This build follows the written brief's **demo-only** requirements. Where a real-money/“on-chain / provably fair / audited / deposit-withdraw” framing would have been misleading for a simulation, that copy was replaced with honest demo equivalents (e.g. *Demo balance*, *Demo rewards*, *Fair roll logic / 50-50 odds*, *Demo Mode*). The neon cyber aesthetic, layout, and 3D dice from the visual reference are preserved.

## 📄 License

Provided as-is for demonstration purposes.
