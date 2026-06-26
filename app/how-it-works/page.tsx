import Link from "next/link";
import { Coins, Dices, Repeat, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/site/DemoBadge";
import { GAME_CONFIG } from "@/lib/config";
import { formatSol } from "@/lib/game-logic";

const { entryFee, grossReward, platformFee } = GAME_CONFIG.economy;
const ev = 0.5 * grossReward - entryFee;

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Dices;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neon-teal/25 bg-neon-teal/[0.07] text-neon-teal">
            <Icon className="h-5 w-5" />
          </span>
          <h2 className="font-display text-lg font-semibold text-white">
            {title}
          </h2>
        </div>
        <div className="space-y-2 text-sm leading-relaxed text-zinc-400">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <DemoBadge />
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          How GameQube works
        </h1>
        <p className="mt-2 text-zinc-400">
          A dice battle against the CPU. Higher roll wins. Everything here is a
          simulation — this is not real-money gameplay.
        </p>
      </div>

      <div className="space-y-4">
        <Section icon={Dices} title="The basics">
          <p>
            Each round, you and the CPU each roll one die valued 1–6. If your
            roll is higher you win the round; if it is lower the CPU wins.
          </p>
          <p>
            Dice values are generated locally in your browser with JavaScript&apos;s
            standard random number generator. They are not produced on-chain and
            are not cryptographically verifiable.
          </p>
        </Section>

        <Section icon={Repeat} title="Ties reroll → a true 50/50">
          <p>
            If both dice show the same value, the round is a draw and is rerolled
            at no extra entry cost. Because every tie is replayed until someone
            wins, you and the CPU each win exactly half the time.
          </p>
          <p>
            There is no difficulty setting that tilts the odds. The CPU is not
            “smart” or “hard” — it simply rolls a die, just like you.
          </p>
        </Section>

        <Section icon={Coins} title="The demo economy">
          <p>
            All amounts below are demo values. No real SOL is ever charged,
            rewarded, deposited, or withdrawn.
          </p>
          <div className="grid grid-cols-2 gap-2.5 pt-1 sm:grid-cols-4">
            <EconCell label="Entry" value={`${formatSol(entryFee)} SOL`} />
            <EconCell label="Win reward" value={`${formatSol(grossReward)} SOL`} />
            <EconCell label="Platform fee" value={`${formatSol(platformFee)} SOL`} />
            <EconCell
              label="Avg / round"
              value={`${formatSol(ev)} SOL`}
              tone="loss"
            />
          </div>
          <p className="pt-1">
            The entry fee is charged once when a round begins. Win and you
            receive the {formatSol(grossReward)} SOL reward (a net of{" "}
            {formatSol(grossReward - entryFee)} SOL); lose and you forfeit the{" "}
            {formatSol(entryFee)} SOL entry. At 50/50 odds the expected value per
            round is:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-zinc-300">
{`EV = 0.5 × ${formatSol(grossReward)} − ${formatSol(entryFee)} = ${formatSol(ev)} SOL`}
          </pre>
          <p>
            In other words, over many rounds a player gradually loses the{" "}
            {formatSol(platformFee)} SOL platform fee on average. We don&apos;t show
            inflated “winnings” — the math is exactly what you see.
          </p>
        </Section>

        <Section icon={ShieldAlert} title="Demo mode — what's simulated">
          <p>
            The wallet balance, rewards, statistics, and leaderboard are all
            local and simulated. There is no wallet connection, no smart
            contract, no Solana RPC call, and no audit. The “Connect Wallet”
            button is a placeholder.
          </p>
          <p>
            Your stats and history are stored in your browser&apos;s localStorage,
            so they persist between visits on the same device and can be reset at
            any time.
          </p>
        </Section>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/">
          <Button size="md">Back to the game</Button>
        </Link>
      </div>
    </div>
  );
}

function EconCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "loss";
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-center">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</p>
      <p
        className={`mt-0.5 font-mono text-sm font-semibold ${
          tone === "loss" ? "text-rose-400" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
