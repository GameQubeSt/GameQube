import Link from "next/link";
import { Boxes, Code2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/site/DemoBadge";
import { Logo } from "@/components/site/Logo";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <Logo className="h-12 w-12" />
        <div>
          <DemoBadge />
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About GameQube
          </h1>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-4 text-sm leading-relaxed text-zinc-300">
          <p>
            GameQube is a Solana-themed dice battle game built as a polished
            demo. You roll against the CPU, higher roll wins, and ties are
            rerolled. It exists to show off a clean, modern game UI — not to take
            anyone&apos;s money.
          </p>
          <p className="text-zinc-400">
            Everything in the app runs in <strong className="text-zinc-200">Demo Mode</strong>.
            The balance, rewards, statistics, and leaderboard are simulated and
            stored locally in your browser. There is no wallet connection, no
            real SOL, no smart contract, and no on-chain randomness.
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <Highlight icon={Sparkles} title="Demo only">
              No real funds, deposits, or withdrawals — ever.
            </Highlight>
            <Highlight icon={Boxes} title="Local state">
              Stats &amp; history persist via localStorage.
            </Highlight>
            <Highlight icon={Code2} title="Modern stack">
              Next.js, TypeScript, Tailwind, Framer Motion.
            </Highlight>
          </div>

          <p className="pt-2 text-xs text-zinc-500">
            GameQube is an independent project and is not affiliated with or
            endorsed by Solana. If this were ever extended toward real
            transactions, it would need real wallet integration, verifiable
            randomness, audits, and compliance with the laws that apply to
            real-money play.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center gap-3">
        <Link href="/">
          <Button>Play the demo</Button>
        </Link>
        <Link href="/how-it-works">
          <Button variant="ghost">How it works</Button>
        </Link>
      </div>
    </div>
  );
}

function Highlight({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Sparkles;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neon-purple/25 bg-neon-purple/[0.07] text-neon-purple">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2 text-sm font-semibold text-white">{title}</p>
      <p className="mt-0.5 text-xs text-zinc-500">{children}</p>
    </div>
  );
}
