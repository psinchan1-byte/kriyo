import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        heritage: {
          bg: "#F5EFE5",
          secondary: "#EEE4D4",
          card: "#FFFDF8",
          terracotta: "#B9693D",
          "terracotta-light": "#D99A72",
          pale: "#C7A27C",
          gold: "#B58A50",
          green: "#287A60",
          "green-light": "#DCEEE4",
          red: "#B95454",
        },
        earth: {
          dark: "#332820",
          slate: "#746458",
          muted: "#9A8978",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Geist",
          "Inter",
          "sans-serif",
        ],
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 30px rgba(92, 65, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)",
        "glass-elevated": "0 16px 42px rgba(92, 65, 42, 0.12), inset 0 1.5px 0 rgba(255, 255, 255, 0.9)",
        "glow-terracotta": "0 0 24px -4px rgba(185, 105, 61, 0.28)",
        "glow-gold": "0 0 24px -4px rgba(181, 138, 80, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
