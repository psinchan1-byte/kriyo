"use client";

import React from "react";
import { GlassCard } from "@/components/common/GlassCard";
import {
  Download,
  RefreshCw,
  Clock,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface OverviewHeroProps {
  onRefresh?: () => void;
  onExport?: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onRefresh, onExport }) => {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <GlassCard
      variant="default"
      className="p-6 sm:p-7 relative overflow-hidden border border-[#B8794A]/18 bg-gradient-to-r from-[#FFFDF8]/90 via-[#FAF7F2]/85 to-[#EFE7DA]/90 shadow-glass"
    >
      {/* Decorative Warm Ambient Glow Corner */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#B8794A]/12 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono font-bold text-[#B8794A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B8794A] animate-pulse" />
              National Artisanal Telemetry
            </span>
            <span className="text-[#9A887C]">•</span>
            <span className="text-xs text-[#6E5D53] flex items-center gap-1 font-mono font-medium">
              <Clock className="w-3 h-3 text-[#B8794A]" />
              {currentDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#2C221E] tracking-tight">
            Good morning, <span className="bg-gradient-to-r from-[#2C221E] via-[#B8794A] to-[#8C532B] bg-clip-text text-transparent">Admin Director</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#6E5D53] font-medium max-w-2xl leading-relaxed">
            Monitor the pulse of India&apos;s living craft ecosystem. Real-time telemetry tracking 12,482 verified master artisans, 142 Geographical Indication crafts, and autonomous revival interventions.
          </p>

          {/* Telemetry Status Badges */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EFE7DA]/70 border border-[#B8794A]/18 text-[11px] text-[#2C221E] font-medium">
              <Building2 className="w-3.5 h-3.5 text-[#B8794A]" />
              <span>Ministry of Textiles & ONDC Node Sync</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-800 font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>System Operational • 99.98%</span>
            </div>
            <div className="text-[11px] text-[#9A887C] font-mono font-medium">
              Last synced 2 mins ago
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFDF8] border border-[#B8794A]/20 hover:bg-white text-[#2C221E] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#B8794A]" />
            <span>Sync Telemetry</span>
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#B8794A] to-[#965C34] text-white text-xs font-bold hover:brightness-105 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Intelligence</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
