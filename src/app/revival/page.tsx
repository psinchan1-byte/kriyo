"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockDashboardMetrics } from "@/data/mock/dashboard";
import { GlassCard } from "@/components/common/GlassCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { CraftHealthSection } from "@/components/dashboard/CraftHealthSection";
import { formatCurrencyINR } from "@/lib/utils";
import { ShieldAlert, AlertTriangle, Users, Calendar, ArrowRight, HeartPulse, Plus } from "lucide-react";

export default function RevivalPage() {
  const highlights = mockDashboardMetrics.revivalHighlights;

  return (
    <PageContainer
      title="Craft Health, Risk & Revival Interventions"
      description="Crisis monitoring for vulnerable and endangered cultural craft practices with institutional state interventions, stipend stipends, and master protection protocols."
      badge="26 WATCHLIST ENTITIES"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-semibold hover:brightness-110 shadow-glass transition-all active:scale-95 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Launch Emergency Revival Plan</span>
        </button>
      }
    >
      {/* Ecosystem Health Distribution Overview */}
      <CraftHealthSection health={mockDashboardMetrics.craftHealth} />

      {/* Critical Intervention Watchlist */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="text-base font-bold text-earth-dark tracking-tight">
              Active Preservation Interventions & Emergency Roadmaps
            </h3>
          </div>
          <span className="text-[10px] font-mono text-rose-800 bg-rose-500/15 px-2.5 py-0.5 rounded border border-rose-500/30 font-semibold">
            8 CRITICAL ENDANGERED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <GlassCard
              key={item.id}
              variant="interactive"
              className="p-6 relative border border-rose-500/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#B8794A]/12">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-rose-700 font-bold block">
                      Level: {item.endangermentLevel}
                    </span>
                    <h4 className="text-sm font-bold text-earth-dark mt-1">
                      {item.craftName}
                    </h4>
                    <span className="text-xs text-earth-muted mt-0.5 block font-mono">
                      {item.region}
                    </span>
                  </div>
                  <StatusBadge status={item.endangermentLevel} size="sm" />
                </div>

                <div className="my-4 p-3 rounded-xl bg-rose-50/70 border border-rose-200/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-earth-slate flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-rose-600" />
                      Active Living Masters:
                    </span>
                    <strong className="text-rose-800 font-mono text-sm">
                      {item.activeMastersCount} Practitioners
                    </strong>
                  </div>

                  {item.budgetAllocatedINR && (
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-rose-200/40">
                      <span className="text-earth-muted">Institutional Grant:</span>
                      <strong className="text-emerald-800 font-mono">
                        {formatCurrencyINR(item.budgetAllocatedINR)}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#B8794A]/12 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-earth-muted uppercase block">
                    Protocol Milestone
                  </span>
                  <span className="text-xs font-semibold text-earth-dark">
                    {item.interventionTimeline || item.revivalPlanStatus}
                  </span>
                </div>
                <button className="flex items-center gap-1 text-xs font-semibold text-heritage-terracotta hover:text-heritage-terracotta-dark transition-colors cursor-pointer">
                  <span>Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
