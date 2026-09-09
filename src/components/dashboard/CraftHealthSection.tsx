"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/common/GlassCard";
import { CraftHealthSummary } from "@/types/dashboard";
import { ShieldAlert, HeartPulse, GraduationCap, ArrowRight } from "lucide-react";

interface CraftHealthSectionProps {
  health: CraftHealthSummary;
}

export const CraftHealthSection: React.FC<CraftHealthSectionProps> = ({ health }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const total = health.thriving + health.stable + health.vulnerable + health.endangered + health.revived;
  const thrivingPct = ((health.thriving / total) * 100).toFixed(1);
  const stablePct = ((health.stable / total) * 100).toFixed(1);
  const vulnerablePct = ((health.vulnerable / total) * 100).toFixed(1);
  const endangeredPct = ((health.endangered / total) * 100).toFixed(1);
  const revivedPct = ((health.revived / total) * 100).toFixed(1);

  return (
    <GlassCard variant="default" className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Craft Ecosystem Health & Endangerment Matrix
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Taxonomic vitality diagnostics tracking transmission, master lineages, and raw material availability.
          </p>
        </div>

        <Link
          href="/revival"
          className="flex items-center gap-1 text-xs font-semibold text-heritage-terracotta-light hover:text-white transition-colors self-start sm:self-center"
        >
          <span>Intervention Watchlist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Health Distribution Multi-Segment Bar */}
      <div className="my-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-300">
          <span className="font-semibold text-stone-200">
            Total Monitored Heritage Crafts: <span className="font-mono text-white">{total}</span>
          </span>
          <span className="font-mono text-[11px] text-stone-400">
            {health.thriving + health.stable} Healthy • {health.vulnerable + health.endangered} Under Threat
          </span>
        </div>

        <div className="h-3.5 w-full rounded-full bg-obsidian-950 flex overflow-hidden border border-white/[0.08] p-0.5 gap-1">
          <div
            style={{ width: `${thrivingPct}%` }}
            title={`Thriving: ${health.thriving} (${thrivingPct}%)`}
            className="h-full bg-emerald-500 rounded-sm transition-all hover:brightness-125"
          />
          <div
            style={{ width: `${stablePct}%` }}
            title={`Stable: ${health.stable} (${stablePct}%)`}
            className="h-full bg-sky-400 rounded-sm transition-all hover:brightness-125"
          />
          <div
            style={{ width: `${vulnerablePct}%` }}
            title={`Vulnerable: ${health.vulnerable} (${vulnerablePct}%)`}
            className="h-full bg-amber-400 rounded-sm transition-all hover:brightness-125"
          />
          <div
            style={{ width: `${endangeredPct}%` }}
            title={`Endangered: ${health.endangered} (${endangeredPct}%)`}
            className="h-full bg-rose-500 rounded-sm transition-all hover:brightness-125 animate-pulse"
          />
          <div
            style={{ width: `${revivedPct}%` }}
            title={`Revived: ${health.revived} (${revivedPct}%)`}
            className="h-full bg-purple-400 rounded-sm transition-all hover:brightness-125"
          />
        </div>
      </div>

      {/* 4 Health Status Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* Thriving */}
        <div
          onClick={() => setActiveCategory("thriving")}
          className="p-3.5 rounded-xl bg-obsidian-900/80 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
            <span>THRIVING</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white num-display mt-1">
            {health.thriving}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">Robust generational transfer</p>
          <div className="text-[10px] text-stone-400 mt-2 pt-2 border-t border-white/[0.04] font-mono">
            8,420 Active Artisans
          </div>
        </div>

        {/* Stable */}
        <div
          onClick={() => setActiveCategory("stable")}
          className="p-3.5 rounded-xl bg-obsidian-900/80 border border-sky-500/20 hover:border-sky-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
            <span>STABLE</span>
            <span className="w-2 h-2 rounded-full bg-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white num-display mt-1">
            {health.stable}
          </div>
          <p className="text-[11px] text-sky-300 mt-1">Sustained order demand</p>
          <div className="text-[10px] text-stone-400 mt-2 pt-2 border-t border-white/[0.04] font-mono">
            2,980 Active Artisans
          </div>
        </div>

        {/* Vulnerable */}
        <div
          onClick={() => setActiveCategory("vulnerable")}
          className="p-3.5 rounded-xl bg-obsidian-900/80 border border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
            <span>VULNERABLE</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white num-display mt-1">
            {health.vulnerable}
          </div>
          <p className="text-[11px] text-amber-300 mt-1">Raw material bottleneck</p>
          <div className="text-[10px] text-stone-400 mt-2 pt-2 border-t border-white/[0.04] font-mono">
            840 Active Artisans
          </div>
        </div>

        {/* Endangered */}
        <div
          onClick={() => setActiveCategory("endangered")}
          className="p-3.5 rounded-xl bg-obsidian-900/80 border border-rose-500/30 hover:border-rose-500/60 transition-all cursor-pointer relative"
        >
          <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
            <span className="text-rose-400 font-bold">ENDANGERED</span>
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          </div>
          <div className="text-2xl font-bold text-rose-300 num-display mt-1">
            {health.endangered}
          </div>
          <p className="text-[11px] text-rose-400 mt-1">&lt; 15 living masters</p>
          <div className="text-[10px] text-stone-400 mt-2 pt-2 border-t border-white/[0.04] font-mono">
            182 Active Artisans
          </div>
        </div>
      </div>

      {/* Key Diagnostic Vectors Footer */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-300">
          <GraduationCap className="w-4 h-4 text-heritage-gold shrink-0" />
          <span>
            <strong>Apprenticeship Pipeline:</strong> 1,240 enrolled students
          </span>
        </div>
        <div className="flex items-center gap-2 text-stone-300">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Raw Material Risk:</strong> 6 crafts facing supply constraints
          </span>
        </div>
        <div className="flex items-center gap-2 text-stone-300">
          <HeartPulse className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Revival Index:</strong> 12 stabilized lineages in 2026
          </span>
        </div>
      </div>
    </GlassCard>
  );
};
