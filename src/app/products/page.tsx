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
        {filtered.map((product, idx) => (
          <GlassCard
            key={product.id}
            variant="interactive"
            className="relative group overflow-hidden flex flex-col h-full"
          >
            {/* Image Header */}
            <div className="h-40 w-full relative shrink-0">
              <img
                src={
                  product.category === "PAINTING"
                    ? "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=800&auto=format&fit=crop"
                    : product.category === "METALWORK"
                    ? "https://images.unsplash.com/photo-1533558701576-23c65e0272fb?q=80&w=800&auto=format&fit=crop"
                    : product.category === "TEXTILES"
                    ? "https://images.unsplash.com/photo-1528318269466-69d9205561a7?q=80&w=800&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1528318269466-69d9205561a7?q=80&w=800&auto=format&fit=crop" // fallback
                }
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-heritage-terracotta font-bold bg-[#FFFDF8]/90 px-2.5 py-1 rounded-md border border-heritage-terracotta/20 shadow-sm backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta" />
                  {product.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#DCEDE3]/90 text-heritage-green border border-heritage-green/30 backdrop-blur-md shadow-sm">
                  In Stock ({product.stock})
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-white/30">
              <h3 className="text-sm font-bold text-earth-dark group-hover:text-heritage-terracotta transition-colors line-clamp-1">
                {product.title}
              </h3>
              
              <div className="mt-2 space-y-1 text-xs">
                <div className="text-earth-slate">
                  Craft: <strong className="text-earth-dark">{product.craftName}</strong>
                </div>
                <div className="text-earth-muted">
                  Master Artisan: <strong className="text-earth-dark">{product.artisanName}</strong>
                </div>
              </div>

              {/* Provenance Box */}
              <div className="mt-4 p-3 rounded-xl bg-heritage-bg/60 border border-heritage-border text-xs space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-earth-slate font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-heritage-gold" />
                    {product.provenance.handcraftingDurationDays} Days
                  </span>
                  <span className="flex items-center gap-1 text-heritage-green font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    GI Authenticated
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <Layers className="w-3.5 h-3.5 text-earth-muted shrink-0" />
                  {product.provenance.rawMaterials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/70 text-earth-slate border border-heritage-border/50 shadow-sm"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer to push footer to bottom if cards stretch */}
              <div className="flex-1"></div>

              {/* Price & Engagement Footer */}
              <div className="mt-5 pt-4 border-t border-heritage-border/60 flex items-end justify-between">
                <div>
                  <span className="text-[9px] text-earth-muted font-mono uppercase font-bold block mb-0.5">
                    Fair-Trade Price
                  </span>
                  <span className="text-lg font-black text-earth-dark num-display">
                    {formatCurrencyINR(product.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-earth-slate font-mono">
                  <span className="flex items-center gap-1" title="Views">
                    <Eye className="w-3.5 h-3.5 text-earth-muted" />
                    {product.engagement.views}
                  </span>
                  <span className="flex items-center gap-1" title="Likes">
                    <Heart className="w-3.5 h-3.5 text-heritage-red" />
                    {product.engagement.likes}
                  </span>
                  <span className="flex items-center gap-1" title="Saves">
                    <Bookmark className="w-3.5 h-3.5 text-heritage-gold" />
                    {product.engagement.saves}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
