"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Zap,
} from "lucide-react";

export const AIIntelligenceCard: React.FC = () => {
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [actionExecuted, setActionExecuted] = useState(false);

  return (
    <>
      <GlassCard
        variant="highlighted"
        className="p-6 relative overflow-hidden border border-heritage-terracotta/40 bg-gradient-to-br from-obsidian-850/95 via-obsidian-850/90 to-heritage-terracotta/[0.07]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-terracotta/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
          {/* Header pill & confidence */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-heritage-terracotta/20 border border-heritage-terracotta/40 text-heritage-terracotta-light shadow-glow-terracotta">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-heritage-terracotta-light block font-semibold">
                  AI INTELLIGENCE COPILOT
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Autonomous Market Signal
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                </span>
              </div>
            </div>

            {/* Confidence Score Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confidence: 87%</span>
            </div>
          </div>

          {/* Core Signal Description */}
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
              Demand for Madhubani wall art increased{" "}
              <span className="text-heritage-terracotta-light underline decoration-heritage-terracotta/50 underline-offset-4">
                34%
              </span>{" "}
              over the last 30 days.
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Elevated purchase intent detected across Tier-1 metro buyer cohorts, driven by natural mineral-pigment authenticity certification and corporate festive gifting.
            </p>
          </div>

          {/* Likely Drivers Bullet Pills */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-2 font-semibold">
              Likely Drivers
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/80 border border-white/[0.06] text-stone-200">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Search volume ↑ (+42%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/80 border border-white/[0.06] text-stone-200">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Buyer saves ↑ (+38%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/80 border border-white/[0.06] text-stone-200">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Festival demand cycle ↑</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-900/80 border border-white/[0.06] text-stone-200">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Regional interest (NCR/BLR) ↑</span>
              </div>
            </div>
          </div>

          {/* Recommended Action & Action Trigger */}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block font-semibold">
                Recommended Action
              </span>
              <p className="text-xs text-stone-300 mt-0.5">
                Increase visibility for high-performing Madhubani products.
              </p>
            </div>

            <button
              onClick={() => setShowAnalysisModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 shrink-0 self-start sm:self-center cursor-pointer"
            >
              <span>View Deep Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Deep Analysis Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-obsidian-850 border border-white/[0.12] rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-heritage-terracotta-light">
                  Predictive Analysis Report
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Madhubani Folk Art Market Surge • Signal #8492
                </h3>
              </div>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="p-3 rounded-lg bg-obsidian-900 border border-white/[0.06] space-y-1.5">
                <span className="font-semibold text-stone-100 block">Pricing Elasticity Index</span>
                <p className="text-stone-400 leading-relaxed">
                  Price elasticity is measured at -0.38 (highly inelastic). Artisans can increase realization by 12-15% on Kachni and Bharni style wall panels without lowering cart checkout rates.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-obsidian-900 border border-white/[0.06] space-y-1.5">
                <span className="font-semibold text-stone-100 block">Target Cooperative Guilds</span>
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-stone-300 font-mono">
                    Ranti Village Cooperative (180 Artisans)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-stone-300 font-mono">
                    Jitwarpur Master Guild (240 Artisans)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Estimated Incremental Artisan Earnings
                </div>
                <p className="text-xs text-emerald-200/80 mt-1">
                  +₹42.8 Lakh direct bank transfer surplus over next 60 days upon automated deployment.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-3.5 py-1.5 text-xs text-stone-400 hover:text-white"
              >
                Dismiss
              </button>

              <button
                onClick={() => setActionExecuted(true)}
                disabled={actionExecuted}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  actionExecuted
                    ? "bg-emerald-600 text-white cursor-default"
                    : "bg-heritage-terracotta hover:brightness-110 text-white shadow-glow-terracotta active:scale-95 cursor-pointer"
                }`}
              >
                {actionExecuted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Visibility Protocol Dispatched
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Deploy Recommended Protocol
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
