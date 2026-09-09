"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Users, TrendingUp, ShieldAlert } from "lucide-react";

export interface RegionCluster {
  id: string;
  name: string;
  states: string;
  artisanCount: number;
  demandIndex: number;
  topCrafts: string[];
  status: "Thriving" | "Stable" | "Vulnerable" | "Endangered";
  coordinates: { x: number; y: number };
  growthPercent: number;
}

const REGION_CLUSTERS: RegionCluster[] = [
  {
    id: "north",
    name: "Northern Himalayan & Gangetic Belt",
    states: "Jammu & Kashmir, Himachal, Punjab, UP",
    artisanCount: 2450,
    demandIndex: 89,
    topCrafts: ["Pashmina Weaving", "Varanasi Silk Brocade", "Walnut Carving"],
    status: "Stable",
    coordinates: { x: 130, y: 70 },
    growthPercent: 19.4,
  },
  {
    id: "west",
    name: "Western Desert & Textile Corridors",
    states: "Rajasthan, Gujarat",
    artisanCount: 3120,
    demandIndex: 92,
    topCrafts: ["Blue Pottery", "Ajrakh Block Print", "Rogan Art"],
    status: "Thriving",
    coordinates: { x: 80, y: 160 },
    growthPercent: 22.8,
  },
  {
    id: "central",
    name: "Central Tribal Metallurgy Belt",
    states: "Chhattisgarh, Madhya Pradesh",
    artisanCount: 1182,
    demandIndex: 81,
    topCrafts: ["Bastar Dokra Casting", "Gond Folk Murals", "Chanderi Weaving"],
    status: "Vulnerable",
    coordinates: { x: 155, y: 200 },
    growthPercent: 27.1,
  },
  {
    id: "east",
    name: "Eastern Riverine Folk Painting Corridor",
    states: "Bihar, Odisha, West Bengal",
    artisanCount: 3840,
    demandIndex: 96,
    topCrafts: ["Madhubani Folk Art", "Pattachitra Scroll", "Sikki Grass Craft"],
    status: "Thriving",
    coordinates: { x: 220, y: 175 },
    growthPercent: 34.2,
  },
  {
    id: "northeast",
    name: "North-Eastern Cane & Indigenous Handloom",
    states: "Assam, Nagaland, Manipur, Meghalaya",
    artisanCount: 860,
    demandIndex: 78,
    topCrafts: ["Muga Silk Weaving", "Bamboo & Cane Craft", "Naga Tribal Weaves"],
    status: "Stable",
    coordinates: { x: 280, y: 140 },
    growthPercent: 15.2,
  },
  {
    id: "south",
    name: "Southern Peninsula Wood & Filigree Corridor",
    states: "Karnataka, Tamil Nadu, Andhra, Kerala",
    artisanCount: 1890,
    demandIndex: 85,
    topCrafts: ["Channapatna Eco Lacquerware", "Toda Embroidery", "Thanjavur Art"],
    status: "Vulnerable",
    coordinates: { x: 125, y: 290 },
    growthPercent: 16.5,
  },
];

export const IndiaMap: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<RegionCluster>(REGION_CLUSTERS[3]); // Default to East (Madhubani)
  const [hoveredCluster, setHoveredCluster] = useState<RegionCluster | null>(null);

  const active = hoveredCluster || selectedCluster;

  return (
    <GlassCard variant="default" className="p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Geographic Intelligence & Regional Clusters
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-heritage-terracotta/20 text-heritage-terracotta-light border border-heritage-terracotta/30">
              PAN-INDIA GEO-INDEX
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Real-time concentration, demand vectors, and vulnerability mapping across 6 national artisan corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Thriving
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Stable
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Vulnerable
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Visual Map Canvas */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-4 min-h-[360px] bg-obsidian-900/60 rounded-xl border border-white/[0.05]">
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

          {/* SVG Map Schematics */}
          <svg
            viewBox="0 0 340 370"
            className="w-full max-w-[360px] h-auto select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d9653b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d4a359" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle Stylized India Contour Silhouette Path */}
            <path
              d="M 130 30 
                 C 145 35, 160 55, 170 75 
                 C 185 85, 220 95, 250 110 
                 C 275 115, 305 130, 310 150 
                 C 300 165, 270 165, 250 170 
                 C 240 185, 230 210, 210 225 
                 C 190 250, 165 300, 140 345 
                 C 130 355, 125 355, 120 340 
                 C 105 300, 95 260, 90 230 
                 C 75 220, 50 195, 45 170 
                 C 45 140, 70 120, 95 105 
                 C 110 85, 120 50, 130 30 Z"
              fill="rgba(18, 21, 32, 0.65)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Connecting Corridor Flow Vectors */}
            <path
              d="M 130 70 Q 155 130 80 160 T 155 200 T 220 175 T 125 290"
              fill="none"
              stroke="url(#corridorGradient)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-pulse-subtle"
            />

            {/* Cluster Nodes */}
            {REGION_CLUSTERS.map((c) => {
              const isSelected = selectedCluster.id === c.id;
              const isHovered = hoveredCluster?.id === c.id;
              const color =
                c.status === "Thriving"
                  ? "#10b981"
                  : c.status === "Stable"
                  ? "#38bdf8"
                  : "#f59e0b";

              return (
                <g
                  key={c.id}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedCluster(c)}
                  onMouseEnter={() => setHoveredCluster(c)}
                  onMouseLeave={() => setHoveredCluster(null)}
                >
                  {/* Outer pulse wave for selected/hovered */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={c.coordinates.x}
                      cy={c.coordinates.y}
                      r="18"
                      fill={color}
                      opacity="0.2"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer halo */}
                  <circle
                    cx={c.coordinates.x}
                    cy={c.coordinates.y}
                    r={isSelected || isHovered ? "14" : "10"}
                    fill={color}
                    opacity={isSelected ? "0.35" : "0.15"}
                    stroke={color}
                    strokeWidth={isSelected ? "2" : "1"}
                  />

                  {/* Core Node */}
                  <circle
                    cx={c.coordinates.x}
                    cy={c.coordinates.y}
                    r={isSelected ? "6" : "4.5"}
                    fill={color}
                  />

                  {/* Cluster Label */}
                  <text
                    x={c.coordinates.x + 12}
                    y={c.coordinates.y + 4}
                    fill={isSelected || isHovered ? "#ffffff" : "#a8a29e"}
                    fontSize="9.5"
                    fontWeight={isSelected ? "700" : "500"}
                    fontFamily="sans-serif"
                    className="select-none pointer-events-none drop-shadow"
                  >
                    {c.name.split(" ")[0]} ({c.demandIndex})
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-4 text-[10px] text-stone-400 font-mono">
            Interactive Node: Click cluster to inspect telemetry
          </div>
        </div>

        {/* Selected Cluster Deep-Dive Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-obsidian-900/80 rounded-xl border border-white/[0.08] p-5">
          <div>
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-heritage-terracotta-light">
                  Active Corridor
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {active.name}
                </h4>
                <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  {active.states}
                </p>
              </div>
              <StatusBadge status={active.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-lg bg-obsidian-850/80 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px] mb-1">
                  <Users className="w-3 h-3" />
                  <span>Verified Artisans</span>
                </div>
                <div className="text-xl font-bold text-white num-display">
                  {active.artisanCount.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">
                  +{active.growthPercent}% YoY Guild Growth
                </div>
              </div>

              <div className="p-3 rounded-lg bg-obsidian-850/80 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px] mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Demand Velocity</span>
                </div>
                <div className="text-xl font-bold text-heritage-gold num-display">
                  {active.demandIndex}/100
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  High Metro Intent Index
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block mb-2">
                Predominant Living Crafts
              </span>
              <div className="space-y-1.5">
                {active.topCrafts.map((craft, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-md bg-white/[0.03] border border-white/[0.04]"
                  >
                    <span className="text-stone-200">{craft}</span>
                    <span className="text-[10px] text-stone-400 font-mono">GI Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-stone-400">
              Supply Chain Resilience: <span className="text-stone-200 font-medium">94.2%</span>
            </span>
            <button
              onClick={() => setSelectedCluster(active)}
              className="text-xs font-semibold text-heritage-terracotta-light hover:text-white transition-colors"
            >
              Corridor Telemetry →
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
