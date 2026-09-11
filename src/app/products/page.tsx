"use client";

import React, { useState, useMemo } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockProducts } from "@/data/mock/products";
import { GlassCard } from "@/components/common/GlassCard";
import { FilterDropdown } from "@/components/common/FilterDropdown";
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
  X,
  SlidersHorizontal,
  MapPin,
  CheckCircle2
} from "lucide-react";

// Helper for Region Mapping
const getRegion = (state: string) => {
  const regions: Record<string, string[]> = {
    Northern: ["Jammu & Kashmir", "Himachal Pradesh", "Punjab", "Haryana", "Delhi", "Uttarakhand", "Uttar Pradesh", "Chandigarh"],
    Western: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"],
    Central: ["Madhya Pradesh", "Chhattisgarh"],
    Eastern: ["Bihar", "Jharkhand", "West Bengal", "Odisha"],
    Southern: ["Andhra Pradesh", "Telangana", "Karnataka", "Kerala", "Tamil Nadu"],
    "North-Eastern": ["Assam", "Sikkim", "Nagaland", "Meghalaya", "Manipur", "Mizoram", "Tripura", "Arunachal Pradesh"],
  };
  for (const [region, states] of Object.entries(regions)) {
    if (states.includes(state)) return region;
  }
  return "Unknown";
};

// Deterministic mock for missing fields
const isGIAuthenticated = (id: string) => {
  const num = parseInt(id.replace(/\D/g, '')) || 0;
  return num % 3 !== 0; // Most are authenticated
};

const getProvenanceStatus = (id: string) => {
  const num = parseInt(id.replace(/\D/g, '')) || 0;
  if (num % 5 === 0) return "Pending";
  if (num % 4 === 0) return "Not Verified";
  return "Verified";
};

const getStockStatusLabel = (stock: number) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
};

const getDemandLevel = (views: number) => {
  if (views >= 3000) return "Very High";
  if (views >= 1500) return "High";
  if (views >= 500) return "Medium";
  return "Low";
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [craftFilter, setCraftFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [giFilter, setGiFilter] = useState("All");
  const [provenanceFilter, setProvenanceFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All Prices");
  const [demandFilter, setDemandFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Recommended");
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);

  // Dynamic Options
  const categories = useMemo(() => Array.from(new Set(mockProducts.map((p) => p.category))).sort(), []);
  const crafts = useMemo(() => Array.from(new Set(mockProducts.map((p) => p.craftName))).sort(), []);
  const states = useMemo(() => Array.from(new Set(mockProducts.map((p) => p.provenance.originState))).sort(), []);

  // Filtering Logic
  const filtered = useMemo(() => {
    return mockProducts.filter((p) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(q) ||
          p.craftName.toLowerCase().includes(q) ||
          p.artisanName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.provenance.rawMaterials.some(m => m.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Category
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;

      // Craft
      if (craftFilter !== "All" && p.craftName !== craftFilter) return false;

      // State
      if (stateFilter !== "All" && p.provenance.originState !== stateFilter) return false;

      // Region
      if (regionFilter !== "All" && getRegion(p.provenance.originState) !== regionFilter) return false;

      // Stock
      if (stockFilter !== "All" && getStockStatusLabel(p.stock) !== stockFilter) return false;

      // GI
      const giAuth = isGIAuthenticated(p.id);
      if (giFilter === "GI Authenticated" && !giAuth) return false;
      if (giFilter === "Not GI Authenticated" && giAuth) return false;

      // Provenance
      if (provenanceFilter !== "All" && getProvenanceStatus(p.id) !== provenanceFilter) return false;

      // Price
      if (priceFilter !== "All Prices") {
        const pr = p.price;
        if (priceFilter === "Under ₹2,500" && pr >= 2500) return false;
        if (priceFilter === "₹2,500–₹5,000" && (pr < 2500 || pr >= 5000)) return false;
        if (priceFilter === "₹5,000–₹10,000" && (pr < 5000 || pr >= 10000)) return false;
        if (priceFilter === "₹10,000–₹25,000" && (pr < 10000 || pr >= 25000)) return false;
        if (priceFilter === "Above ₹25,000" && pr < 25000) return false;
      }

      // Demand
      if (demandFilter !== "All" && getDemandLevel(p.engagement.views) !== demandFilter) return false;

      return true;
    });
  }, [search, categoryFilter, craftFilter, regionFilter, stateFilter, stockFilter, giFilter, provenanceFilter, priceFilter, demandFilter]);

  // Sorting Logic
  const sortedAndFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High": return a.price - b.price;
        case "Price: High to Low": return b.price - a.price;
        case "Most Viewed": return b.engagement.views - a.engagement.views;
        case "Most Liked": return b.engagement.likes - a.engagement.likes;
        case "Most Saved": return b.engagement.saves - a.engagement.saves;
        case "Most Ordered": return b.engagement.likes - a.engagement.likes; // Proxy for orders if missing
        case "Highest Demand": return b.engagement.views - a.engagement.views;
        case "Highest Rated": return b.engagement.likes - a.engagement.likes; // Proxy for rating
        case "Recommended":
        default:
          return 0;
      }
    });
  }, [filtered, sortOption]);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setCraftFilter("All");
    setRegionFilter("All");
    setStateFilter("All");
    setStockFilter("All");
    setGiFilter("All");
    setProvenanceFilter("All");
    setPriceFilter("All Prices");
    setDemandFilter("All");
  };

  const activeFiltersCount = [categoryFilter, craftFilter, regionFilter, stateFilter, stockFilter, giFilter, provenanceFilter, demandFilter].filter(f => f !== "All").length + (priceFilter !== "All Prices" ? 1 : 0) + (search ? 1 : 0);

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
      <div className="flex flex-col gap-4 pb-4 border-b border-[#B8794A]/14">
        
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 text-earth-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, materials..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#FFFDF8]/90 border border-[#B8794A]/20 text-earth-dark text-xs placeholder-earth-muted/60 focus:outline-none focus:border-heritage-terracotta focus:ring-1 focus:ring-heritage-terracotta/30 shadow-inner-light w-full sm:w-60 font-medium"
              />
            </div>
            
            <FilterDropdown value={categoryFilter} onChange={setCategoryFilter} options={[{label: "All Categories", value: "All"}, ...categories.map(c => ({label: c, value: c}))]} />
            <FilterDropdown value={craftFilter} onChange={setCraftFilter} options={[{label: "All Crafts", value: "All"}, ...crafts.map(c => ({label: c, value: c}))]} />
            
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#EFE7DA]/70 text-[#6E5D53] hover:bg-[#EFE7DA] hover:text-[#2C221E] border border-transparent cursor-pointer shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>More Filters {activeFiltersCount > 2 ? `(${activeFiltersCount - (search?1:0) - (categoryFilter!=="All"?1:0) - (craftFilter!=="All"?1:0)})` : ""}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <FilterDropdown 
                value={sortOption} 
                onChange={setSortOption} 
                options={[
                  {label: "Recommended", value: "Recommended"},
                  {label: "Price: Low to High", value: "Price: Low to High"},
                  {label: "Price: High to Low", value: "Price: High to Low"},
                  {label: "Most Viewed", value: "Most Viewed"},
                  {label: "Most Liked", value: "Most Liked"},
                  {label: "Most Saved", value: "Most Saved"},
                  {label: "Highest Demand", value: "Highest Demand"}
                ]} 
              />
          </div>
        </div>

        {/* More Filters Popover / Expand */}
        {showMoreFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 bg-[#F8F5F0] rounded-xl border border-[#B8794A]/10 animate-in slide-in-from-top-2">
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">State</label>
              <FilterDropdown value={stateFilter} onChange={setStateFilter} options={[{label: "All States", value: "All"}, ...states.map(s => ({label: s, value: s}))]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Region</label>
              <FilterDropdown value={regionFilter} onChange={setRegionFilter} options={[{label: "All Regions", value: "All"}, {label: "Northern", value: "Northern"}, {label: "Western", value: "Western"}, {label: "Central", value: "Central"}, {label: "Eastern", value: "Eastern"}, {label: "Southern", value: "Southern"}, {label: "North-Eastern", value: "North-Eastern"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Stock Status</label>
              <FilterDropdown value={stockFilter} onChange={setStockFilter} options={[{label: "All", value: "All"}, {label: "In Stock", value: "In Stock"}, {label: "Low Stock", value: "Low Stock"}, {label: "Out of Stock", value: "Out of Stock"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Price Range</label>
              <FilterDropdown value={priceFilter} onChange={setPriceFilter} options={[{label: "All Prices", value: "All Prices"}, {label: "Under ₹2,500", value: "Under ₹2,500"}, {label: "₹2,500–₹5,000", value: "₹2,500–₹5,000"}, {label: "₹5,000–₹10,000", value: "₹5,000–₹10,000"}, {label: "₹10,000–₹25,000", value: "₹10,000–₹25,000"}, {label: "Above ₹25,000", value: "Above ₹25,000"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Demand Level</label>
              <FilterDropdown value={demandFilter} onChange={setDemandFilter} options={[{label: "All", value: "All"}, {label: "Very High", value: "Very High"}, {label: "High", value: "High"}, {label: "Medium", value: "Medium"}, {label: "Low", value: "Low"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">GI Verification</label>
              <FilterDropdown value={giFilter} onChange={setGiFilter} options={[{label: "All", value: "All"}, {label: "GI Authenticated", value: "GI Authenticated"}, {label: "Not GI Authenticated", value: "Not GI Authenticated"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Provenance</label>
              <FilterDropdown value={provenanceFilter} onChange={setProvenanceFilter} options={[{label: "All", value: "All"}, {label: "Verified", value: "Verified"}, {label: "Pending", value: "Pending"}, {label: "Not Verified", value: "Not Verified"}]} />
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-earth-muted mr-1">Showing {sortedAndFiltered.length} of {mockProducts.length} items</span>
            
            {categoryFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {categoryFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setCategoryFilter("All")} />
              </span>
            )}
            {craftFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {craftFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setCraftFilter("All")} />
              </span>
            )}
            {stateFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {stateFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setStateFilter("All")} />
              </span>
            )}
            {regionFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {regionFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setRegionFilter("All")} />
              </span>
            )}
            {stockFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {stockFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setStockFilter("All")} />
              </span>
            )}
            {priceFilter !== "All Prices" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {priceFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setPriceFilter("All Prices")} />
              </span>
            )}
            {demandFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                Demand: {demandFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setDemandFilter("All")} />
              </span>
            )}
            {giFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {giFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setGiFilter("All")} />
              </span>
            )}
            {provenanceFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                Provenance: {provenanceFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setProvenanceFilter("All")} />
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                "{search}" <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setSearch("")} />
              </span>
            )}

            <button onClick={clearFilters} className="text-[10px] font-bold text-earth-muted hover:text-earth-dark underline ml-1 cursor-pointer">
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* Products Grid */}
      {sortedAndFiltered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[#EFE7DA] rounded-full flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-[#9A887C]" />
          </div>
          <h3 className="text-lg font-bold text-[#2C221E] mb-1">No products found</h3>
          <p className="text-sm text-[#6E5D53] max-w-md mb-6">
            We couldn't find any products matching your current filter criteria. Try adjusting your filters.
          </p>
          <button onClick={clearFilters} className="px-4 py-2 bg-[#B8794A] text-white rounded-lg text-xs font-bold hover:bg-[#965C34] transition-colors cursor-pointer">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedAndFiltered.map((product, idx) => (
            <GlassCard
              key={product.id}
              variant="interactive"
              className="relative group overflow-hidden flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image Header */}
              <div className="h-40 w-full relative shrink-0 bg-[#EFE7DA]">
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
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold backdrop-blur-md shadow-sm border ${
                    product.stock > 5 ? "bg-[#DCEDE3]/90 text-heritage-green border-heritage-green/30" : 
                    product.stock > 0 ? "bg-[#FDF3E1]/90 text-[#B8794A] border-[#B8794A]/30" : 
                    "bg-[#FDE1E1]/90 text-red-600 border-red-600/30"
                  }`}>
                    {getStockStatusLabel(product.stock)} ({product.stock})
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
                    {isGIAuthenticated(product.id) && (
                      <span className="flex items-center gap-1 text-heritage-green font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        GI Authenticated
                      </span>
                    )}
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
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-[#FCF8F0] w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#B8794A]/20 flex justify-between items-start bg-white/50">
              <div>
                <h2 className="text-xl font-bold text-[#2C221E]">{selectedProduct.title}</h2>
                <p className="text-sm font-bold text-[#B8794A] mt-1">{selectedProduct.craftName}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-1.5 bg-[#EFE7DA] text-earth-dark rounded-full hover:bg-[#E3D6C5] transition-colors cursor-pointer shrink-0 ml-4">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Artisan</p>
                  <p className="text-sm text-earth-dark font-medium">{selectedProduct.artisanName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Location</p>
                  <p className="text-sm text-earth-dark font-medium flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#B8794A]" /> {selectedProduct.provenance.originState}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Price</p>
                  <p className="text-sm text-earth-dark font-black">{formatCurrencyINR(selectedProduct.price)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Stock Status</p>
                  <p className="text-sm text-earth-dark font-medium">{getStockStatusLabel(selectedProduct.stock)} ({selectedProduct.stock} available)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#B8794A]/10 space-y-3">
                <h4 className="text-xs font-bold text-earth-dark">Provenance Details</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-earth-muted">Production Time:</span>
                    <p className="font-medium text-earth-dark">{selectedProduct.provenance.handcraftingDurationDays} Days</p>
                  </div>
                  <div>
                    <span className="text-earth-muted">GI Status:</span>
                    <p className="font-medium flex items-center gap-1">
                      {isGIAuthenticated(selectedProduct.id) ? <><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Authenticated</> : "Not Authenticated"}
                    </p>
                  </div>
                  <div>
                    <span className="text-earth-muted">Verification:</span>
                    <p className="font-medium text-earth-dark flex items-center gap-1">
                      {getProvenanceStatus(selectedProduct.id) === "Verified" && <CheckCircle2 className="w-3.5 h-3.5 text-[#B8794A]" />}
                      {getProvenanceStatus(selectedProduct.id)}
                    </p>
                  </div>
                  <div>
                    <span className="text-earth-muted">Demand Level:</span>
                    <p className="font-medium text-earth-dark">{getDemandLevel(selectedProduct.engagement.views)}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-earth-muted/10">
                  <span className="text-earth-muted text-xs mb-1 block">Materials Used:</span>
                  <div className="flex flex-wrap gap-1.5">
                     {selectedProduct.provenance.rawMaterials.map((mat, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-[#F6F1E8] text-earth-dark rounded border border-[#B8794A]/10">{mat}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-[#F6F1E8] border border-[#B8794A]/10 flex justify-between text-center">
                 <div>
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1">Views</p>
                  <p className="text-lg font-black text-earth-dark flex justify-center items-center gap-1.5"><Eye className="w-4 h-4 text-earth-muted" /> {selectedProduct.engagement.views}</p>
                 </div>
                 <div>
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1">Likes</p>
                  <p className="text-lg font-black text-earth-dark flex justify-center items-center gap-1.5"><Heart className="w-4 h-4 text-heritage-red" /> {selectedProduct.engagement.likes}</p>
                 </div>
                 <div>
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1">Saves</p>
                  <p className="text-lg font-black text-earth-dark flex justify-center items-center gap-1.5"><Bookmark className="w-4 h-4 text-heritage-gold" /> {selectedProduct.engagement.saves}</p>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </PageContainer>
  );
}

