"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockArtisans } from "@/data/mock/artisans";
import { GlassCard } from "@/components/common/GlassCard";
import {
  Award,
  MapPin,
  Star,
  CheckCircle2,
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
      badge="12,482 VERIFIED ARTISANS"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#B8794A] to-[#965C34] text-white text-xs font-bold hover:brightness-105 shadow-md transition-all active:scale-95 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard Artisan Guild</span>
        </button>
      }
    >
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#B8794A]/12">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAwardFilter(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !awardFilter
                ? "bg-[#B8794A] text-white shadow-sm"
                : "bg-[#EFE7DA]/70 text-[#6E5D53] hover:bg-[#EFE7DA] hover:text-[#2C221E]"
            }`}
          >
            All Masters
          </button>
          <button
            onClick={() => setAwardFilter(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              awardFilter
                ? "bg-[#B8794A] text-white shadow-sm"
                : "bg-[#EFE7DA]/70 text-[#6E5D53] hover:bg-[#EFE7DA] hover:text-[#2C221E]"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#B8794A]" />
            <span>National Awardees Only</span>
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#B8794A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search master craftspeople..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#B8794A]/18 text-[#2C221E] text-xs placeholder-[#9A887C] focus:outline-none focus:border-[#B8794A] w-full sm:w-60 font-medium"
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
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#B8794A]/12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B8794A] to-[#C89B6D] flex items-center justify-center font-bold text-white text-base shadow-sm shrink-0">
                  {artisan.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2C221E] group-hover:text-[#B8794A] transition-colors flex items-center gap-1.5">
                    <span>{artisan.name}</span>
                    {artisan.verified && (
                      <span title="Verified Master">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#B8794A] font-bold">
                    {artisan.primaryCraftName}
                  </p>
                </div>
              </div>
            </div>

            {artisan.awardTitle && (
              <div className="my-3 p-2 rounded-xl bg-[#C89B6D]/20 border border-[#C89B6D]/35 text-[#8A5A2B] text-[11px] flex items-center gap-1.5 font-bold">
                <Award className="w-3.5 h-3.5 shrink-0 text-[#B8794A]" />
                <span className="truncate">{artisan.awardTitle}</span>
              </div>
            )}

            <p className="text-xs text-[#6E5D53] font-medium mt-2 leading-relaxed line-clamp-2">
              {artisan.bio}
            </p>

            <div className="mt-3 text-xs text-[#6E5D53] space-y-1 font-medium">
              <div className="flex items-center gap-1.5 font-mono">
                <MapPin className="w-3 h-3 text-[#B8794A] shrink-0" />
                <span>
                  {artisan.location.village}, {artisan.location.district}, {artisan.location.state}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3 h-3 text-[#B8794A] shrink-0" />
                <span>{artisan.yearsOfExperience} Years of Hereditary Practice</span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="mt-4 pt-3 border-t border-[#B8794A]/12 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-[#F6F1E8] border border-[#B8794A]/12">
                <span className="text-[10px] text-[#9A887C] font-mono font-bold block">Products</span>
                <span className="font-black text-[#2C221E] num-display">{artisan.metrics.totalProducts}</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F6F1E8] border border-[#B8794A]/12">
                <span className="text-[10px] text-[#9A887C] font-mono font-bold block">Orders</span>
                <span className="font-black text-[#2C221E] num-display">{artisan.metrics.completedOrders}</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F6F1E8] border border-[#B8794A]/12">
                <span className="text-[10px] text-[#9A887C] font-mono font-bold block">Rating</span>
                <span className="font-black text-[#B8794A] flex items-center justify-center gap-0.5 num-display">
                  <Star className="w-3 h-3 fill-[#B8794A] text-[#B8794A]" />
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
