"use client";

import { Plus, RotateCcw, Wallet } from "lucide-react";
import { useGame } from "@/components/game/GameProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SolMark } from "@/components/site/SolMark";
import { formatSol } from "@/lib/game-logic";

export function DemoWalletCard() {
  const { demoBalance, hydrated, addDemoSol, resetBalance } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-neon-purple" />
          Demo Wallet
        </CardTitle>
        <span className="rounded-md border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
          Not real
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-neon-purple/[0.10] to-neon-teal/[0.06] p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Demo balance
          </p>
          <p
            data-testid="demo-balance"
            className="mt-1 flex items-baseline gap-2 font-mono text-3xl font-bold text-white"
          >
            <SolMark className="h-6 w-6 self-center" />
            {hydrated ? formatSol(demoBalance) : "—"}
            <span className="text-base font-semibold text-zinc-400">SOL</span>
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Simulated balance — no real value.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="ghost" size="sm" onClick={addDemoSol}>
            <Plus className="h-4 w-4" /> Add Demo SOL
          </Button>
          <Button variant="subtle" size="sm" onClick={resetBalance}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
