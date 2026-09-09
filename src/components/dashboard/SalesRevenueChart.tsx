"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { formatCurrencyINR } from "@/lib/utils";

interface ChartDataPoint {
  month: string;
  grossRevenue: number; // INR
  artisanPayout: number; // INR
  orders: number;
  annotation?: string;
}

const CHART_DATA: ChartDataPoint[] = [
  { month: "Jan 26", grossRevenue: 9800000, artisanPayout: 7840000, orders: 1840 },
  { month: "Feb 26", grossRevenue: 11200000, artisanPayout: 8960000, orders: 2150 },
  { month: "Mar 26", grossRevenue: 13500000, artisanPayout: 10800000, orders: 2600, annotation: "ONDC Onboarding" },
  { month: "Apr 26", grossRevenue: 12800000, artisanPayout: 10240000, orders: 2480 },
  { month: "May 26", grossRevenue: 15400000, artisanPayout: 12320000, orders: 2950 },
  { month: "Jun 26", grossRevenue: 16800000, artisanPayout: 13440000, orders: 3200 },
  { month: "Jul 26", grossRevenue: 17200000, artisanPayout: 13760000, orders: 3340 },
  { month: "Aug 26", grossRevenue: 18420000, artisanPayout: 14736000, orders: 3580, annotation: "Festival Demand Surge" },
];

export const SalesRevenueChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"revenue" | "orders">("revenue");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(CHART_DATA.length - 1);

  const maxRevenue = Math.max(...CHART_DATA.map((d) => d.grossRevenue)) * 1.1;
  const maxOrders = Math.max(...CHART_DATA.map((d) => d.orders)) * 1.15;

  const chartHeight = 220;
  const chartWidth = 600;
  const paddingX = 40;
  const paddingY = 20;
  const effectiveWidth = chartWidth - paddingX * 2;
  const effectiveHeight = chartHeight - paddingY * 2;

  // Calculate points for Revenue (Gross & Payout)
  const grossPoints = CHART_DATA.map((d, i) => {
    const x = paddingX + (i / (CHART_DATA.length - 1)) * effectiveWidth;
    const y = paddingY + effectiveHeight - (d.grossRevenue / maxRevenue) * effectiveHeight;
    return { x, y, data: d };
  });

  const payoutPoints = CHART_DATA.map((d, i) => {
    const x = paddingX + (i / (CHART_DATA.length - 1)) * effectiveWidth;
    const y = paddingY + effectiveHeight - (d.artisanPayout / maxRevenue) * effectiveHeight;
    return { x, y, data: d };
  });

  // Construct SVG paths
  const constructPath = (points: { x: number; y: number }[]) => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cx = (curr.x + next.x) / 2;
      d += ` C ${cx} ${curr.y}, ${cx} ${next.y}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const grossPathD = constructPath(grossPoints);
  const payoutPathD = constructPath(payoutPoints);

  const grossFillD = `${grossPathD} L ${grossPoints[grossPoints.length - 1].x} ${chartHeight - paddingY} L ${grossPoints[0].x} ${chartHeight - paddingY} Z`;
  const payoutFillD = `${payoutPathD} L ${payoutPoints[payoutPoints.length - 1].x} ${chartHeight - paddingY} L ${payoutPoints[0].x} ${chartHeight - paddingY} Z`;

  const hoveredData = hoveredIndex !== null ? CHART_DATA[hoveredIndex] : CHART_DATA[CHART_DATA.length - 1];

  return (
    <GlassCard variant="default" className="p-6">
      {/* Header with Title and Metric Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Fair-Trade Commerce & Revenue Telemetry
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              80.0% DIRECT ARTISAN PAYOUT
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Tracking monthly gross sales turnover vs. verified direct payouts transferred to artisan cooperative bank accounts.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-obsidian-950 border border-white/[0.08] self-start sm:self-center">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              activeTab === "revenue"
                ? "bg-heritage-terracotta text-white shadow-sm"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Turnover vs Payout
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-heritage-terracotta text-white shadow-sm"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Order Volume
          </button>
        </div>
      </div>

      {/* KPI Inspection Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-5 p-3.5 rounded-xl bg-obsidian-900/70 border border-white/[0.05]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
            Cohort Month
          </span>
          <span className="text-sm font-bold text-white font-mono">{hoveredData.month}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
            Gross Turnover
          </span>
          <span className="text-sm font-bold text-white font-mono">
            {formatCurrencyINR(hoveredData.grossRevenue)}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
            Artisan Direct Payout
          </span>
          <span className="text-sm font-bold text-emerald-400 font-mono">
            {formatCurrencyINR(hoveredData.artisanPayout)}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
            Total Orders
          </span>
          <span className="text-sm font-bold text-heritage-gold font-mono">
            {hoveredData.orders.toLocaleString("en-IN")} units
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart Area */}
      <div className="relative w-full overflow-x-auto pt-2">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto min-w-[500px] overflow-visible"
        >
          <defs>
            <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d9653b" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#d9653b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="payoutGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((factor, idx) => {
            const y = paddingY + effectiveHeight * (1 - factor);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={chartWidth - paddingX}
                y2={y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Filled Area Gradients */}
          <path d={grossFillD} fill="url(#grossGrad)" />
          <path d={payoutFillD} fill="url(#payoutGrad)" />

          {/* Lines */}
          <path
            d={grossPathD}
            fill="none"
            stroke="#d9653b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={payoutPathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />

          {/* Vertical Crosshair Line on Hover */}
          {hoveredIndex !== null && (
            <line
              x1={grossPoints[hoveredIndex].x}
              y1={paddingY}
              x2={grossPoints[hoveredIndex].x}
              y2={chartHeight - paddingY}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeDasharray="2 2"
            />
          )}

          {/* Data Points and Annotations */}
          {grossPoints.map((pt, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                {/* Invisible hover hitbox */}
                <rect
                  x={pt.x - 20}
                  y={paddingY}
                  width={40}
                  height={effectiveHeight}
                  fill="transparent"
                />

                {/* Gross point */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#d9653b"
                  stroke="#090a0f"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />

                {/* Payout point */}
                <circle
                  cx={payoutPoints[idx].x}
                  cy={payoutPoints[idx].y}
                  r={isHovered ? 4.5 : 2.5}
                  fill="#10b981"
                  stroke="#090a0f"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />

                {/* Milestone Annotation Callout */}
                {pt.data.annotation && (
                  <g>
                    <rect
                      x={pt.x - 48}
                      y={pt.y - 30}
                      width={96}
                      height={18}
                      rx={4}
                      fill="rgba(18, 21, 32, 0.9)"
                      stroke="rgba(217, 101, 59, 0.4)"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 18}
                      textAnchor="middle"
                      fill="#ea7d54"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="sans-serif"
                    >
                      {pt.data.annotation}
                    </text>
                  </g>
                )}

                {/* X-axis labels */}
                <text
                  x={pt.x}
                  y={chartHeight - 4}
                  textAnchor="middle"
                  fill={isHovered ? "#ffffff" : "#a8a29e"}
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight={isHovered ? "700" : "500"}
                >
                  {pt.data.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/[0.06] text-xs text-stone-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-heritage-terracotta inline-block rounded" />
            <span>Gross Platform Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-emerald-400 border-dashed inline-block rounded" />
            <span>Direct Artisan Payout (Fair-Trade Escrow)</span>
          </div>
        </div>
        <span className="font-mono text-[11px] text-stone-400 hidden sm:inline">
          Audit Verified • Automated Settlement
        </span>
      </div>
    </GlassCard>
  );
};
