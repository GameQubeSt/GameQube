"use client";

import { type ReactNode } from "react";
import { Wallet } from "lucide-react";
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

/**
 * Visual-only wallet modal. GameQube never connects a real wallet or moves SOL.
 */
export function WalletModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neon-purple/30 bg-neon-purple/10 text-neon-purple">
            <Wallet className="h-5 w-5" />
          </div>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Wallet connection is coming soon. GameQube is currently running in
            Demo Mode.
          </DialogDescription>
        </DialogHeader>

        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-zinc-400">
          No wallet is connected and no real SOL is ever used. The balance,
          rewards, and leaderboard shown in the app are all simulated.
        </p>

        <div className="mt-5 flex justify-end">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Got it
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
