"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockArtisans } from "@/data/mock/artisans";
import { GlassCard } from "@/components/common/GlassCard";
import {
  Users,
  Award,
  MapPin,
  Star,
  CheckCircle2,
  Package,
  Calendar,
  Search,
  Plus,
} from "lucide-react";

export default function ArtisansPage() {
  const [search, setSearch] = useState("");
  const [awardFilter, setAwardFilter] = useState(false);

  const filtered = mockArtisans.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.primaryCraftName.toLowerCase().includes(search.toLowerCase()) ||
      a.location.state.toLowerCase().includes(search.toLowerCase());
    const matchesAward = !awardFilter || a.nationalAwardee;
    return matchesSearch && matchesAward;
  });

  return (
    <PageContainer
      title="Artisan Intelligence & Master Guilds"
      description="Rosters of India's living master craftspeople, verified cooperative guilds, apprenticeship ratios, and direct fair-trade credentials."
      badge="12,482 VERIFIED KAARIGARS"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard Artisan Guild</span>
        </button>
      }
    >
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAwardFilter(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !awardFilter
                ? "bg-heritage-terracotta text-white font-semibold"
                : "bg-white/[0.04] text-stone-300 hover:text-white"
            }`}
          >
            All Masters
          </button>
          <button
            onClick={() => setAwardFilter(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              awardFilter
                ? "bg-heritage-terracotta text-white font-semibold"
                : "bg-white/[0.04] text-stone-300 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-heritage-gold" />
            <span>National Awardees Only</span>
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search master craftspeople..."
            className="pl-8 pr-3 py-1.5 rounded-lg bg-obsidian-900 border border-white/[0.08] text-white text-xs placeholder-stone-400 focus:outline-none focus:border-heritage-terracotta/50 w-full sm:w-60"
          />
        </div>
      </div>

      {/* Artisan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((artisan) => (
          <GlassCard
            key={artisan.id}
            variant="interactive"
            className="p-6 relative group"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-heritage-terracotta to-heritage-gold flex items-center justify-center font-bold text-white text-base shadow-glass shrink-0">
                  {artisan.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-heritage-terracotta-light transition-colors flex items-center gap-1.5">
                    <span>{artisan.name}</span>
                    {artisan.verified && (
                      <span title="Verified Master">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-heritage-gold font-medium">
                    {artisan.primaryCraftName}
                  </p>
                </div>
              </div>
            </div>

            {artisan.awardTitle && (
              <div className="my-3 p-2 rounded-lg bg-heritage-gold/10 border border-heritage-gold/25 text-heritage-gold text-[11px] flex items-center gap-1.5 font-medium">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{artisan.awardTitle}</span>
              </div>
            )}

            <p className="text-xs text-stone-300 mt-2 leading-relaxed line-clamp-2">
              {artisan.bio}
            </p>

            <div className="mt-3 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5 font-mono">
                <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                <span>
                  {artisan.location.village}, {artisan.location.district}, {artisan.location.state}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                <span>{artisan.yearsOfExperience} Years of Hereditary Practice</span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-1.5 rounded-lg bg-obsidian-900/80">
                <span className="text-[10px] text-stone-400 font-mono block">Products</span>
                <span className="font-bold text-white num-display">{artisan.metrics.totalProducts}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-obsidian-900/80">
                <span className="text-[10px] text-stone-400 font-mono block">Orders</span>
                <span className="font-bold text-white num-display">{artisan.metrics.completedOrders}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-obsidian-900/80">
                <span className="text-[10px] text-stone-400 font-mono block">Rating</span>
                <span className="font-bold text-heritage-gold flex items-center justify-center gap-0.5 num-display">
                  <Star className="w-3 h-3 fill-heritage-gold text-heritage-gold" />
                  {artisan.metrics.rating}
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
