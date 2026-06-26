import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GameProvider } from "@/components/game/GameProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "GameQube — Demo Dice Battle",
  description:
    "GameQube is a Solana-themed dice battle game. Demo / simulation only — no real SOL, no wallet transactions.",
};

export const viewport: Viewport = {
  themeColor: "#07070d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-backdrop" />
        <GameProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
