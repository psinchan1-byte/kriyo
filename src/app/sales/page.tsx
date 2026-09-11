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
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    if (isExporting || !analytics || !recentOrders.length) return;
    setIsExporting(true);
    
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("KRIYO", margin, margin);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Sales & Fair-Trade Commerce Analytics", margin, margin + 6);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("PAYOUT LEDGER", margin, margin + 18);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, margin + 26);
      
      doc.line(margin, margin + 30, pageWidth - margin, margin + 30);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("FINANCIAL SUMMARY", margin, margin + 40);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Gross Sales Turnover: INR ${analytics.grossRevenue.toLocaleString('en-IN')}`, margin, margin + 48);
      doc.text(`Artisan Direct Payout (80% Escrow): INR ${analytics.artisanDirectPayout.toLocaleString('en-IN')}`, margin, margin + 54);
      doc.text(`Total Orders Fulfilled: ${analytics.totalOrders.toLocaleString('en-IN')}`, margin, margin + 60);
      doc.text(`Average Order Value: INR ${analytics.averageOrderValue.toLocaleString('en-IN')}`, margin, margin + 66);

      const tableData = recentOrders.map(order => [
        order.orderNumber,
        order.customerName,
        order.items[0]?.productTitle || 'N/A',
        formatDate(order.orderDate),
        order.status,
        `INR ${order.totalAmount.toLocaleString('en-IN')}`
      ]);

      autoTable(doc, {
        startY: margin + 76,
        head: [['Order Number', 'Buyer', 'Item', 'Date', 'Status', 'Total']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [184, 121, 74] } // heritage-terracotta
      });

      const dateStr = new Date().toISOString().split('T')[0];
      doc.save(`KRIYO_Payout_Ledger_${dateStr}.pdf`);
      
    } catch (error) {
      console.error(error);
      alert("Unable to export ledger.");
    } finally {
      setIsExporting(false);
    }
  };

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
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? <span className="animate-pulse">Generating PDF...</span> : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Payout Ledger</span>
            </>
          )}
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

      {/* Main Layout: Chart (Left) + Insights & Categories (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 h-full">
          <SalesRevenueChart />
        </div>

        <div className="space-y-6">
          {/* Key Insights Panel */}
          <GlassCard variant="default" className="p-6">
            <h3 className="text-base font-semibold text-earth-dark tracking-tight mb-4">
              Key Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-heritage-green-light flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-heritage-green" />
                </div>
                <div>
                  <div className="text-sm font-bold text-earth-dark">Festival season demand ↑ 34%</div>
                  <div className="text-xs text-earth-muted mt-0.5">Driven by Madhubani & Pattachitra crafts</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-heritage-terracotta/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-heritage-terracotta" />
                </div>
                <div>
                  <div className="text-sm font-bold text-earth-dark">B2B institutional orders ↑ 28%</div>
                  <div className="text-xs text-earth-muted mt-0.5">New government procurement contracts</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-heritage-gold/10 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-heritage-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-earth-dark">Direct artisan payouts ↑ 24.6%</div>
                  <div className="text-xs text-earth-muted mt-0.5">Higher financial inclusion this quarter</div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Top Performing Categories */}
          <GlassCard variant="default" className="p-6">
            <h3 className="text-base font-semibold text-earth-dark tracking-tight mb-4">
              Top Performing Categories
            </h3>
            <div className="space-y-4">
              {[
                { name: "Textiles", val: 32 },
                { name: "Paintings", val: 24 },
                { name: "Metalwork", val: 18 },
                { name: "Woodcraft", val: 14 },
                { name: "Pottery & Ceramics", val: 12 },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-earth-dark">{cat.name}</span>
                    <span className="font-mono text-earth-slate">{cat.val}%</span>
                  </div>
                  <div className="w-full bg-heritage-secondary rounded-full h-1.5">
                    <div
                      className="bg-heritage-terracotta h-1.5 rounded-full"
                      style={{ width: `${cat.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

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
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-heritage-secondary text-earth-slate border border-[#B8794A]/14">
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
                <tr key={order.id} className="hover:bg-heritage-terracotta/5 transition-colors">
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

      {/* Bottom Impact Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          {
            title: "Verified Transactions",
            desc: "100% block-verified",
            icon: <ShieldCheck className="w-5 h-5 text-heritage-green" />,
          },
          {
            title: "Fair-Trade Certified",
            desc: "Guaranteed margins",
            icon: <IndianRupee className="w-5 h-5 text-heritage-gold" />,
          },
          {
            title: "Government Integration",
            desc: "ONDC connected",
            icon: <Calendar className="w-5 h-5 text-heritage-terracotta" />,
          },
          {
            title: "Impact Metrics",
            desc: "High rural uplift",
            icon: <TrendingUp className="w-5 h-5 text-earth-slate" />,
          },
        ].map((item, i) => (
          <GlassCard key={i} variant="interactive" className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-heritage-secondary shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-sm font-bold text-earth-dark">{item.title}</div>
              <div className="text-xs text-earth-muted">{item.desc}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
