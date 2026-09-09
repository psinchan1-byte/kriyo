"use client";

import React from "react";
import { StatCard } from "@/components/common/StatCard";
import { DashboardMetrics } from "@/types/dashboard";
import {
  Users,
  Palette,
  Package,
  ShoppingBag,
  IndianRupee,
  UserCheck,
  Eye,
  ShieldAlert,
} from "lucide-react";

interface KPIGridProps {
  metrics: DashboardMetrics;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. TOTAL ARTISANS */}
      <StatCard
        label="Total Artisans"
        value={metrics.totalArtisans.toLocaleString("en-IN")}
        change={metrics.artisansTrendPercent}
        changeLabel="vs last month"
        isPositive={true}
        sparklineData={metrics.artisanSparkline}
        sparklineColor="emerald"
        icon={<Users className="w-4 h-4" />}
        accentVariant="emerald"
        subtext="3,140 verified master guilds"
      />

      {/* 2. ACTIVE CRAFTS */}
      <StatCard
        label="Active Crafts"
        value={metrics.totalCrafts}
        change={`+${metrics.craftsTrendNew} new`}
        changeLabel="GI registered this qtr"
        isPositive={true}
        sparklineData={[124, 128, 131, 134, 138, 139, 142]}
        sparklineColor="gold"
        icon={<Palette className="w-4 h-4" />}
        accentVariant="gold"
        subtext="Across 28 states & UTs"
      />

      {/* 3. TOTAL PRODUCTS */}
      <StatCard
        label="Total Products"
        value={metrics.totalProducts.toLocaleString("en-IN")}
        change={metrics.productsTrendPercent}
        changeLabel="vs last month"
        isPositive={true}
        sparklineData={[38, 41, 40, 44, 46, 45, 49]}
        sparklineColor="cyan"
        icon={<Package className="w-4 h-4" />}
        accentVariant="default"
        subtext="100% natural provenance trace"
      />

      {/* 4. TOTAL ORDERS */}
      <StatCard
        label="Total Orders"
        value={metrics.totalOrders.toLocaleString("en-IN")}
        change={metrics.ordersTrendPercent}
        changeLabel="vs last month"
        isPositive={true}
        sparklineData={[22, 26, 25, 29, 31, 32, 35]}
        sparklineColor="terracotta"
        icon={<ShoppingBag className="w-4 h-4" />}
        accentVariant="terracotta"
        subtext="Direct fulfillment via ONDC"
      />

      {/* 5. TOTAL REVENUE */}
      <StatCard
        label="Total Revenue"
        value="₹18.42 Cr"
        change={metrics.revenueTrendPercent}
        changeLabel="vs last quarter"
        isPositive={true}
        sparklineData={metrics.revenueSparkline}
        sparklineColor="emerald"
        icon={<IndianRupee className="w-4 h-4" />}
        accentVariant="emerald"
        subtext="₹14.73 Cr paid directly to artisans (80%)"
      />

      {/* 6. ACTIVE BUYERS */}
      <StatCard
        label="Active Buyers"
        value={metrics.activeBuyers.toLocaleString("en-IN")}
        change={metrics.buyersTrendPercent}
        changeLabel="vs last month"
        isPositive={true}
        sparklineData={[110, 118, 126, 132, 140, 146, 154]}
        sparklineColor="gold"
        icon={<UserCheck className="w-4 h-4" />}
        accentVariant="gold"
        subtext="42% repeat institutional patrons"
      />

      {/* 7. ENGAGEMENT */}
      <StatCard
        label="Engagement Velocity"
        value={`${(metrics.engagement.views / 1000).toFixed(0)}K`}
        change={metrics.engagementTrendPercent}
        changeLabel="save rate: 64.2%"
        isPositive={true}
        sparklineData={[52, 59, 64, 71, 75, 80, 84]}
        sparklineColor="cyan"
        icon={<Eye className="w-4 h-4" />}
        accentVariant="default"
        subtext="124.6K saves • 231K searches"
      />

      {/* 8. CRAFTS AT RISK */}
      <StatCard
        label="Crafts At Risk"
        value={`${metrics.craftsAtRisk} Crafts`}
        change="8 Critical"
        changeLabel="18 Watchlist"
        isPositive={false}
        sparklineData={[32, 30, 29, 28, 27, 26, 26]}
        sparklineColor="ruby"
        icon={<ShieldAlert className="w-4 h-4" />}
        accentVariant="ruby"
        subtext="14 under active revival protocol"
      />
    </div>
  );
};
