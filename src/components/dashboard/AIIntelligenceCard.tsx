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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#49372A]/35 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--card-background)] border border-[#B96D43]/25 rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-150 relative my-auto">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#B96D43]/15 flex items-start justify-between bg-white/40 sticky top-0 z-10 backdrop-blur-xl">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B96D43] font-bold">
                  Predictive Analysis Report
                </span>
                <h3 className="text-xl font-bold text-[#49372A] mt-1">
                  Madhubani Folk Art Market Surge • Signal #8492
                </h3>
              </div>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="p-1.5 rounded-lg text-[#6E5D53] hover:text-[#49372A] hover:bg-[#B96D43]/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-8">
              {/* A. EXECUTIVE SUMMARY */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  A. Executive Summary
                </h4>
                <p className="text-sm text-[#49372A] leading-relaxed">
                  Demand for <strong className="text-[#B96D43]">Madhubani wall art</strong> has increased by a significant <strong className="text-[#B96D43]">34%</strong> over the last 30 days. This shift is highly significant, crossing our predictive threshold for anomalous market surges, primarily affecting high-end wall panels and authenticated canvas pieces.
                </p>
              </section>

              {/* B. DEMAND TREND */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  B. Demand Trend (Last 30 Days)
                </h4>
                <div className="mt-4 bg-white/60 p-4 rounded-xl border border-[#B96D43]/10">
                  <div className="flex items-end gap-1 h-32 w-full pt-4">
                    {[12, 14, 15, 13, 18, 22, 28, 35, 42, 48, 55, 62, 70, 75, 82].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col justify-end group">
                        <div 
                          className="bg-gradient-to-t from-[#B96D43] to-[#D69A70] rounded-t-sm w-full transition-all group-hover:brightness-110" 
                          style={{ height: `${val}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-[#6E5D53] font-mono">
                    <span>30 days ago</span>
                    <span>Demand Index (Up 34%)</span>
                    <span>Today</span>
                  </div>
                </div>
              </section>

              {/* C. KEY DRIVERS */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  C. Key Drivers
                </h4>
                <div className="space-y-4 bg-white/60 p-4 rounded-xl border border-[#B96D43]/10">
                  {[
                    { label: "Search Volume", val: 85, metric: "+42%" },
                    { label: "Buyer Saves/Wishlists", val: 75, metric: "+38%" },
                    { label: "Festival Demand", val: 65, metric: "+25%" },
                    { label: "Regional Interest (NCR/BLR)", val: 90, metric: "+55%" }
                  ].map((driver, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-[#49372A] font-semibold mb-1">
                        <span>{driver.label}</span>
                        <span className="text-[#3F7A61]">{driver.metric}</span>
                      </div>
                      <div className="w-full bg-[#EFE6D7] rounded-full h-2">
                        <div className="bg-[#3F7A61] h-2 rounded-full" style={{ width: `${driver.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* D. REGIONAL ANALYSIS */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  D. Regional Analysis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { region: "Delhi NCR", val: 35 },
                    { region: "Mumbai", val: 25 },
                    { region: "Bengaluru", val: 20 },
                    { region: "West Bengal", val: 12 },
                    { region: "Bihar (Local)", val: 8 }
                  ].map((reg, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/60 p-2.5 rounded-lg border border-[#B96D43]/10">
                      <div className="w-8 h-8 rounded-full bg-[#B96D43]/15 flex items-center justify-center text-[#B96D43] font-bold text-xs shrink-0">
                        {reg.val}%
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-[#49372A]">{reg.region}</span>
                        <div className="w-full bg-[#EFE6D7] rounded-full h-1.5 mt-1">
                          <div className="bg-[#B96D43] h-1.5 rounded-full" style={{ width: `${reg.val}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* E. PRODUCT ANALYSIS */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  E. Product Analysis
                </h4>
                <div className="p-4 rounded-xl bg-white/60 border border-[#B96D43]/10 text-sm text-[#49372A] space-y-2">
                  <p><strong>Top Performing Category:</strong> Kachni Style Wall Panels (24x36)</p>
                  <p><strong>Average Price:</strong> ₹4,500 - ₹8,200</p>
                  <p><strong>Conversion Indicators:</strong> Checkout rates are up 18%. Price elasticity is measured at -0.38 (highly inelastic), indicating strong brand/GI value.</p>
                </div>
              </section>

              {/* F. ARTISAN IMPACT */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  F. Artisan Impact
                </h4>
                <div className="p-4 rounded-xl bg-[#3F7A61]/10 border border-[#3F7A61]/20 text-sm text-[#3F7A61] space-y-2">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Zap className="w-4 h-4" />
                    <span>Opportunity & Constraints</span>
                  </div>
                  <p>
                    <strong>Expected Demand:</strong> Additional ~1,200 units required over the next 45 days.
                  </p>
                  <p>
                    <strong>Supply Constraints:</strong> Current active inventory covers only 30% of projected surge. High production pressure on Jitwarpur and Ranti cooperative guilds.
                  </p>
                  <p>
                    <strong>Earnings Potential:</strong> Estimated +₹42.8 Lakh direct bank transfer surplus over next 60 days if inventory matches demand.
                  </p>
                </div>
              </section>

              {/* G. RECOMMENDED ACTION */}
              <section>
                <h4 className="text-[11px] font-mono uppercase text-[#9A887C] font-bold mb-3 tracking-widest border-b border-[#B96D43]/15 pb-1">
                  G. Recommended Action
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#49372A] marker:text-[#B96D43]">
                  <li>Increase marketplace visibility for authenticated Madhubani products.</li>
                  <li>Prioritize procurement from verified Jitwarpur and Ranti artisans to meet inventory deficits.</li>
                  <li>Target high-intent buyer segments in Delhi NCR and Bengaluru with dedicated festive campaigns.</li>
                  <li>Maintain current pricing or test 12-15% premium on authentic Kachni pieces.</li>
                </ul>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#B96D43]/15 flex items-center justify-between bg-white/40 sticky bottom-0 z-10 backdrop-blur-xl rounded-b-2xl">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-4 py-2 text-sm text-[#6E5D53] hover:text-[#49372A] font-bold transition-colors"
              >
                Dismiss
              </button>

              <button
                onClick={() => setActionExecuted(true)}
                disabled={actionExecuted}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
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
