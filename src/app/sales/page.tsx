"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { GlassCard } from "@/components/common/GlassCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SalesRevenueChart } from "@/components/dashboard/SalesRevenueChart";
import { formatCurrencyINR, formatDate } from "@/lib/utils";
import { Loading } from "@/components/common/Loading";
import {
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Download,
  Calendar,
} from "lucide-react";

export default function SalesPage() {
  const { analytics, recentOrders, loading } = useAnalytics();

  if (loading || !analytics) {
    return (
      <div className="p-8 max-w-7xl mx-auto w-full">
        <Loading type="dashboard" />
      </div>
    );
  }

  return (
    <PageContainer
      title="Sales & Fair-Trade Commerce Analytics"
      description="Transparent transaction ledger tracking gross platform sales turnover, average order values, and guaranteed direct artisan bank transfers."
      badge="₹18.42 CR GROSS TURNOVER"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 cursor-pointer">
          <Download className="w-3.5 h-3.5" />
          <span>Export Payout Ledger</span>
        </button>
      }
    >
      {/* 4 Financial Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard variant="default" className="p-5">
          <span className="text-[10px] font-mono uppercase text-earth-muted block">Gross Sales Turnover</span>
          <div className="text-2xl font-bold text-earth-dark num-display mt-1">
            {formatCurrencyINR(analytics.grossRevenue)}
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono font-semibold">+24.6% vs last quarter</span>
        </GlassCard>

        <GlassCard variant="default" className="p-5">
          <span className="text-[10px] font-mono uppercase text-earth-muted block">Artisan Direct Payout</span>
          <div className="text-2xl font-bold text-emerald-800 num-display mt-1">
            {formatCurrencyINR(analytics.artisanDirectPayout)}
          </div>
          <span className="text-[11px] text-earth-muted mt-1 block font-mono">80.0% Fair-Trade Escrow</span>
        </GlassCard>

        <GlassCard variant="default" className="p-5">
          <span className="text-[10px] font-mono uppercase text-earth-muted block">Total Orders Fulfilled</span>
          <div className="text-2xl font-bold text-earth-dark num-display mt-1">
            {analytics.totalOrders.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-earth-muted mt-1 block font-mono">Zero chargeback incidents</span>
        </GlassCard>

        <GlassCard variant="default" className="p-5">
          <span className="text-[10px] font-mono uppercase text-earth-muted block">Average Order Value (AOV)</span>
          <div className="text-2xl font-bold text-heritage-gold num-display mt-1">
            {formatCurrencyINR(analytics.averageOrderValue)}
          </div>
          <span className="text-[11px] text-earth-muted mt-1 block font-mono">Institutional B2B uplift</span>
        </GlassCard>
      </div>

      {/* Main Revenue & Payout Chart */}
      <SalesRevenueChart />

      {/* Recent Orders Ledger Table */}
      <GlassCard variant="default" className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#B8794A]/14">
          <div>
            <h3 className="text-base font-semibold text-earth-dark tracking-tight">
              Recent Fair-Trade Order Dispatches
            </h3>
            <p className="text-xs text-earth-muted mt-0.5">
              Live settlement verification with automated artisan cooperative split.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-heritage-sand text-earth-slate border border-[#B8794A]/14">
            ONDC NETWORK ORDERS
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#B8794A]/14 text-earth-muted font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Order Number</th>
                <th className="py-3 px-3">Buyer & Region</th>
                <th className="py-3 px-3">Item & Artisan Attribution</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Order Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8794A]/10">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#B8794A]/5 transition-colors">
                  <td className="py-3 px-3 font-mono text-heritage-terracotta font-semibold">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-earth-dark">{order.customerName}</div>
                    <div className="text-[11px] text-earth-muted">{order.customerRegion}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-earth-dark font-medium">{order.items[0]?.productTitle}</div>
                    <div className="text-[11px] text-heritage-gold font-medium">
                      Artisan: {order.items[0]?.artisanName}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-earth-muted font-mono text-[11px]">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={order.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-earth-dark num-display">
                    {formatCurrencyINR(order.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
