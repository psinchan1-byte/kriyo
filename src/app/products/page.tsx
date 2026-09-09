"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockProducts } from "@/data/mock/products";
import { GlassCard } from "@/components/common/GlassCard";
import { formatCurrencyINR } from "@/lib/utils";
import {
  Package,
  Clock,
  Layers,
  Heart,
  Eye,
  Bookmark,
  Search,
  Plus,
  ShieldCheck,
} from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.craftName.toLowerCase().includes(q) ||
      p.artisanName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <PageContainer
      title="Product Catalog & Provenance Analytics"
      description="Handcrafted item inventory with verified natural material trace certifications, artisan attribution, and demand engagement telemetry."
      badge="48,920 CATALOG ITEMS"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Mint Provenance Certificate</span>
        </button>
      }
    >
      {/* Search Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#B8794A]/14">
        <div className="text-xs text-earth-muted">
          Showing <strong className="text-earth-dark">{filtered.length}</strong> catalog items with active cryptographic provenance
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-earth-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, materials..."
            className="pl-8 pr-3 py-1.5 rounded-lg bg-[#FFFDF8]/90 border border-[#B8794A]/20 text-earth-dark text-xs placeholder-earth-muted/60 focus:outline-none focus:border-heritage-terracotta focus:ring-1 focus:ring-heritage-terracotta/30 shadow-inner-light w-full sm:w-64"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <GlassCard
            key={product.id}
            variant="interactive"
            className="p-6 relative group"
          >
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#B8794A]/12">
              <div>
                <span className="text-[10px] font-mono uppercase text-heritage-terracotta font-semibold">
                  {product.category}
                </span>
                <h3 className="text-sm font-bold text-earth-dark group-hover:text-heritage-terracotta transition-colors mt-0.5">
                  {product.title}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 shrink-0">
                In Stock ({product.stock})
              </span>
            </div>

            <div className="my-3 space-y-1.5 text-xs">
              <div className="text-earth-slate">
                Craft: <strong className="text-earth-dark">{product.craftName}</strong>
              </div>
              <div className="text-earth-muted">
                Master Artisan: <strong className="text-earth-dark">{product.artisanName}</strong>
              </div>
            </div>

            {/* Provenance Box */}
            <div className="p-3 rounded-xl bg-heritage-sand/50 border border-[#B8794A]/14 text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-earth-slate font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-heritage-gold" />
                  Crafting: {product.provenance.handcraftingDurationDays} Days
                </span>
                <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  GI Authenticated
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <Layers className="w-3 h-3 text-earth-muted shrink-0" />
                {product.provenance.rawMaterials.map((mat, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFDF8] text-earth-slate border border-[#B8794A]/14"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Engagement Footer */}
            <div className="mt-4 pt-3 border-t border-[#B8794A]/12 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-earth-muted font-mono uppercase block">
                  Fair-Trade Price
                </span>
                <span className="text-lg font-bold text-earth-dark num-display">
                  {formatCurrencyINR(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-earth-slate font-mono">
                <span className="flex items-center gap-1" title="Views">
                  <Eye className="w-3.5 h-3.5 text-earth-muted" />
                  {product.engagement.views}
                </span>
                <span className="flex items-center gap-1" title="Likes">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  {product.engagement.likes}
                </span>
                <span className="flex items-center gap-1" title="Saves">
                  <Bookmark className="w-3.5 h-3.5 text-heritage-gold" />
                  {product.engagement.saves}
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
