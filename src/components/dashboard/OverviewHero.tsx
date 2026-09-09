"use client";

import React from "react";
import { GlassCard } from "@/components/common/GlassCard";
import {
  Sparkles,
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
      className="p-6 sm:p-7 relative overflow-hidden border border-white/[0.1] bg-gradient-to-r from-obsidian-850/90 via-obsidian-850/80 to-obsidian-900/90"
    >
      {/* Decorative Warm Ambient Glow Corner */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-heritage-terracotta/[0.08] to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono font-medium text-heritage-terracotta-light uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-heritage-terracotta animate-pulse" />
              National Artisanal Telemetry
            </span>
            <span className="text-stone-400">•</span>
            <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-stone-400" />
              {currentDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, <span className="bg-gradient-to-r from-white via-stone-200 to-heritage-sand bg-clip-text text-transparent">Admin Director</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
            Monitor the pulse of India&apos;s living craft ecosystem. Real-time telemetry tracking 12,482 verified master artisans, 142 Geographical Indication crafts, and autonomous revival interventions.
          </p>

          {/* Telemetry Status Badges */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-stone-300">
              <Building2 className="w-3 h-3 text-heritage-gold" />
              <span>Ministry of Textiles & ONDC Node Sync</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>System Operational • 99.98%</span>
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              Last synced 2 mins ago
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] text-stone-300 hover:text-white text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
            <span>Sync Telemetry</span>
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Intelligence</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
