import React from "react";
import { Sparkline } from "./Sparkline";
import { GlassCard } from "./GlassCard";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number | string;
  changeLabel?: string;
  isPositive?: boolean;
  sparklineData?: number[];
  sparklineColor?: "terracotta" | "emerald" | "gold" | "cyan" | "ruby";
  icon?: React.ReactNode;
  accentVariant?: "terracotta" | "gold" | "emerald" | "default" | "ruby";
  subtext?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changeLabel = "vs last month",
  isPositive = true,
  sparklineData,
  sparklineColor = "emerald",
  icon,
  accentVariant = "default",
  subtext,
  className = "",
}) => {
  const accentTopBorders = {
    default: "before:bg-gradient-to-r before:from-white/10 before:via-white/5 before:to-transparent",
    terracotta: "before:bg-gradient-to-r before:from-heritage-terracotta/70 before:via-heritage-terracotta/20 before:to-transparent",
    gold: "before:bg-gradient-to-r before:from-heritage-gold/70 before:via-heritage-gold/20 before:to-transparent",
    emerald: "before:bg-gradient-to-r before:from-emerald-500/70 before:via-emerald-500/20 before:to-transparent",
    ruby: "before:bg-gradient-to-r before:from-rose-500/70 before:via-rose-500/20 before:to-transparent",
  };

  const iconBgStyles = {
    default: "bg-white/[0.05] text-stone-300 border-white/[0.08]",
    terracotta: "bg-heritage-terracotta/15 text-heritage-terracotta-light border-heritage-terracotta/30",
    gold: "bg-heritage-gold/15 text-heritage-gold border-heritage-gold/30",
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    ruby: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  return (
    <GlassCard
      variant="interactive"
      className={cn(
        "p-5 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]",
        accentTopBorders[accentVariant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105",
              iconBgStyles[accentVariant]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl lg:text-[28px] font-bold text-white tracking-tight num-display font-sans truncate">
            {value}
          </div>

          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {change !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded",
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                )}
                {typeof change === "number" ? `${change > 0 ? "+" : ""}${change}%` : change}
              </span>
            )}
            <span className="text-[11px] text-stone-400 tracking-normal truncate">
              {changeLabel}
            </span>
          </div>

          {subtext && (
            <p className="text-[11px] text-stone-400 mt-1 truncate">{subtext}</p>
          )}
        </div>

        {sparklineData && (
          <div className="shrink-0 self-end pb-1">
            <Sparkline
              data={sparklineData}
              color={sparklineColor}
              height={34}
              width={90}
            />
          </div>
        )}
      </div>
    </GlassCard>
  );
};
