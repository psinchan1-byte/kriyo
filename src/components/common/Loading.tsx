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
          <div className="w-10 h-10 rounded-full border-2 border-[#B8794A]/20 border-t-[#B8794A] animate-spin" />
          <div className="absolute inset-2 rounded-full border border-[#C89B6D]/40 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>
        <p className="text-xs text-[#6E5D53] font-mono tracking-wide font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6 w-full animate-pulse", className)}>
      {/* Top Banner Skeleton */}
      <div className="h-28 rounded-2xl bg-[#FFFDF8]/70 border border-[#B8794A]/12 p-6 flex items-center justify-between shadow-sm">
        <div className="space-y-2.5">
          <div className="h-6 w-48 bg-[#EFE7DA] rounded-md" />
          <div className="h-3.5 w-72 bg-[#EFE7DA]/60 rounded-md" />
        </div>
        <div className="h-8 w-32 bg-[#EFE7DA] rounded-xl" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-[#FFFDF8]/70 border border-[#B8794A]/12 p-5 space-y-3 shadow-sm">
            <div className="h-3 w-24 bg-[#EFE7DA] rounded" />
            <div className="flex justify-between items-end">
              <div className="h-8 w-28 bg-[#EFE7DA] rounded-md" />
              <div className="h-6 w-20 bg-[#EFE7DA]/60 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Skeleton */}
      <div className="h-80 rounded-2xl bg-[#FFFDF8]/70 border border-[#B8794A]/12 p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="h-5 w-44 bg-[#EFE7DA] rounded" />
          <div className="h-6 w-36 bg-[#EFE7DA] rounded-lg" />
        </div>
        <div className="h-56 bg-[#EFE7DA]/30 rounded-xl border border-[#B8794A]/10" />
      </div>
    </div>
  );
};

