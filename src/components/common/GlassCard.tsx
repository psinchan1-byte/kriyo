import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "highlighted" | "interactive" | "subtle";
  glow?: "none" | "terracotta" | "gold" | "emerald";
  className?: string;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = "default",
  glow = "none",
  className = "",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-obsidian-850/70 backdrop-blur-xl border border-white/[0.08] shadow-glass",
    elevated: "bg-obsidian-800/85 backdrop-blur-2xl border border-white/[0.12] shadow-glass-elevated",
    highlighted: "bg-gradient-to-b from-heritage-terracotta/[0.08] to-obsidian-850/80 backdrop-blur-xl border border-heritage-terracotta/30 shadow-glass",
    interactive: "bg-obsidian-850/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.18] hover:bg-obsidian-800/80 hover:-translate-y-0.5 hover:shadow-glass-elevated transition-all duration-300 cursor-pointer",
    subtle: "bg-obsidian-900/40 backdrop-blur-md border border-white/[0.05]",
  };

  const glowStyles = {
    none: "",
    terracotta: "shadow-glow-terracotta",
    gold: "shadow-glow-gold",
    emerald: "shadow-glow-emerald",
  };

  return (
    <div
      className={cn(
        "rounded-xl relative overflow-hidden transition-colors",
        variantStyles[variant],
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
