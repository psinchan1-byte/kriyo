"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AIIntelligenceCard } from "@/components/dashboard/AIIntelligenceCard";
import { GlassCard } from "@/components/common/GlassCard";
import { Sparkles, BrainCircuit, TrendingUp, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function AIPage() {
  const predictiveModels = [
    {
      title: "Fair-Wage Dynamic Price Elasticity",
      description: "Machine-learned price tolerance curves ensuring master artisans capture maximum surplus without dampening conversion rates.",
      accuracy: "94.8%",
      recommendation: "Increase ceiling by 12% on GI-certified Pashmina stoles during Q3 festive procurement.",
    },
    {
      title: "Cluster Raw Material Depletion Predictor",
      description: "Sensor & cooperative trade ledger analysis predicting natural beeswax and copper scrap shortages in Bastar metallurgical cluster.",
      accuracy: "91.2%",
      recommendation: "Pre-order raw beeswax buffer for 280 Dokra casting artisans 45 days ahead of festival demand.",
    },
    {
      title: "Apprentice Succession Pipeline Risk Model",
      description: "Demographic attrition model evaluating generational migration among master weavers aged 60+.",
      accuracy: "96.4%",
      recommendation: "Deploy Phase-2 revival subsidy to Nilgiris Toda embroidery community.",
    },
  ];

  return (
    <PageContainer
      title="AI Intelligence & Predictive Analytics"
      description="Autonomous AI copilot continuously parsing buyer behavior, price elasticity models, and craft endangerment vectors."
      badge="AUTONOMOUS COPILOT ACTIVE"
    >
      {/* Featured AI Intelligence Copilot Signal */}
      <AIIntelligenceCard />

      {/* Active Predictive Models */}
      <div className="space-y-4 mt-6">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-heritage-terracotta-light" />
          <span>Active Predictive Machine Learning Models</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {predictiveModels.map((model, idx) => (
            <GlassCard key={idx} variant="default" className="p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-heritage-terracotta-light">
                    Model #{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {model.accuracy} Accuracy
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">
                  {model.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                  {model.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] bg-obsidian-900/60 -mx-2 -mb-2 p-3 rounded-xl">
                <span className="text-[10px] font-mono uppercase text-heritage-gold block font-semibold">
                  Autonomous Recommendation
                </span>
                <p className="text-xs text-stone-200 mt-0.5">
                  {model.recommendation}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
