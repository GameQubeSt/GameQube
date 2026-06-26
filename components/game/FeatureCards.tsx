import { Coins, Gift, Scale, Zap } from "lucide-react";
import { GAME_CONFIG } from "@/lib/config";
import { formatSol } from "@/lib/game-logic";

const FEATURES = [
  {
    icon: Zap,
    title: "Fast rounds",
    sub: "~1s dice reveal",
    tint: "text-neon-cyan",
    ring: "border-neon-cyan/25 bg-neon-cyan/[0.06]",
  },
  {
    icon: Gift,
    title: "Demo rewards",
    sub: "Simulated SOL only",
    tint: "text-neon-green",
    ring: "border-neon-green/25 bg-neon-green/[0.06]",
  },
  {
    icon: Scale,
    title: "Fair roll logic",
    sub: "True 50/50 odds",
    tint: "text-neon-teal",
    ring: "border-neon-teal/25 bg-neon-teal/[0.06]",
  },
  {
    icon: Coins,
    title: "Low entry",
    sub: `Only ${formatSol(GAME_CONFIG.economy.entryFee)} SOL (demo)`,
    tint: "text-neon-purple",
    ring: "border-neon-purple/25 bg-neon-purple/[0.06]",
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.title}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-xl"
          >
            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${f.ring} ${f.tint}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-100">
                {f.title}
              </p>
              <p className="truncate text-xs text-zinc-500">{f.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
