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
          bg: "#E8D7C0",
          secondary: "#E1CDB2",
          card: "rgba(255, 250, 241, 0.72)",
          "card-solid": "#FFF9F0",
          terracotta: "#B96A3D",
          "terracotta-light": "#D69A70",
          pale: "#C7A17A",
          gold: "#B58A50",
          green: "#28765D",
          "green-light": "#DCEDE3",
          red: "#B34F4F",
          border: "rgba(121, 88, 60, 0.16)",
          "glass-border": "rgba(255, 255, 255, 0.72)",
        },
        earth: {
          dark: "#33251D",
          slate: "#705D4E",
          muted: "#9A8877",
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
