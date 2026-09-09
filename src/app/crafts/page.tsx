"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useCrafts } from "@/hooks/useCrafts";
import { CRAFT_CATEGORIES, CRAFT_HEALTH_STATUSES } from "@/lib/constants";
import { StatusBadge } from "@/components/common/StatusBadge";
import { GlassCard } from "@/components/common/GlassCard";
import { CraftDetailModal } from "@/components/dashboard/CraftDetailModal";
import { Craft } from "@/types/craft";
import { Loading } from "@/components/common/Loading";
import { Search, MapPin, Award, Layers, Plus } from "lucide-react";

export default function CraftsPage() {
  const { crafts, filters, setFilters, loading } = useCrafts();
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);

  return (
    <PageContainer
      title="Craft Intelligence & GI Registry"
      description="Comprehensive taxonomy and telemetry for India's living handicrafts, Geographical Indication (GI) certifications, and preservation health."
      badge="142 REGISTERED ENTITIES"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Register New GI Craft</span>
        </button>
      }
    >
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {CRAFT_CATEGORIES.map((cat) => {
            const isActive =
              (!filters.category && cat === "All Categories") || filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  setFilters({
                    ...filters,
                    category: cat === "All Categories" ? undefined : cat,
                  })
                }
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                  isActive
                    ? "bg-heritage-terracotta text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-stone-300 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search crafts, regions..."
            className="pl-8 pr-3 py-1.5 rounded-lg bg-obsidian-900 border border-white/[0.08] text-white text-xs placeholder-stone-400 focus:outline-none focus:border-heritage-terracotta/50 w-full sm:w-56"
          />
        </div>
      </div>

      {loading ? (
        <Loading type="cards" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {crafts.map((craft) => (
            <GlassCard
              key={craft.id}
              variant="interactive"
              className="p-6 cursor-pointer group"
              onClick={() => setSelectedCraft(craft)}
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-heritage-terracotta-light">
                      {craft.category}
                    </span>
                    {craft.heritage.giTagged && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        <Award className="w-2.5 h-2.5" />
                        GI TAGGED
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-heritage-terracotta-light transition-colors mt-0.5">
                    {craft.name}
                  </h3>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5 font-mono">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {craft.region}, {craft.state}
                  </p>
                </div>
                <StatusBadge status={craft.healthStatus} />
              </div>

              <p className="text-xs text-stone-300 mt-3 leading-relaxed line-clamp-2">
                {craft.description}
              </p>

              {/* Traditional Materials */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <Layers className="w-3 h-3 text-stone-400 shrink-0" />
                {craft.heritage.traditionalMaterials.slice(0, 3).map((mat, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-stone-300 font-mono"
                  >
                    {mat}
                  </span>
                ))}
              </div>

              {/* Footer Stats */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-stone-400">
                <span>
                  Artisans: <strong className="text-white font-mono">{craft.activeArtisansCount}</strong>
                </span>
                <span className="text-emerald-400 font-mono font-semibold">
                  +{craft.metrics.demandGrowthPercent}% Demand Velocity
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Craft Detail Modal */}
      <CraftDetailModal craft={selectedCraft} onClose={() => setSelectedCraft(null)} />
    </PageContainer>
  );
}
