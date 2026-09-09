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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#B8794A]/12">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-700 shadow-sm">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#2C221E] tracking-tight">
              Craft Ecosystem Health & Endangerment Matrix
            </h3>
          </div>
          <p className="text-xs text-[#6E5D53] mt-1 font-medium">
            Taxonomic vitality diagnostics tracking transmission, master lineages, and raw material availability.
          </p>
        </div>

        <Link
          href="/revival"
          className="flex items-center gap-1 text-xs font-bold text-[#B8794A] hover:text-[#965C34] transition-colors self-start sm:self-center"
        >
          <span>Intervention Watchlist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Health Distribution Multi-Segment Bar */}
      <div className="my-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#6E5D53] font-medium">
          <span className="font-bold text-[#2C221E]">
            Total Monitored Heritage Crafts: <span className="font-mono text-[#B8794A]">{total}</span>
          </span>
          <span className="font-mono text-[11px] text-[#9A887C] font-semibold">
            {health.thriving + health.stable} Healthy • {health.vulnerable + health.endangered} Under Threat
          </span>
        </div>

        <div className="h-3.5 w-full rounded-full bg-[#EFE7DA] flex overflow-hidden border border-[#B8794A]/15 p-0.5 gap-1">
          <div
            style={{ width: `${thrivingPct}%` }}
            title={`Thriving: ${health.thriving} (${thrivingPct}%)`}
            className="h-full bg-[#2A855C] rounded-sm transition-all hover:brightness-110"
          />
          <div
            style={{ width: `${stablePct}%` }}
            title={`Stable: ${health.stable} (${stablePct}%)`}
            className="h-full bg-[#0284C7] rounded-sm transition-all hover:brightness-110"
          />
          <div
            style={{ width: `${vulnerablePct}%` }}
            title={`Vulnerable: ${health.vulnerable} (${vulnerablePct}%)`}
            className="h-full bg-[#D97706] rounded-sm transition-all hover:brightness-110"
          />
          <div
            style={{ width: `${endangeredPct}%` }}
            title={`Endangered: ${health.endangered} (${endangeredPct}%)`}
            className="h-full bg-[#C93B3B] rounded-sm transition-all hover:brightness-110 animate-pulse"
          />
          <div
            style={{ width: `${revivedPct}%` }}
            title={`Revived: ${health.revived} (${revivedPct}%)`}
            className="h-full bg-[#8A5A2B] rounded-sm transition-all hover:brightness-110"
          />
        </div>
      </div>

      {/* 4 Health Status Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* Thriving */}
        <div
          onClick={() => setActiveCategory("thriving")}
          className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between text-[11px] text-[#6E5D53] font-mono font-bold">
            <span>THRIVING</span>
            <span className="w-2 h-2 rounded-full bg-[#2A855C]" />
          </div>
          <div className="text-2xl font-black text-[#2C221E] num-display mt-1">
            {health.thriving}
          </div>
          <p className="text-[11px] text-emerald-800 font-bold mt-1">Robust generational transfer</p>
          <div className="text-[10px] text-[#9A887C] mt-2 pt-2 border-t border-[#B8794A]/12 font-mono font-medium">
            8,420 Active Artisans
          </div>
        </div>

        {/* Stable */}
        <div
          onClick={() => setActiveCategory("stable")}
          className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-sky-500/30 hover:border-sky-500/50 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between text-[11px] text-[#6E5D53] font-mono font-bold">
            <span>STABLE</span>
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
          </div>
          <div className="text-2xl font-black text-[#2C221E] num-display mt-1">
            {health.stable}
          </div>
          <p className="text-[11px] text-sky-800 font-bold mt-1">Sustained order demand</p>
          <div className="text-[10px] text-[#9A887C] mt-2 pt-2 border-t border-[#B8794A]/12 font-mono font-medium">
            2,980 Active Artisans
          </div>
        </div>

        {/* Vulnerable */}
        <div
          onClick={() => setActiveCategory("vulnerable")}
          className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-amber-500/35 hover:border-amber-500/55 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between text-[11px] text-[#6E5D53] font-mono font-bold">
            <span>VULNERABLE</span>
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          </div>
          <div className="text-2xl font-black text-[#2C221E] num-display mt-1">
            {health.vulnerable}
          </div>
          <p className="text-[11px] text-amber-900 font-bold mt-1">Raw material bottleneck</p>
          <div className="text-[10px] text-[#9A887C] mt-2 pt-2 border-t border-[#B8794A]/12 font-mono font-medium">
            840 Active Artisans
          </div>
        </div>

        {/* Endangered */}
        <div
          onClick={() => setActiveCategory("endangered")}
          className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-rose-500/35 hover:border-rose-500/60 transition-all cursor-pointer relative shadow-sm"
        >
          <div className="flex items-center justify-between text-[11px] text-[#6E5D53] font-mono font-bold">
            <span className="text-rose-800 font-bold">ENDANGERED</span>
            <span className="w-2 h-2 rounded-full bg-[#C93B3B] animate-ping" />
          </div>
          <div className="text-2xl font-black text-rose-800 num-display mt-1">
            {health.endangered}
          </div>
          <p className="text-[11px] text-rose-800 font-bold mt-1">&lt; 15 living masters</p>
          <div className="text-[10px] text-[#9A887C] mt-2 pt-2 border-t border-[#B8794A]/12 font-mono font-medium">
            182 Active Artisans
          </div>
        </div>
      </div>

      {/* Key Diagnostic Vectors Footer */}
      <div className="mt-5 pt-4 border-t border-[#B8794A]/12 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#6E5D53]">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#B8794A] shrink-0" />
          <span>
            <strong className="text-[#2C221E]">Apprenticeship Pipeline:</strong> 1,240 enrolled students
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong className="text-[#2C221E]">Raw Material Risk:</strong> 6 crafts facing supply constraints
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong className="text-[#2C221E]">Revival Index:</strong> 12 stabilized lineages in 2026
          </span>
        </div>
      </div>
    </GlassCard>
  );
};
