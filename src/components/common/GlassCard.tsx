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
    default: "bg-[#FFFDF8]/78 backdrop-blur-xl border border-[#B96D43]/14 shadow-glass",
    elevated: "bg-[#FFFDF8]/90 backdrop-blur-2xl border border-white border-b-[#B96D43]/20 shadow-glass-elevated",
    highlighted: "bg-gradient-to-b from-[#B96D43]/10 to-[#FFFDF8]/85 backdrop-blur-xl border border-[#B96D43]/28 shadow-glass",
    interactive: "glass-card-interactive cursor-pointer",
    subtle: "bg-[#EFE6D7]/50 backdrop-blur-md border border-[#B96D43]/10 shadow-sm",
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
        "rounded-2xl relative overflow-hidden transition-all duration-300",
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
