"use client";

import React, { useState, useMemo } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockArtisans } from "@/data/mock/artisans";
import { GlassCard } from "@/components/common/GlassCard";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import {
  Award,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  Search,
  Plus,
  X,
  SlidersHorizontal,
  ChevronDown
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

// Helper for Risk Level
const getRiskLevel = (rating: number) => {
  if (rating >= 4.7) return "Healthy";
  if (rating >= 4.3) return "Watchlist";
  if (rating >= 4.0) return "Vulnerable";
  return "Critical";
};

// Helper for Sales Performance
const getSalesPerformance = (orders: number) => {
  if (orders >= 300) return "High Performing";
  if (orders >= 150) return "Growing";
  if (orders >= 50) return "Stable";
  return "Needs Attention";
};

export default function ArtisansPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [craftFilter, setCraftFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [salesFilter, setSalesFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Recommended");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  const [selectedArtisan, setSelectedArtisan] = useState<typeof mockArtisans[0] | null>(null);

  // Dynamic Options
  const states = useMemo(() => Array.from(new Set(mockArtisans.map((a) => a.location.state))).sort(), []);
  const crafts = useMemo(() => Array.from(new Set(mockArtisans.map((a) => a.primaryCraftName))).sort(), []);

  // Filtering Logic
  const filtered = useMemo(() => {
    return mockArtisans.filter((a) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          a.name.toLowerCase().includes(q) ||
          a.primaryCraftName.toLowerCase().includes(q) ||
          a.location.state.toLowerCase().includes(q) ||
          a.location.district.toLowerCase().includes(q) ||
          a.location.village.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      
      // State
      if (stateFilter !== "All" && a.location.state !== stateFilter) return false;
      
      // Region
      if (regionFilter !== "All" && getRegion(a.location.state) !== regionFilter) return false;
      
      // Craft
      if (craftFilter !== "All" && a.primaryCraftName !== craftFilter) return false;
      
      // Verification
      if (verificationFilter !== "All") {
        if (verificationFilter === "Verified" && !a.verified) return false;
        if (verificationFilter === "Unverified" && a.verified) return false;
      }
      
      // Risk Level
      if (riskFilter !== "All" && getRiskLevel(a.metrics.rating) !== riskFilter) return false;
      
      // Experience
      if (experienceFilter !== "All") {
        const exp = a.yearsOfExperience;
        if (experienceFilter === "0-5" && exp > 5) return false;
        if (experienceFilter === "6-10" && (exp < 6 || exp > 10)) return false;
        if (experienceFilter === "11-20" && (exp < 11 || exp > 20)) return false;
        if (experienceFilter === "20+" && exp <= 20) return false;
      }
      
      // Sales Performance
      if (salesFilter !== "All" && getSalesPerformance(a.metrics.completedOrders) !== salesFilter) return false;

      return true;
    });
  }, [search, stateFilter, regionFilter, craftFilter, verificationFilter, riskFilter, experienceFilter, salesFilter]);

  // Sorting Logic
  const sortedAndFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "Name A-Z": return a.name.localeCompare(b.name);
        case "Name Z-A": return b.name.localeCompare(a.name);
        case "Highest Sales": return b.metrics.completedOrders - a.metrics.completedOrders;
        case "Lowest Sales": return a.metrics.completedOrders - b.metrics.completedOrders;
        case "Highest Experience": return b.yearsOfExperience - a.yearsOfExperience;
        case "Highest Demand": return b.metrics.profileViews - a.metrics.profileViews; // Using profileViews as demand proxy
        case "Highest Risk": return a.metrics.rating - b.metrics.rating; // Lower rating = higher risk
        case "Recommended":
        default:
          return 0;
      }
    });
  }, [filtered, sortOption]);

  const clearFilters = () => {
    setSearch("");
    setStateFilter("All");
    setRegionFilter("All");
    setCraftFilter("All");
    setVerificationFilter("All");
    setRiskFilter("All");
    setExperienceFilter("All");
    setSalesFilter("All");
  };

  const activeFiltersCount = [stateFilter, regionFilter, craftFilter, verificationFilter, riskFilter, experienceFilter, salesFilter].filter(f => f !== "All").length + (search ? 1 : 0);

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
      {/* Search & Toolbar */}
      <div className="flex flex-col gap-4 pb-4 border-b border-[#B8794A]/12">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 text-[#B8794A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search artisans, crafts, locations..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#B8794A]/18 text-[#2C221E] text-xs placeholder-[#9A887C] focus:outline-none focus:border-[#B8794A] w-full sm:w-60 font-medium"
              />
            </div>
            
            <FilterDropdown value={stateFilter} onChange={setStateFilter} options={[{label: "All States", value: "All"}, ...states.map(s => ({label: s, value: s}))]} />
            <FilterDropdown value={craftFilter} onChange={setCraftFilter} options={[{label: "All Crafts", value: "All"}, ...crafts.map(c => ({label: c, value: c}))]} />
            
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#EFE7DA]/70 text-[#6E5D53] hover:bg-[#EFE7DA] hover:text-[#2C221E] border border-transparent cursor-pointer shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>More Filters {activeFiltersCount > 2 ? `(${activeFiltersCount - (search?1:0) - (stateFilter!=="All"?1:0) - (craftFilter!=="All"?1:0)})` : ""}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <FilterDropdown 
                value={sortOption} 
                onChange={setSortOption} 
                options={[
                  {label: "Recommended", value: "Recommended"},
                  {label: "Name A-Z", value: "Name A-Z"},
                  {label: "Name Z-A", value: "Name Z-A"},
                  {label: "Highest Sales", value: "Highest Sales"},
                  {label: "Lowest Sales", value: "Lowest Sales"},
                  {label: "Highest Experience", value: "Highest Experience"},
                  {label: "Highest Demand", value: "Highest Demand"},
                  {label: "Highest Risk", value: "Highest Risk"},
                ]} 
              />
          </div>
        </div>

        {/* More Filters Popover / Expand */}
        {showMoreFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 bg-[#F8F5F0] rounded-xl border border-[#B8794A]/10 animate-in slide-in-from-top-2">
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Region</label>
              <FilterDropdown value={regionFilter} onChange={setRegionFilter} options={[{label: "All Regions", value: "All"}, {label: "Northern", value: "Northern"}, {label: "Western", value: "Western"}, {label: "Central", value: "Central"}, {label: "Eastern", value: "Eastern"}, {label: "Southern", value: "Southern"}, {label: "North-Eastern", value: "North-Eastern"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Verification</label>
              <FilterDropdown value={verificationFilter} onChange={setVerificationFilter} options={[{label: "All", value: "All"}, {label: "Verified", value: "Verified"}, {label: "Unverified", value: "Unverified"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Risk Level</label>
              <FilterDropdown value={riskFilter} onChange={setRiskFilter} options={[{label: "All", value: "All"}, {label: "Healthy", value: "Healthy"}, {label: "Watchlist", value: "Watchlist"}, {label: "Vulnerable", value: "Vulnerable"}, {label: "Critical", value: "Critical"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Experience</label>
              <FilterDropdown value={experienceFilter} onChange={setExperienceFilter} options={[{label: "All Experience", value: "All"}, {label: "0-5 years", value: "0-5"}, {label: "6-10 years", value: "6-10"}, {label: "11-20 years", value: "11-20"}, {label: "20+ years", value: "20+"}]} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1.5 block">Sales</label>
              <FilterDropdown value={salesFilter} onChange={setSalesFilter} options={[{label: "All", value: "All"}, {label: "High Performing", value: "High Performing"}, {label: "Growing", value: "Growing"}, {label: "Stable", value: "Stable"}, {label: "Needs Attention", value: "Needs Attention"}]} />
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-earth-muted mr-1">Showing {sortedAndFiltered.length} of {mockArtisans.length} artisans</span>
            
            {stateFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {stateFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setStateFilter("All")} />
              </span>
            )}
            {craftFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {craftFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setCraftFilter("All")} />
              </span>
            )}
            {regionFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {regionFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setRegionFilter("All")} />
              </span>
            )}
            {verificationFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {verificationFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setVerificationFilter("All")} />
              </span>
            )}
            {riskFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                Risk: {riskFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setRiskFilter("All")} />
              </span>
            )}
            {experienceFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                Exp: {experienceFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setExperienceFilter("All")} />
              </span>
            )}
            {salesFilter !== "All" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#B8794A]/10 text-[#B8794A] text-[10px] font-bold border border-[#B8794A]/20">
                {salesFilter} <X className="w-3 h-3 cursor-pointer hover:text-earth-dark" onClick={() => setSalesFilter("All")} />
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

      {/* Artisan Cards Grid */}
      {sortedAndFiltered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[#EFE7DA] rounded-full flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-[#9A887C]" />
          </div>
          <h3 className="text-lg font-bold text-[#2C221E] mb-1">No artisans found</h3>
          <p className="text-sm text-[#6E5D53] max-w-md mb-6">
            We couldn't find any artisan matching your current filter criteria. Try adjusting your filters or search term.
          </p>
          <button onClick={clearFilters} className="px-4 py-2 bg-[#B8794A] text-white rounded-lg text-xs font-bold hover:bg-[#965C34] transition-colors cursor-pointer">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedAndFiltered.map((artisan) => (
            <GlassCard
              key={artisan.id}
              variant="interactive"
              className="p-6 relative group cursor-pointer"
              onClick={() => setSelectedArtisan(artisan)}
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
      )}

      {/* Modal */}
      {selectedArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedArtisan(null)}>
          <div className="bg-[#FCF8F0] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#B8794A]/20 flex justify-between items-start bg-white/50">
              <div>
                <h2 className="text-xl font-bold text-[#2C221E] flex items-center gap-2">
                  {selectedArtisan.name}
                  {selectedArtisan.verified && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </h2>
                <p className="text-sm font-bold text-[#B8794A] mt-1">{selectedArtisan.primaryCraftName}</p>
              </div>
              <button onClick={() => setSelectedArtisan(null)} className="p-1.5 bg-[#EFE7DA] text-earth-dark rounded-full hover:bg-[#E3D6C5] transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Location</p>
                  <p className="text-sm text-earth-dark font-medium flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#B8794A]" /> {selectedArtisan.location.state}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Experience</p>
                  <p className="text-sm text-earth-dark font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#B8794A]" /> {selectedArtisan.yearsOfExperience} years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Risk Level</p>
                  <p className="text-sm text-earth-dark font-medium">{getRiskLevel(selectedArtisan.metrics.rating)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider">Sales Perf.</p>
                  <p className="text-sm text-earth-dark font-medium">{getSalesPerformance(selectedArtisan.metrics.completedOrders)}</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white border border-[#B8794A]/10">
                <h4 className="text-xs font-bold text-earth-dark mb-2">Artisan Bio</h4>
                <p className="text-xs text-earth-slate leading-relaxed">{selectedArtisan.bio}</p>
              </div>
              
              <div className="mt-4 p-4 rounded-xl bg-[#F6F1E8] border border-[#B8794A]/10 flex justify-between text-center">
                 <div>
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1">Products</p>
                  <p className="text-lg font-black text-earth-dark">{selectedArtisan.metrics.totalProducts}</p>
                 </div>
                 <div>
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1">Orders</p>
                  <p className="text-lg font-black text-earth-dark">{selectedArtisan.metrics.completedOrders}</p>
                 </div>
                 <div>
                  <p className="text-[10px] font-bold text-earth-muted uppercase tracking-wider mb-1">Rating</p>
                  <p className="text-lg font-black text-[#B8794A] flex items-center gap-1"><Star className="w-4 h-4 fill-[#B8794A]" />{selectedArtisan.metrics.rating}</p>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </PageContainer>
  );
}

