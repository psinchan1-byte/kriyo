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
          bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-800 font-semibold",
          dot: "bg-emerald-600",
        };
      case "stable":
      case "gi tagged":
        return {
          bg: "bg-sky-500/15 border-sky-500/30 text-sky-800 font-semibold",
          dot: "bg-sky-600",
        };
      case "vulnerable":
      case "moderate":
      case "processing":
      case "active intervention":
        return {
          bg: "bg-amber-500/15 border-amber-500/35 text-amber-900 font-semibold",
          dot: "bg-amber-600",
        };
      case "endangered":
      case "critical":
      case "high":
        return {
          bg: "bg-rose-500/15 border-rose-500/35 text-rose-800 font-semibold",
          dot: "bg-rose-600 animate-pulse",
        };
      case "revived":
      case "awardee":
        return {
          bg: "bg-[#C89B6D]/20 border-[#C89B6D]/35 text-[#8A5A2B] font-semibold",
          dot: "bg-[#B8794A]",
        };
      default:
        return {
          bg: "bg-[#B8794A]/10 border-[#B8794A]/20 text-[#2C221E] font-semibold",
          dot: "bg-[#B8794A]",
        };
    }
  };

  const style = getStyles(status);
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full border backdrop-blur-sm select-none tracking-wide",
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
