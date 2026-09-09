"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { TrendItem } from "@/types/dashboard";
import { Flame, Zap, TrendingDown, ArrowUpRight, Compass, Info } from "lucide-react";

interface TrendRadarProps {
  trends: TrendItem[];
}

export const TrendRadar: React.FC<TrendRadarProps> = ({ trends }) => {
  const [selectedTrend, setSelectedTrend] = useState<TrendItem | null>(null);

  const rising = trends.filter((t) => t.type === "rising");
  const emerging = trends.filter((t) => t.type === "emerging");
  const declining = trends.filter((t) => t.type === "declining");

  return (
    <GlassCard variant="default" className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#B8794A]/12">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#C89B6D]/20 border border-[#C89B6D]/35 flex items-center justify-center text-[#8A5A2B] shadow-sm">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "16s" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#2C221E] tracking-tight">
              Ecosystem Trend Radar
            </h3>
            <p className="text-[11px] text-[#6E5D53] font-medium">
              Multi-dimensional velocity signals & demand inflection points
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B8794A]/10 text-[#B8794A] border border-[#B8794A]/20 font-semibold">
          AI INFERRED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Rising Column */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase font-mono tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            <span>Rising Momentum</span>
          </div>

          <div className="space-y-2">
            {rising.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrend(item)}
                className="p-3 rounded-2xl bg-[#F6F1E8] border border-[#B8794A]/15 hover:border-[#B8794A]/35 hover:bg-[#FFFDF8] transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-bold text-[#2C221E] group-hover:text-[#B8794A] transition-colors truncate">
                    {item.craftName}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-0.5 shrink-0">
                    <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#6E5D53] mt-1.5 font-mono font-medium">
                  <span>{item.region}</span>
                  <span className="text-amber-800 font-bold">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emerging Column */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B8794A] uppercase font-mono tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#B8794A] text-[#B8794A]" />
            <span>Emerging Niches</span>
          </div>

          <div className="space-y-2">
            {emerging.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrend(item)}
                className="p-3 rounded-2xl bg-[#F6F1E8] border border-[#B8794A]/15 hover:border-[#B8794A]/35 hover:bg-[#FFFDF8] transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-bold text-[#2C221E] group-hover:text-[#B8794A] transition-colors truncate">
                    {item.craftName}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#B8794A] flex items-center gap-0.5 shrink-0">
                    <ArrowUpRight className="w-3 h-3 text-[#B8794A]" />
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#6E5D53] mt-1.5 font-mono font-medium">
                  <span>{item.region}</span>
                  <span className="text-[#B8794A] font-bold">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Declining / Watchlist Column */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase font-mono tracking-wider">
            <TrendingDown className="w-3.5 h-3.5 text-rose-700" />
            <span>Declining / Watch</span>
          </div>

          <div className="space-y-2">
            {declining.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrend(item)}
                className="p-3 rounded-2xl bg-[#F6F1E8] border border-[#B8794A]/15 hover:border-rose-500/35 hover:bg-[#FFFDF8] transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-bold text-[#2C221E] group-hover:text-rose-800 transition-colors truncate">
                    {item.craftName}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-800 flex items-center gap-0.5 shrink-0">
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#6E5D53] mt-1.5 font-mono font-medium">
                  <span>{item.region}</span>
                  <span className="text-rose-800 font-bold">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popover / Clicked Detail preview */}
      {selectedTrend && (
        <div className="mt-4 p-3 rounded-xl bg-[#EFE7DA] border border-[#B8794A]/20 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#B8794A] shrink-0" />
            <span className="text-[#6E5D53] font-medium">
              <strong className="text-[#2C221E] font-bold">{selectedTrend.craftName}</strong> ({selectedTrend.region}) — Signal Metric: {selectedTrend.metric} with velocity index of {selectedTrend.growth}.
            </span>
          </div>
          <button
            onClick={() => setSelectedTrend(null)}
            className="text-[11px] text-[#2C221E] font-bold hover:text-[#B8794A] px-2 py-0.5 rounded-lg bg-[#FFFDF8] border border-[#B8794A]/15 cursor-pointer shadow-sm"
          >
            Close
          </button>
        </div>
      )}
    </GlassCard>
  );
};
