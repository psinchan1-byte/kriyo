"use client";

import React, { useState } from "react";
import { Craft } from "@/types/craft";
import { StatusBadge } from "@/components/common/StatusBadge";
import { GlassCard } from "@/components/common/GlassCard";
import { CraftDetailModal } from "./CraftDetailModal";
import { Search, ArrowUpDown, ChevronRight, Award, Eye } from "lucide-react";

interface CraftPerformanceTableProps {
  crafts: Craft[];
}

export const CraftPerformanceTable: React.FC<CraftPerformanceTableProps> = ({ crafts }) => {
  const [search, setSearch] = useState("");
  const [healthFilter, setHealthFilter] = useState("All");
  const [sortField, setSortField] = useState<"artisans" | "growth" | "views">("growth");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);

  // Filter crafts
  const filtered = crafts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesHealth =
      healthFilter === "All" || c.healthStatus.toLowerCase() === healthFilter.toLowerCase();
    return matchesSearch && matchesHealth;
  });

  // Sort crafts
  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortField === "artisans") {
      diff = a.activeArtisansCount - b.activeArtisansCount;
    } else if (sortField === "growth") {
      diff = a.metrics.demandGrowthPercent - b.metrics.demandGrowthPercent;
    } else if (sortField === "views") {
      diff = a.metrics.views - b.metrics.views;
    }
    return sortAsc ? diff : -diff;
  });

  const handleSort = (field: "artisans" | "growth" | "views") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <>
      <GlassCard variant="default" className="p-6">
        {/* Table Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Living Craft Performance Index
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Comparative telemetry across verified master counts, buyer demand velocity, and preservation health.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Health Filter Pills */}
            <div className="flex items-center p-1 rounded-lg bg-obsidian-950 border border-white/[0.08] text-xs">
              {["All", "Thriving", "Vulnerable", "Endangered"].map((h) => (
                <button
                  key={h}
                  onClick={() => setHealthFilter(h)}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                    healthFilter === h
                      ? "bg-white/[0.1] text-white"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter crafts..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/[0.08] text-white text-xs placeholder-stone-400 focus:outline-none focus:border-heritage-terracotta/50 w-44"
              />
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-stone-400 font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-3 font-semibold">Craft & Provenance</th>
                <th className="py-3.5 px-3 font-semibold">Category</th>
                <th
                  onClick={() => handleSort("artisans")}
                  className="py-3.5 px-3 font-semibold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Artisans</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("growth")}
                  className="py-3.5 px-3 font-semibold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Demand Surge</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("views")}
                  className="py-3.5 px-3 font-semibold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Interest</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3 font-semibold">Health Status</th>
                <th className="py-3.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-stone-400 text-xs">
                    No crafts matching current filter criteria.
                  </td>
                </tr>
              ) : (
                sorted.map((craft) => (
                  <tr
                    key={craft.id}
                    onClick={() => setSelectedCraft(craft)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    {/* Craft & Provenance */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-heritage-terracotta/60 group-hover:scale-125 transition-transform" />
                        <div>
                          <div className="font-semibold text-white group-hover:text-heritage-terracotta-light transition-colors flex items-center gap-2">
                            <span>{craft.name}</span>
                            {craft.heritage.giTagged && (
                              <span
                                title="GI Authenticated"
                                className="inline-flex items-center text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              >
                                GI
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400">
                            {craft.region}, {craft.state}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-stone-300">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono">
                        {craft.category}
                      </span>
                    </td>

                    {/* Artisans Count */}
                    <td className="py-3 px-3 font-mono text-stone-200 num-display font-medium">
                      {craft.activeArtisansCount}
                    </td>

                    {/* Demand Surge */}
                    <td className="py-3 px-3 font-mono font-semibold text-emerald-400 num-display">
                      +{craft.metrics.demandGrowthPercent}%
                    </td>

                    {/* Views & Saves */}
                    <td className="py-3 px-3 text-stone-400 font-mono text-[11px]">
                      {(craft.metrics.views / 1000).toFixed(1)}K views
                    </td>

                    {/* Health Status */}
                    <td className="py-3 px-3">
                      <StatusBadge status={craft.healthStatus} size="sm" />
                    </td>

                    {/* Inspect Link */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCraft(craft);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] text-heritage-terracotta-light hover:text-white transition-colors"
                      >
                        <span>Telemetry</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/[0.06] text-xs text-stone-400">
          <span>
            Showing <strong className="text-white">{sorted.length}</strong> of{" "}
            <strong className="text-white">{crafts.length}</strong> craft entities
          </span>
          <span className="font-mono text-[11px] text-stone-400 hidden sm:inline">
            Click any row to inspect deep lineage & telemetry
          </span>
        </div>
      </GlassCard>

      {/* Craft Detail Modal */}
      <CraftDetailModal craft={selectedCraft} onClose={() => setSelectedCraft(null)} />
    </>
  );
};
