import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: {
          950: "#06070a",
          900: "#090a0f",
          850: "#0d0f17",
          800: "#121520",
          750: "#171a28",
          700: "#1f2438",
        },
        heritage: {
          terracotta: "#d9653b",
          "terracotta-light": "#ea7d54",
          "terracotta-dark": "#b84f27",
          sand: "#dfd3c3",
          ivory: "#f7f4ee",
          gold: "#d4a359",
          ochre: "#e0ac69",
          earth: "#2a201b",
          indigo: "#1f2d4d",
        },
        glass: {
          surface: "rgba(18, 21, 32, 0.65)",
          panel: "rgba(15, 17, 26, 0.8)",
          elevated: "rgba(23, 26, 40, 0.85)",
          border: "rgba(255, 255, 255, 0.08)",
          "border-light": "rgba(255, 255, 255, 0.14)",
          "border-accent": "rgba(217, 101, 59, 0.28)",
          highlight: "rgba(255, 255, 255, 0.04)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.35)",
        "glass-elevated": "0 12px 40px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "glow-terracotta": "0 0 24px -4px rgba(217, 101, 59, 0.25)",
        "glow-gold": "0 0 24px -4px rgba(212, 163, 89, 0.25)",
        "glow-emerald": "0 0 24px -4px rgba(16, 185, 129, 0.25)",
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite linear",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
        "glow": "glow 4s infinite ease-in-out",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        glow: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

