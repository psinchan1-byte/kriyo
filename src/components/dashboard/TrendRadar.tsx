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
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-heritage-gold/15 border border-heritage-gold/30 flex items-center justify-center text-heritage-gold">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "16s" }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Ecosystem Trend Radar
            </h3>
            <p className="text-[11px] text-stone-400">
              Multi-dimensional velocity signals & demand inflection points
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-stone-400 border border-white/[0.06]">
          AI INFERRED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Rising Column */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase font-mono tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            <span>Rising Momentum</span>
          </div>

          <div className="space-y-2">
            {rising.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrend(item)}
                className="p-3 rounded-xl bg-obsidian-900/80 border border-white/[0.06] hover:border-orange-500/40 hover:bg-obsidian-800 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-semibold text-stone-100 group-hover:text-white transition-colors truncate">
                    {item.craftName}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-0.5 shrink-0">
                    <ArrowUpRight className="w-3 h-3" />
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 font-mono">
                  <span>{item.region}</span>
                  <span className="text-orange-400/80">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emerging Column */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase font-mono tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Emerging Niches</span>
          </div>

          <div className="space-y-2">
            {emerging.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrend(item)}
                className="p-3 rounded-xl bg-obsidian-900/80 border border-white/[0.06] hover:border-amber-400/40 hover:bg-obsidian-800 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-semibold text-stone-100 group-hover:text-white transition-colors truncate">
                    {item.craftName}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-0.5 shrink-0">
                    <ArrowUpRight className="w-3 h-3" />
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 font-mono">
                  <span>{item.region}</span>
                  <span className="text-amber-300/80">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Declining / Watchlist Column */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase font-mono tracking-wider">
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            <span>Declining / Watch</span>
          </div>

          <div className="space-y-2">
            {declining.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTrend(item)}
                className="p-3 rounded-xl bg-obsidian-900/80 border border-white/[0.06] hover:border-rose-500/40 hover:bg-obsidian-800 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-semibold text-stone-100 group-hover:text-white transition-colors truncate">
                    {item.craftName}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-0.5 shrink-0">
                    {item.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 font-mono">
                  <span>{item.region}</span>
                  <span className="text-rose-400/80">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popover / Clicked Detail preview */}
      {selectedTrend && (
        <div className="mt-4 p-3 rounded-xl bg-obsidian-800 border border-white/[0.1] text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-heritage-terracotta-light shrink-0" />
            <span className="text-stone-300">
              <strong className="text-white">{selectedTrend.craftName}</strong> ({selectedTrend.region}) — Signal Metric: {selectedTrend.metric} with velocity index of {selectedTrend.growth}.
            </span>
          </div>
          <button
            onClick={() => setSelectedTrend(null)}
            className="text-[11px] text-stone-400 hover:text-white px-2 py-0.5 rounded bg-white/[0.04]"
          >
            Close
          </button>
        </div>
      )}
    </GlassCard>
  );
};
