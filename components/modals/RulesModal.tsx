"use client";

import { type ReactNode } from "react";
import { Dices } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function RulesModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neon-teal/30 bg-neon-teal/10 text-neon-teal">
            <Dices className="h-5 w-5" />
          </div>
          <DialogTitle>Game Rules</DialogTitle>
          <DialogDescription>
            Roll higher than the CPU to win. Ties are rerolled. Demo mode only.
            No real SOL is used.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2">
            <span className="text-neon-teal">•</span> Each round, you and the CPU
            each roll a die from 1 to 6.
          </li>
          <li className="flex gap-2">
            <span className="text-neon-teal">•</span> Higher roll wins. A tie is
            rerolled at no extra entry cost.
          </li>
          <li className="flex gap-2">
            <span className="text-neon-teal">•</span> Because ties reroll, you and
            the CPU have exactly 50/50 odds.
          </li>
          <li className="flex gap-2">
            <span className="text-neon-teal">•</span> Balance, rewards, and the
            leaderboard are all simulated — nothing is on-chain.
          </li>
        </ul>

        <div className="mt-5 flex justify-end">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
