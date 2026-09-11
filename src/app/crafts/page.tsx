"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useCrafts } from "@/hooks/useCrafts";
import { CRAFT_CATEGORIES } from "@/lib/constants";
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
    >
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#B8794A]/12">
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
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-bold cursor-pointer ${
                  isActive
                    ? "bg-[#B8794A] text-white shadow-sm"
                    : "bg-[#EFE7DA]/70 text-[#6E5D53] hover:bg-[#EFE7DA] hover:text-[#2C221E]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 text-[#B8794A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search crafts, regions..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#B8794A]/18 text-[#2C221E] text-xs placeholder-[#9A887C] focus:outline-none focus:border-[#B8794A] w-full sm:w-56 font-medium"
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
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#B8794A]/12">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#B8794A] font-bold">
                      {craft.category}
                    </span>
                    {craft.heritage.giTagged && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-800 border border-sky-500/30 font-bold">
                        <Award className="w-2.5 h-2.5" />
                        GI TAGGED
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#2C221E] group-hover:text-[#B8794A] transition-colors mt-0.5">
                    {craft.name}
                  </h3>
                  <p className="text-xs text-[#6E5D53] flex items-center gap-1 mt-0.5 font-mono font-medium">
                    <MapPin className="w-3 h-3 text-[#B8794A]" />
                    {craft.region}, {craft.state}
                  </p>
                </div>
                <StatusBadge status={craft.healthStatus} />
              </div>

              <p className="text-xs text-[#6E5D53] font-medium mt-3 leading-relaxed line-clamp-2">
                {craft.description}
              </p>

              {/* Traditional Materials */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <Layers className="w-3 h-3 text-[#B8794A] shrink-0" />
                {craft.heritage.traditionalMaterials.slice(0, 3).map((mat, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#EFE7DA] text-[#6E5D53] font-mono font-semibold"
                  >
                    {mat}
                  </span>
                ))}
              </div>

              {/* Footer Stats */}
              <div className="mt-4 pt-3 border-t border-[#B8794A]/12 flex items-center justify-between text-xs text-[#6E5D53] font-medium">
                <span>
                  Artisans: <strong className="text-[#2C221E] font-mono">{craft.activeArtisansCount}</strong>
                </span>
                <span className="text-emerald-800 font-mono font-bold">
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
