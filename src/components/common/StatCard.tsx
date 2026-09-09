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
    default: "before:bg-gradient-to-r before:from-[#B96D43]/30 before:via-[#B96D43]/10 before:to-transparent",
    terracotta: "before:bg-gradient-to-r before:from-[#B96D43] before:via-[#B96D43]/40 before:to-transparent",
    gold: "before:bg-gradient-to-r before:from-[#B58A50] before:via-[#B58A50]/40 before:to-transparent",
    emerald: "before:bg-gradient-to-r before:from-[#3F7A61] before:via-[#3F7A61]/40 before:to-transparent",
    ruby: "before:bg-gradient-to-r before:from-[#A95050] before:via-[#A95050]/40 before:to-transparent",
  };

  const iconBgStyles = {
    default: "bg-[#B96D43]/10 text-[#49372A] border-[#B96D43]/20",
    terracotta: "bg-[#B96D43]/15 text-[#B96D43] border-[#B96D43]/30",
    gold: "bg-[#B58A50]/18 text-[#8A5A2B] border-[#B58A50]/35",
    emerald: "bg-[#3F7A61]/15 text-[#3F7A61] border-[#3F7A61]/30",
    ruby: "bg-[#A95050]/15 text-[#A95050] border-[#A95050]/30",
  };

  return (
    <GlassCard
      variant="interactive"
      className={cn(
        "p-5 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]",
        accentTopBorders[accentVariant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A887C]">
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              "w-7 h-7 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-sm",
              iconBgStyles[accentVariant]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl lg:text-[28px] font-black text-[#49372A] tracking-tight num-display font-sans truncate">
            {value}
          </div>

          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {change !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md",
                  isPositive
                    ? "bg-[#3F7A61]/15 text-[#3F7A61] border border-[#3F7A61]/30"
                    : "bg-[#A95050]/15 text-[#A95050] border border-[#A95050]/30"
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
            <span className="text-[11px] text-[#6E5D53] tracking-normal truncate font-medium">
              {changeLabel}
            </span>
          </div>

          {subtext && (
            <p className="text-[11px] text-[#6E5D53] mt-1 truncate font-medium">{subtext}</p>
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
