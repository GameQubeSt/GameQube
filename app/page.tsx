import { FeatureCards } from "@/components/game/FeatureCards";
import { GamePanel } from "@/components/game/GamePanel";
import { RecentResults } from "@/components/game/RecentResults";
import { DemoWalletCard } from "@/components/panels/DemoWalletCard";
import { StatsCard } from "@/components/panels/StatsCard";
import { LeaderboardCard } from "@/components/panels/LeaderboardCard";

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <FeatureCards />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <GamePanel />
          <RecentResults />
        </div>

        <aside className="space-y-5">
          <DemoWalletCard />
          <StatsCard />
          <LeaderboardCard />
        </aside>
      </div>
    </div>
  );
}
