import React from "react";
import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "Thriving"
  | "Stable"
  | "Vulnerable"
  | "Endangered"
  | "Revived"
  | "Critical"
  | "High"
  | "Moderate"
  | "Verified"
  | "GI Tagged"
  | "Awardee"
  | "Delivered"
  | "Processing"
  | "Active Intervention";

interface StatusBadgeProps {
  status: BadgeStatus | string;
  size?: "sm" | "md";
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "sm",
  showDot = true,
  className = "",
}) => {
  const getStyles = (st: string) => {
    switch (st.toLowerCase()) {
      case "thriving":
      case "delivered":
      case "verified":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          dot: "bg-emerald-400",
        };
      case "stable":
      case "gi tagged":
        return {
          bg: "bg-sky-500/10 border-sky-500/30 text-sky-300",
          dot: "bg-sky-400",
        };
      case "vulnerable":
      case "moderate":
      case "processing":
      case "active intervention":
        return {
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
          dot: "bg-amber-400",
        };
      case "endangered":
      case "critical":
      case "high":
        return {
          bg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
          dot: "bg-rose-400 animate-pulse",
        };
      case "revived":
      case "awardee":
        return {
          bg: "bg-amber-400/10 border-amber-400/30 text-amber-200",
          dot: "bg-amber-300",
        };
      default:
        return {
          bg: "bg-white/[0.05] border-white/[0.1] text-stone-300",
          dot: "bg-stone-400",
        };
    }
  };

  const style = getStyles(status);
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm select-none tracking-wide",
        sizeClasses,
        style.bg,
        className
      )}
    >
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full inline-block shrink-0", style.dot)} />}
      {status}
    </span>
  );
};
