import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GameQube neon palette (Solana-inspired)
        ink: {
          DEFAULT: "#07070d",
          900: "#0a0a12",
          800: "#0e0e1a",
          700: "#141426",
        },
        neon: {
          purple: "#a855f7",
          violet: "#7c3aed",
          cyan: "#22d3ee",
          teal: "#2dd4bf",
          green: "#34d399",
          lime: "#a3e635",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-purple": "0 0 24px -4px rgba(168,85,247,0.55)",
        "glow-cyan": "0 0 24px -4px rgba(34,211,238,0.5)",
        "glow-teal": "0 0 30px -6px rgba(45,212,191,0.5)",
        "glow-green": "0 0 30px -6px rgba(52,211,153,0.5)",
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 20px 40px -24px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, rgba(7,7,13,0) 70%)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
