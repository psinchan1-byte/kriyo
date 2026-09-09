"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { IndiaMap } from "@/components/common/IndiaMap";
import { GlassCard } from "@/components/common/GlassCard";
import { Compass, MapPin, Users, TrendingUp, ShieldCheck } from "lucide-react";

export default function GeographyPage() {
  const stateRankings = [
    { state: "Bihar", artisans: 3840, demandIndex: 96, topCraft: "Madhubani Painting", status: "Thriving" },
    { state: "Rajasthan", artisans: 3120, demandIndex: 92, topCraft: "Blue Pottery", status: "Thriving" },
    { state: "Jammu & Kashmir", artisans: 2450, demandIndex: 89, topCraft: "Kashmir Pashmina", status: "Stable" },
    { state: "Karnataka", artisans: 1890, demandIndex: 85, topCraft: "Channapatna Toys", status: "Vulnerable" },
    { state: "Chhattisgarh", artisans: 1182, demandIndex: 81, topCraft: "Dokra Bell Metal", status: "Vulnerable" },
    { state: "Tamil Nadu", artisans: 420, demandIndex: 78, topCraft: "Toda Embroidery", status: "Endangered" },
  ];

  return (
    <PageContainer
      title="Geographic Intelligence & Regional Corridors"
      description="Spatial clustering, geographical concentration, and inter-state trade corridors connecting rural artisan clusters to global demand centers."
      badge="6 NATIONAL CORRIDORS"
    >
      {/* Interactive India Map */}
      <IndiaMap />

      {/* State-by-State Telemetry Table */}
      <GlassCard variant="default" className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              State Artisanal Concentration & Demand Indices
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Live ranking of state craft ecosystems based on active guild registrations and buyer conversion rates.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-stone-400">
            CENSUS 2026 AUDIT
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-stone-400 font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Rank & State</th>
                <th className="py-3 px-3">Verified Artisans</th>
                <th className="py-3 px-3">Regional Demand Index</th>
                <th className="py-3 px-3">Lead Signature Craft</th>
                <th className="py-3 px-3 text-right">Ecosystem Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {stateRankings.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-stone-400 font-bold">0{i + 1}</span>
                      <span className="font-semibold text-white">{row.state}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-200">
                    {row.artisans.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 font-mono text-heritage-gold font-bold">
                    {row.demandIndex} / 100
                  </td>
                  <td className="py-3 px-3 text-stone-300">
                    {row.topCraft}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-mono ${
                        row.status === "Thriving"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : row.status === "Stable"
                          ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                          : row.status === "Vulnerable"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {row.status}
                    </span>
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
