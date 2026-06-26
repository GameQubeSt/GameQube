"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GAME_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { DiceValue } from "@/lib/types";

type Theme = "player" | "cpu";

// Which of the 9 grid cells are filled for each pip count.
const PIP_LAYOUT: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

// Cube faces: where each face sits, and the number painted on it.
// Opposite faces sum to 7 (1/6, 2/5, 3/4), like a real die.
const FACES: { number: number; rotate: string }[] = [
  { number: 1, rotate: "" },
  { number: 6, rotate: "rotateY(180deg)" },
  { number: 2, rotate: "rotateY(90deg)" },
  { number: 5, rotate: "rotateY(-90deg)" },
  { number: 3, rotate: "rotateX(90deg)" },
  { number: 4, rotate: "rotateX(-90deg)" },
];

// Cube rotation that brings a given value's face to the front.
const FINAL: Record<DiceValue, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: -90, y: 0 },
  4: { x: 90, y: 0 },
  5: { x: 0, y: 90 },
  6: { x: 0, y: 180 },
};

const THEME: Record<
  Theme,
  { face: string; pip: string; edge: string; glow: string }
> = {
  player: {
    face: "from-emerald-300/[0.14] to-teal-600/[0.10]",
    pip: "bg-neon-green shadow-[0_0_8px_2px_rgba(52,211,153,0.75)]",
    edge: "border-emerald-300/25",
    glow: "shadow-glow-green",
  },
  cpu: {
    face: "from-fuchsia-400/[0.14] to-purple-700/[0.10]",
    pip: "bg-neon-purple shadow-[0_0_8px_2px_rgba(168,85,247,0.75)]",
    edge: "border-fuchsia-400/25",
    glow: "shadow-glow-purple",
  },
};

/** Smallest angle >= current + minTurns*360 that lands on `target` (mod 360). */
function nextAngle(current: number, target: number, minTurns: number): number {
  const lowerBound = current + minTurns * 360;
  const k = Math.ceil((lowerBound - target) / 360);
  return target + k * 360;
}

interface DiceCubeProps {
  value: DiceValue;
  rolling: boolean;
  theme: Theme;
  size?: number;
  testId?: string;
}

export function DiceCube({
  value,
  rolling,
  theme,
  size = 128,
  testId,
}: DiceCubeProps) {
  const reduce = useReducedMotion();
  const t = THEME[theme];
  const half = size / 2;

  const [rot, setRot] = useState(() => FINAL[value]);
  const prevRolling = useRef(false);

  useEffect(() => {
    // Trigger a tumble each time a roll begins.
    if (rolling && !prevRolling.current) {
      const base = FINAL[value];
      if (reduce) {
        setRot(base);
      } else {
        setRot((r) => ({
          x: nextAngle(r.x, base.x, 2),
          y: nextAngle(r.y, base.y, 3),
        }));
      }
    }
    prevRolling.current = rolling;
  }, [rolling, value, reduce]);

  return (
    <div
      data-testid={testId}
      className="flex items-center justify-center"
      style={{ perspective: 700 }}
      aria-label={`${theme === "player" ? "Your" : "CPU"} dice showing ${value}`}
      role="img"
    >
      <div
        className={cn(
          "relative rounded-[22%] transition-shadow",
          rolling ? t.glow : "shadow-none",
        )}
        style={{ width: size, height: size }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: rot.x, rotateY: rot.y }}
          transition={{
            duration: reduce ? 0.12 : GAME_CONFIG.rollAnimationMs / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {FACES.map((face) => (
            <div
              key={face.number}
              className={cn(
                "absolute inset-0 grid grid-cols-3 grid-rows-3 place-items-center rounded-[22%] border bg-gradient-to-br p-[14%] backdrop-blur-sm",
                t.face,
                t.edge,
              )}
              style={{
                transform: `${face.rotate} translateZ(${half}px)`,
                backfaceVisibility: "hidden",
                boxShadow:
                  "inset 0 0 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              {Array.from({ length: 9 }).map((_, cell) => {
                const filled = PIP_LAYOUT[face.number].includes(cell);
                return (
                  <span
                    key={cell}
                    className={cn(
                      "h-[18%] w-[18%] rounded-full",
                      filled ? t.pip : "opacity-0",
                    )}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
