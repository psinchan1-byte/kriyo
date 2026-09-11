"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { IndiaMap } from "@/components/common/IndiaMap";
import { GlassCard } from "@/components/common/GlassCard";
import { Compass, MapPin, Users, TrendingUp, ShieldCheck } from "lucide-react";

import { fetchIntelligence } from "@/lib/api";

export default function GeographyPage() {
  const [stateRankings, setStateRankings] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchIntelligence().then(intel => {
      // Flatten regional states into rankings
      const rankings = intel.geography.map((g) => ({
        state: g.states[0] || g.region, // simplifying to represent top state per region
        artisans: g.artisanCount,
        demandIndex: g.demandVelocity,
        topCraft: g.topCrafts[0] || "Various",
        status: g.demandVelocity > 80 ? "Thriving" : (g.demandVelocity > 60 ? "Stable" : "Vulnerable")
      })).sort((a, b) => b.demandIndex - a.demandIndex);
      setStateRankings(rankings);
    });
  }, []);

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
        <div className="flex items-center justify-between pb-4 border-b border-[#B8794A]/14">
          <div>
            <h3 className="text-base font-semibold text-earth-dark tracking-tight">
              State Artisanal Concentration & Demand Indices
            </h3>
            <p className="text-xs text-earth-muted mt-0.5">
              Live ranking of state craft ecosystems based on active guild registrations and buyer conversion rates.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-heritage-sand text-earth-slate border border-[#B8794A]/14">
            CENSUS 2026 AUDIT
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#B8794A]/14 text-earth-muted font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Rank & State</th>
                <th className="py-3 px-3">Verified Artisans</th>
                <th className="py-3 px-3">Regional Demand Index</th>
                <th className="py-3 px-3">Lead Signature Craft</th>
                <th className="py-3 px-3 text-right">Ecosystem Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8794A]/10">
              {stateRankings.map((row, i) => (
                <tr key={i} className="hover:bg-[#B8794A]/5 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-earth-muted font-bold">0{i + 1}</span>
                      <span className="font-semibold text-earth-dark">{row.state}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-earth-dark font-medium">
                    {row.artisans.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 font-mono text-heritage-gold font-bold">
                    {row.demandIndex} / 100
                  </td>
                  <td className="py-3 px-3 text-earth-slate font-medium">
                    {row.topCraft}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                        row.status === "Thriving"
                          ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/30"
                          : row.status === "Stable"
                          ? "bg-sky-500/15 text-sky-800 border border-sky-500/30"
                          : row.status === "Vulnerable"
                          ? "bg-amber-500/15 text-amber-800 border border-amber-500/30"
                          : "bg-rose-500/15 text-rose-800 border border-rose-500/30"
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
