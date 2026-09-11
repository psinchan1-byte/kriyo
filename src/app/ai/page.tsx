"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AIIntelligenceCard } from "@/components/dashboard/AIIntelligenceCard";
import { GlassCard } from "@/components/common/GlassCard";
import { Sparkles, BrainCircuit, TrendingUp, Zap, ShieldCheck, ArrowRight } from "lucide-react";

import { fetchIntelligence } from "@/lib/api";

export default function AIPage() {
  const [predictiveModels, setPredictiveModels] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchIntelligence().then(intel => {
      const models = intel.aiSignals.map((sig) => ({
        title: sig.craft + " " + sig.trend + " Trend",
        description: sig.signal + " Drivers: " + sig.drivers.join(', ') + ".",
        accuracy: sig.confidence + "%",
        recommendation: sig.recommendation,
      }));
      setPredictiveModels(models);
    });
  }, []);

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
        <h3 className="text-base font-bold text-earth-dark tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-heritage-terracotta" />
          <span>Active Predictive Machine Learning Models</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {predictiveModels.map((model, idx) => (
            <GlassCard key={idx} variant="default" className="p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#B8794A]/12">
                  <span className="text-[10px] font-mono uppercase text-heritage-terracotta font-semibold">
                    Model #{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 font-semibold">
                    {model.accuracy} Accuracy
                  </span>
                </div>
                <h4 className="text-sm font-bold text-earth-dark mt-2">
                  {model.title}
                </h4>
                <p className="text-xs text-earth-slate mt-1.5 leading-relaxed">
                  {model.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#B8794A]/12 bg-heritage-sand/60 -mx-2 -mb-2 p-3 rounded-xl">
                <span className="text-[10px] font-mono uppercase text-heritage-terracotta block font-bold">
                  Autonomous Recommendation
                </span>
                <p className="text-xs text-earth-dark mt-0.5 font-medium">
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
