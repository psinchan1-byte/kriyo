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
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 rounded-lg bg-white border border-[#B8794A]/20 text-[#49372A] text-xs font-bold outline-none cursor-pointer">
            <option>All Risk Levels</option>
            <option>Critical</option>
            <option>High</option>
            <option>Moderate</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-semibold hover:brightness-110 shadow-glass transition-all active:scale-95 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Launch Emergency Protocol</span>
          </button>
        </div>
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
            {highlights.length} ENTITIES MONITORED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item) => (
            <GlassCard
              key={item.id}
              variant="interactive"
              className="p-5 relative border border-rose-500/20 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#B8794A]/12">
                  <div>
                    <h4 className="text-sm font-bold text-earth-dark leading-tight line-clamp-1" title={item.craftName}>
                      {item.craftName}
                    </h4>
                    <span className="text-[10px] text-earth-muted mt-0.5 block font-mono">
                      {item.region}
                    </span>
                  </div>
                  <StatusBadge status={item.endangermentLevel} size="sm" />
                </div>

                <div className="my-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-earth-slate flex items-center gap-1 font-medium">
                      <Users className="w-3 h-3 text-rose-600" />
                      Active Masters:
                    </span>
                    <strong className="text-rose-800 font-mono text-xs">
                      {item.activeMastersCount}
                    </strong>
                  </div>

                  {item.budgetAllocatedINR && (
                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#B8794A]/10">
                      <span className="text-earth-muted">State Grant:</span>
                      <strong className="text-emerald-700 font-mono">
                        {formatCurrencyINR(item.budgetAllocatedINR)}
                      </strong>
                    </div>
                  )}
                  
                  {/* Explainable Risk Signals */}
                  <div className="pt-2">
                    <span className="text-[9px] uppercase font-mono text-rose-600/80 font-bold block mb-1">
                      Risk Signals
                    </span>
                    <ul className="text-[10px] text-earth-slate space-y-0.5 leading-snug">
                      <li className="flex gap-1 items-start">
                        <AlertTriangle className="w-2.5 h-2.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>Generational gap detected in apprenticeship</span>
                      </li>
                      <li className="flex gap-1 items-start">
                        <AlertTriangle className="w-2.5 h-2.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>Raw material supply chain disruption</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#B8794A]/12 flex items-center justify-between mt-1">
                <div>
                  <span className="text-[9px] font-mono text-earth-muted uppercase block">
                    {item.revivalPlanStatus}
                  </span>
                  <span className="text-[11px] font-semibold text-earth-dark">
                    {item.interventionTimeline}
                  </span>
                </div>
                <button className="p-1.5 rounded-md bg-heritage-terracotta/10 text-heritage-terracotta hover:bg-heritage-terracotta hover:text-white transition-colors cursor-pointer">
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
