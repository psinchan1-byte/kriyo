"use client";

import React from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { useCrafts } from "@/hooks/useCrafts";
import { OverviewHero } from "@/components/dashboard/OverviewHero";
import { KPIGrid } from "@/components/dashboard/KPIGrid";
import { SalesRevenueChart } from "@/components/dashboard/SalesRevenueChart";
import { AIIntelligenceCard } from "@/components/dashboard/AIIntelligenceCard";
import { TrendRadar } from "@/components/dashboard/TrendRadar";
import { CraftHealthSection } from "@/components/dashboard/CraftHealthSection";
import { IndiaMap } from "@/components/common/IndiaMap";
import { ActivityStream } from "@/components/dashboard/ActivityStream";
import { CraftPerformanceTable } from "@/components/dashboard/CraftPerformanceTable";
import { Loading } from "@/components/common/Loading";

export default function OverviewPage() {
  const { data: metrics, loading: metricsLoading } = useDashboard();
  const { crafts, loading: craftsLoading } = useCrafts();

  if (metricsLoading || !metrics) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
        <Loading type="dashboard" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-5 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* 1. Executive Telemetry Hero Greeting */}
      <OverviewHero />

      {/* 2. Executive KPI Metrics Grid (8 Cards) */}
      <KPIGrid metrics={metrics} />

      {/* 3. Primary Analytical Views: Sales/Payout Chart & AI Copilot Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SalesRevenueChart />
        </div>
        <div className="lg:col-span-5">
          <AIIntelligenceCard />
        </div>
      </div>

      {/* 4. Ecosystem Trend Radar */}
      <TrendRadar trends={metrics.trendRadar} />

      {/* 5. Geographic Intelligence & Pan-India Corridor Clusters */}
      <IndiaMap />

      {/* 6. Living Craft Ecosystem Health Distribution */}
      <CraftHealthSection health={metrics.craftHealth} />

      {/* 7. Craft Performance Index & Real-Time Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <CraftPerformanceTable crafts={crafts} />
        </div>
        <div className="lg:col-span-4">
          <ActivityStream activities={metrics.recentActivity} />
        </div>
      </div>
    </div>
  );
}
