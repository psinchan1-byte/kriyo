"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/common/GlassCard";
import { StatCard } from "@/components/common/StatCard";
import { Eye, Heart, Bookmark, Search, TrendingUp, Users } from "lucide-react";

export default function EngagementPage() {
  const topSearchQueries = [
    { query: "Madhubani natural pigment canvas", volume: "42.8K", growth: "+38%" },
    { query: "Authentic Kani Pashmina GI shawl", volume: "31.2K", growth: "+29%" },
    { query: "Bastar Dokra tribal decor", volume: "24.5K", growth: "+22%" },
    { query: "Channapatna eco wooden toys", volume: "19.8K", growth: "+18%" },
    { query: "Rogan art fabric wall piece", volume: "14.1K", growth: "+45%" },
    { query: "Pattachitra Jagannath scroll", volume: "12.6K", growth: "+14%" },
  ];

  return (
    <PageContainer
      title="Buyer Engagement & Demand Signals"
      description="Holistic engagement telemetry tracking organic search velocity, intent saves, and buyer conversion corridors across global markets."
      badge="842K IMPRESSIONS"
    >
      {/* 4 Core Engagement Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Profile Views"
          value="842,000"
          change="+31.0%"
          changeLabel="vs last month"
          icon={<Eye className="w-4 h-4" />}
          accentVariant="default"
          sparklineData={[52, 59, 64, 71, 75, 80, 84]}
          sparklineColor="cyan"
        />

        <StatCard
          label="Curation Saves (Intent)"
          value="124,600"
          change="+28.4%"
          changeLabel="vs last month"
          icon={<Bookmark className="w-4 h-4" />}
          accentVariant="gold"
          sparklineData={[18, 21, 25, 29, 34, 38, 42]}
          sparklineColor="gold"
        />

        <StatCard
          label="Total Searches"
          value="231,000"
          change="+42.5%"
          changeLabel="Festive surge"
          icon={<Search className="w-4 h-4" />}
          accentVariant="terracotta"
          sparklineData={[30, 36, 40, 48, 55, 64, 72]}
          sparklineColor="terracotta"
        />

        <StatCard
          label="High-Intent Save Rate"
          value="64.2%"
          change="+5.8%"
          changeLabel="Above benchmark"
          icon={<Heart className="w-4 h-4" />}
          accentVariant="emerald"
          sparklineData={[55, 57, 59, 60, 62, 63, 64]}
          sparklineColor="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Search Queries Table */}
        <div className="lg:col-span-7">
          <GlassCard variant="default" className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8794A]/14">
              <div>
                <h3 className="text-base font-semibold text-earth-dark tracking-tight">
                  High-Velocity Search Queries
                </h3>
                <p className="text-xs text-earth-muted mt-0.5">
                  Organic search volume across ONDC nodes and partner portals.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-heritage-sand text-earth-slate border border-[#B8794A]/14">
                REAL-TIME SEARCH BUS
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {topSearchQueries.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF8]/80 border border-[#B8794A]/14 hover:border-[#B8794A]/30 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-earth-muted font-bold">#{idx + 1}</span>
                    <span className="text-xs font-semibold text-earth-dark">{item.query}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-earth-dark font-bold">{item.volume}</span>
                    <span className="text-xs font-mono text-emerald-800 font-bold">{item.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Buyer Cohort Demographics */}
        <div className="lg:col-span-5">
          <GlassCard variant="default" className="p-6 space-y-4">
            <div className="pb-3 border-b border-[#B8794A]/14">
              <h3 className="text-base font-semibold text-earth-dark tracking-tight">
                Buyer Cohort Distribution
              </h3>
              <p className="text-xs text-earth-muted mt-0.5">
                Patron segmentation by intent & purchasing power.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FFFDF8]/80 border border-[#B8794A]/14">
                <div className="flex justify-between font-semibold text-earth-dark mb-1">
                  <span>Tier-1 Metro Domestic Connoisseurs</span>
                  <span className="text-earth-dark font-mono">48%</span>
                </div>
                <div className="h-2 rounded-full bg-heritage-sand overflow-hidden border border-[#B8794A]/10">
                  <div className="h-full bg-heritage-terracotta rounded-full" style={{ width: "48%" }} />
                </div>
                <span className="text-[10px] text-earth-muted mt-1 block">Delhi NCR, Bengaluru, Mumbai, Hyderabad</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF8]/80 border border-[#B8794A]/14">
                <div className="flex justify-between font-semibold text-earth-dark mb-1">
                  <span>Institutional B2B & Corporate Gifting</span>
                  <span className="text-earth-dark font-mono">28%</span>
                </div>
                <div className="h-2 rounded-full bg-heritage-sand overflow-hidden border border-[#B8794A]/10">
                  <div className="h-full bg-heritage-gold rounded-full" style={{ width: "28%" }} />
                </div>
                <span className="text-[10px] text-earth-muted mt-1 block">Average order size: ₹85,000+</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF8]/80 border border-[#B8794A]/14">
                <div className="flex justify-between font-semibold text-earth-dark mb-1">
                  <span>Global Indian Diaspora & Export</span>
                  <span className="text-earth-dark font-mono">24%</span>
                </div>
                <div className="h-2 rounded-full bg-heritage-sand overflow-hidden border border-[#B8794A]/10">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "24%" }} />
                </div>
                <span className="text-[10px] text-earth-muted mt-1 block">USA, UK, UAE, Singapore</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
