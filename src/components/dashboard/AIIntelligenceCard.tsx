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
        className="p-6 relative overflow-hidden border border-[#B96D43]/30 bg-gradient-to-br from-[#FFFDF8] via-[#F6F1E8] to-[#EFE6D7] shadow-glass"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B96D43]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
          {/* Header pill & confidence */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#B96D43]/15 border border-[#B96D43]/30 text-[#B96D43] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#B96D43] block font-bold">
                  AI INTELLIGENCE COPILOT
                </span>
                <span className="text-xs font-bold text-[#49372A] flex items-center gap-1.5">
                  Autonomous Market Signal
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F7A61] animate-ping inline-block" />
                </span>
              </div>
            </div>

            {/* Confidence Score Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3F7A61]/15 border border-[#3F7A61]/30 text-[#3F7A61] font-mono text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F7A61]" />
              <span>Confidence: 87%</span>
            </div>
          </div>

          {/* Core Signal Description */}
          <div className="space-y-2">
            <h4 className="text-lg font-black text-[#49372A] tracking-tight leading-snug">
              Demand for Madhubani wall art increased{" "}
              <span className="text-[#B96D43] underline decoration-[#B96D43]/50 underline-offset-4">
                34%
              </span>{" "}
              over the last 30 days.
            </h4>
            <p className="text-xs text-[#6E5D53] leading-relaxed font-medium">
              Elevated purchase intent detected across Tier-1 metro buyer cohorts, driven by natural mineral-pigment authenticity certification and corporate festive gifting.
            </p>
          </div>

          {/* Likely Drivers Bullet Pills */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9A887C] block mb-2 font-bold">
              Likely Drivers
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFFDF8] border border-[#B96D43]/15 text-[#49372A] font-semibold shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-[#3F7A61] shrink-0" />
                <span className="truncate">Search volume ↑ (+42%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFFDF8] border border-[#B96D43]/15 text-[#49372A] font-semibold shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-[#3F7A61] shrink-0" />
                <span className="truncate">Buyer saves ↑ (+38%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFFDF8] border border-[#B96D43]/15 text-[#49372A] font-semibold shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-[#3F7A61] shrink-0" />
                <span className="truncate">Festival demand cycle ↑</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFFDF8] border border-[#B96D43]/15 text-[#49372A] font-semibold shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-[#3F7A61] shrink-0" />
                <span className="truncate">Regional interest (NCR/BLR) ↑</span>
              </div>
            </div>
          </div>

          {/* Recommended Action & Action Trigger */}
          <div className="pt-3 border-t border-[#B96D43]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#B96D43] uppercase tracking-wider block font-bold">
                Recommended Action
              </span>
              <p className="text-xs text-[#6E5D53] font-semibold mt-0.5">
                Increase visibility for high-performing Madhubani products.
              </p>
            </div>

            <button
              onClick={() => setShowAnalysisModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#B96D43] to-[#7E4221] text-white text-xs font-bold hover:brightness-105 shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-center cursor-pointer"
            >
              <span>View Deep Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Deep Analysis Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#49372A]/35 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#FFFDF8] border border-[#B96D43]/25 rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B96D43] font-bold">
                  Predictive Analysis Report
                </span>
                <h3 className="text-base font-bold text-[#49372A] mt-0.5">
                  Madhubani Folk Art Market Surge • Signal #8492
                </h3>
              </div>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="p-1.5 rounded-lg text-[#6E5D53] hover:text-[#49372A] hover:bg-[#B96D43]/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#6E5D53]">
              <div className="p-3 rounded-xl bg-[#EFE6D7]/60 border border-[#B96D43]/15 space-y-1.5">
                <span className="font-bold text-[#49372A] block">Pricing Elasticity Index</span>
                <p className="text-[#6E5D53] leading-relaxed font-medium">
                  Price elasticity is measured at -0.38 (highly inelastic). Artisans can increase realization by 12-15% on Kachni and Bharni style wall panels without lowering cart checkout rates.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#EFE6D7]/60 border border-[#B96D43]/15 space-y-1.5">
                <span className="font-bold text-[#49372A] block">Target Cooperative Guilds</span>
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#FFFDF8] border border-[#B96D43]/15 text-[#49372A] font-mono font-medium">
                    Ranti Village Cooperative (180 Artisans)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFFDF8] border border-[#B96D43]/15 text-[#49372A] font-mono font-medium">
                    Jitwarpur Master Guild (240 Artisans)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#3F7A61]/15 border border-[#3F7A61]/30 text-[#3F7A61]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Zap className="w-4 h-4 text-[#3F7A61]" />
                  Estimated Incremental Artisan Earnings
                </div>
                <p className="text-xs text-[#3F7A61] mt-1 font-semibold">
                  +₹42.8 Lakh direct bank transfer surplus over next 60 days upon automated deployment.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#B96D43]/14 flex items-center justify-between">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-3.5 py-1.5 text-xs text-[#6E5D53] hover:text-[#49372A] font-bold"
              >
                Dismiss
              </button>

              <button
                onClick={() => setActionExecuted(true)}
                disabled={actionExecuted}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  actionExecuted
                    ? "bg-[#3F7A61] text-white cursor-default"
                    : "bg-[#B96D43] hover:brightness-105 text-white shadow-md active:scale-95 cursor-pointer"
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
