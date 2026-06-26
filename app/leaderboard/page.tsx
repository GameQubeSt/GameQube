import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardRow } from "@/components/panels/LeaderboardCard";
import { DemoBadge } from "@/components/site/DemoBadge";
import { DEMO_LEADERBOARD } from "@/lib/config";

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <DemoBadge />
        <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <Trophy className="h-8 w-8 text-amber-300" />
          Demo Leaderboard
        </h1>
        <p className="mt-2 text-zinc-400">
          A static, illustrative ranking. These are not real players, and the
          totals are not on-chain balances.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-1 py-4">
          {DEMO_LEADERBOARD.map((entry) => (
            <LeaderboardRow key={entry.rank} entry={entry} />
          ))}
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-zinc-600">
        Sample data for demonstration only.
      </p>
    </div>
  );
}
