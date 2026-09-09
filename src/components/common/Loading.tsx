import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  type?: "dashboard" | "table" | "cards" | "spinner";
  message?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  type = "dashboard",
  message = "Calibrating craft intelligence telemetry...",
  className = "",
}) => {
  if (type === "spinner") {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
        <div className="relative w-10 h-10 mb-3">
          <div className="w-10 h-10 rounded-full border-2 border-white/[0.08] border-t-heritage-terracotta animate-spin" />
          <div className="absolute inset-2 rounded-full border border-heritage-gold/40 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>
        <p className="text-xs text-stone-400 font-mono tracking-wide">{message}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6 w-full animate-pulse", className)}>
      {/* Top Banner Skeleton */}
      <div className="h-28 rounded-xl bg-obsidian-850/60 border border-white/[0.06] p-6 flex items-center justify-between">
        <div className="space-y-2.5">
          <div className="h-6 w-48 bg-white/[0.06] rounded-md" />
          <div className="h-3.5 w-72 bg-white/[0.04] rounded-md" />
        </div>
        <div className="h-8 w-32 bg-white/[0.06] rounded-lg" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-obsidian-850/60 border border-white/[0.06] p-5 space-y-3">
            <div className="h-3 w-24 bg-white/[0.05] rounded" />
            <div className="flex justify-between items-end">
              <div className="h-8 w-28 bg-white/[0.08] rounded-md" />
              <div className="h-6 w-20 bg-white/[0.04] rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Skeleton */}
      <div className="h-80 rounded-xl bg-obsidian-850/60 border border-white/[0.06] p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-5 w-44 bg-white/[0.06] rounded" />
          <div className="h-6 w-36 bg-white/[0.05] rounded-lg" />
        </div>
        <div className="h-56 bg-white/[0.02] rounded-lg border border-white/[0.04]" />
      </div>
    </div>
  );
};

