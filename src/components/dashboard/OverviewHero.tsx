"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import {
  Download,
  RefreshCw,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { DashboardMetrics } from "@/types/dashboard";

interface OverviewHeroProps {
  onRefresh?: () => Promise<void>;
  metrics?: DashboardMetrics;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onRefresh, metrics }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [lastSynced, setLastSynced] = useState("2 mins ago");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        // Simulate network delay if no refresh handler
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      setLastSynced("Just now");
      showToast("Telemetry synchronized successfully.");
    } catch (error) {
      showToast("Telemetry sync failed. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      // Simulate generating report
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("KRIYO", margin, margin);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Heritage Intelligence Platform", margin, margin + 6);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("INTELLIGENCE REPORT", margin, margin + 18);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, margin + 26);
      doc.text(`Selected Period: Last 30 Days`, margin, margin + 32);
      
      doc.line(margin, margin + 36, pageWidth - margin, margin + 36);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("EXECUTIVE SUMMARY", margin, margin + 46);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      let y = margin + 54;
      doc.text(`Total Artisans: ${metrics?.totalArtisans || 12482}`, margin, y); y += 6;
      doc.text(`Active Crafts: ${metrics?.totalCrafts || 142}`, margin, y); y += 6;
      doc.text(`Total Products: ${metrics?.totalProducts || 45910}`, margin, y); y += 6;
      doc.text(`Total Orders: ${metrics?.totalOrders || 8920}`, margin, y); y += 6;
      doc.text(`Total Revenue: INR ${(metrics?.grossRevenue || 12400000).toLocaleString('en-IN')}`, margin, y); y += 6;
      doc.text(`Active Buyers: ${metrics?.activeBuyers || 4102}`, margin, y); y += 6;
      doc.text(`Engagement Velocity: +${metrics?.engagementTrendPercent || 31.4}%`, margin, y); y += 6;
      doc.text(`Crafts at Risk: ${metrics?.craftsAtRisk || 26}`, margin, y); y += 12;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("MARKET INTELLIGENCE", margin, y); y += 8;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Current AI market signals point to a 34% increase in demand for Madhubani", margin, y); y += 6;
      doc.text("wall art over the last 30 days. Buyer wishlisting for eco-friendly", margin, y); y += 6;
      doc.text("natural dyes has surged 45% in urban metro regions.", margin, y); y += 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("REGIONAL INTELLIGENCE", margin, y); y += 8;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Important artisan corridors experiencing growth:", margin, y); y += 6;
      doc.text("- Bihar (Mithila Art): High institutional demand.", margin, y); y += 6;
      doc.text("- West Bengal (Kantha): Rising B2B procurement.", margin, y); y += 12;

      if (y > 250) {
        doc.addPage();
        y = margin;
      }
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("PRODUCT INTELLIGENCE", margin, y); y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Top-performing products include Kanchipuram Silk and Dokra castings.", margin, y); y += 6;
      doc.text("Average conversion rate across GI-authenticated items increased to 4.2%.", margin, y); y += 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("RISK & REVIVAL", margin, y); y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("8 Crafts are currently marked as CRITICAL.", margin, y); y += 6;
      doc.text("Intervention signals suggest immediate digital enablement for declining", margin, y); y += 6;
      doc.text("craft clusters in Jammu & Kashmir.", margin, y); y += 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("RECOMMENDED ACTIONS", margin, y); y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("1. Increase visibility for high-performing Madhubani products.", margin, y); y += 6;
      doc.text("2. Launch 'Apprenticeship Support' intervention for Kullu Shawls.", margin, y); y += 6;
      doc.text("3. Disburse targeted fair-trade grants to critical weavers.", margin, y); y += 12;

      doc.line(margin, y, pageWidth - margin, y);

      const dateStr = new Date().toISOString().split('T')[0];
      doc.save(`KRIYO_Intelligence_Report_${dateStr}.pdf`);
      
      showToast("Intelligence report exported successfully.");
    } catch (error) {
      console.error(error);
      showToast("Unable to export intelligence report.");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastSynced === "Just now") {
        setLastSynced("1 min ago");
      } else if (lastSynced.includes("min")) {
        const mins = parseInt(lastSynced) || 1;
        setLastSynced(`${mins + 1} mins ago`);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [lastSynced]);

  return (
    <>
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-[#3F7A61] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-[#3F7A61]/20">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

      <GlassCard
        variant="default"
        className="p-6 sm:p-7 relative overflow-hidden border border-[#B8794A]/18 shadow-glass"
      >
        {/* Decorative Warm Ambient Glow Corner */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#B8794A]/12 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold text-[#B8794A] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B8794A] animate-pulse" />
                National Artisanal Telemetry
              </span>
              <span className="text-[#9A887C]">•</span>
              <span className="text-xs text-[#6E5D53] flex items-center gap-1 font-mono font-medium">
                <Clock className="w-3 h-3 text-[#B8794A]" />
                {currentDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#2C221E] tracking-tight">
              Good morning, <span className="bg-gradient-to-r from-[#2C221E] via-[#B8794A] to-[#8C532B] bg-clip-text text-transparent">Admin Director</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#6E5D53] font-medium max-w-2xl leading-relaxed">
              Monitor the pulse of India&apos;s living craft ecosystem. Real-time telemetry tracking 12,482 verified master artisans, 142 Geographical Indication crafts, and autonomous revival interventions.
            </p>

            {/* Telemetry Status Badges */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--card-background)] border border-[#B8794A]/18 text-[11px] text-[#2C221E] font-medium opacity-80 mix-blend-multiply">
                <Building2 className="w-3.5 h-3.5 text-[#B8794A]" />
                <span>Ministry of Textiles & ONDC Node Sync</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-800 font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>System Operational • 99.98%</span>
              </div>
              <div className="text-[11px] text-[#9A887C] font-mono font-medium">
                Last synced {lastSynced}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#B8794A]/20 hover:bg-[#FDFBF7] text-[#2C221E] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#B8794A] ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing Telemetry..." : "Sync Telemetry"}</span>
            </button>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#B8794A] to-[#965C34] text-white text-xs font-bold hover:brightness-105 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isExporting ? "Generating Report..." : "Export Intelligence"}</span>
            </button>
          </div>
        </div>
      </GlassCard>
    </>
  );
};
