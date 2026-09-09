"use client";

import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Users, TrendingUp, Compass, ShieldCheck } from "lucide-react";
import {
  REGION_CLUSTERS_DATA,
  RegionClusterData,
  INDIA_MAINLAND_OUTLINE,
  INDIA_STATE_BOUNDARIES,
  ANDAMAN_NICOBAR_ISLANDS,
  LAKSHADWEEP_ISLANDS,
} from "@/data/indiaGeoJson";

export const IndiaMap: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<RegionClusterData>(
    REGION_CLUSTERS_DATA[3] // Default to Eastern Corridor (Madhubani)
  );
  const [hoveredCluster, setHoveredCluster] = useState<RegionClusterData | null>(null);

  const active = hoveredCluster || selectedCluster;

  return (
    <GlassCard variant="default" className="p-6 relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#B96D43]/14">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B96D43]/12 border border-[#B96D43]/25 flex items-center justify-center text-[#B96D43]">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#49372A] tracking-tight">
              Geographic Intelligence & Regional Corridors
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#B96D43]/12 text-[#B96D43] border border-[#B96D43]/25 uppercase">
              PAN-INDIA GEO-INDEX
            </span>
          </div>
          <p className="text-xs text-[#6E5D53] mt-1 font-medium">
            Real-time cluster concentration, demand vectors, and vulnerability mapping across 6 national artisan corridors.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-[#6E5D53] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3F7A61]" /> Thriving
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6E5D53] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" /> Stable
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6E5D53] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B47C35]" /> Vulnerable
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Precise Fixed India Map Canvas */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-4 min-h-[420px] bg-gradient-to-b from-[#FFFDF8]/90 to-[#EFE6D7]/40 rounded-2xl border border-[#B96D43]/16 shadow-inner-light select-none">
          {/* SVG Precise Geographic India Map - Fixed Position */}
          <svg
            viewBox="0 0 600 650"
            className="w-full max-w-[480px] h-auto pointer-events-none filter drop-shadow-[0_8px_20px_rgba(73,55,42,0.08)]"
          >
            <defs>
              <linearGradient id="indiaMapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.92" />
                <stop offset="50%" stopColor="#EFE6D7" stopOpacity="0.80" />
                <stop offset="100%" stopColor="#F6F1E8" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="corridorVector" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B96D43" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#B58A50" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3F7A61" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* 1. Precise India Mainland Boundary Polygon */}
            <path
              d={INDIA_MAINLAND_OUTLINE}
              fill="url(#indiaMapFill)"
              stroke="#B96D43"
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* 2. Detailed Internal State Corridors */}
            {INDIA_STATE_BOUNDARIES.map((boundaryD, i) => (
              <path
                key={i}
                d={boundaryD}
                fill="none"
                stroke="#B96D43"
                strokeWidth="0.75"
                strokeOpacity="0.25"
                strokeDasharray="3 3"
              />
            ))}

            {/* 3. Andaman & Nicobar Island Territories */}
            {ANDAMAN_NICOBAR_ISLANDS.map((island, idx) => (
              <ellipse
                key={`an-${idx}`}
                cx={island.cx}
                cy={island.cy}
                rx={island.rx}
                ry={island.ry}
                fill="#C7A27C"
                stroke="#B96D43"
                strokeWidth="1"
                opacity="0.85"
              />
            ))}

            {/* 4. Lakshadweep Island Territories */}
            {LAKSHADWEEP_ISLANDS.map((island, idx) => (
              <circle
                key={`ld-${idx}`}
                cx={island.cx}
                cy={island.cy}
                r={island.r}
                fill="#C7A27C"
                stroke="#B96D43"
                strokeWidth="1"
                opacity="0.85"
              />
            ))}

            {/* 5. Inter-Corridor Telemetry Vectors */}
            <path
              d="M 235 155 Q 180 215 130 275 T 260 330 T 385 310 T 505 220 T 215 495"
              fill="none"
              stroke="url(#corridorVector)"
              strokeWidth="2"
              strokeDasharray="5 5"
              className="animate-pulse"
            />

            {/* 6. Fixed Interactive Geographic Markers */}
            {REGION_CLUSTERS_DATA.map((c) => {
              const isSelected = selectedCluster.id === c.id;
              const isHovered = hoveredCluster?.id === c.id;
              const color =
                c.status === "Thriving"
                  ? "#3F7A61"
                  : c.status === "Stable"
                  ? "#0284C7"
                  : "#B47C35";

              return (
                <g
                  key={c.id}
                  className="pointer-events-auto cursor-pointer"
                  onClick={() => setSelectedCluster(c)}
                  onMouseEnter={() => setHoveredCluster(c)}
                  onMouseLeave={() => setHoveredCluster(null)}
                >
                  {/* Outer pulse wave */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={c.coordinates.x}
                      cy={c.coordinates.y}
                      r="22"
                      fill={color}
                      opacity="0.22"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer halo */}
                  <circle
                    cx={c.coordinates.x}
                    cy={c.coordinates.y}
                    r={isSelected || isHovered ? "16" : "12"}
                    fill={color}
                    opacity={isSelected ? "0.38" : "0.18"}
                    stroke={color}
                    strokeWidth={isSelected ? "2.5" : "1.2"}
                  />

                  {/* Core Node Marker */}
                  <circle
                    cx={c.coordinates.x}
                    cy={c.coordinates.y}
                    r={isSelected ? "7" : "5"}
                    fill={color}
                  />

                  {/* Label Pill */}
                  <text
                    x={c.coordinates.x + 14}
                    y={c.coordinates.y + 4}
                    fill={isSelected || isHovered ? "#49372A" : "#6E5D53"}
                    fontSize="11"
                    fontWeight={isSelected ? "700" : "600"}
                    fontFamily="sans-serif"
                    className="select-none filter drop-shadow-sm"
                  >
                    {c.name.split(" ")[0]} ({c.demandIndex})
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Liquid Glass Dynamic Tooltip when Hovered */}
          {hoveredCluster && (
            <div
              className="absolute pointer-events-none z-30 transition-all duration-200"
              style={{
                left: `${(hoveredCluster.coordinates.x / 600) * 100}%`,
                top: `${(hoveredCluster.coordinates.y / 650) * 100 - 15}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="px-3 py-2 rounded-xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#B96D43]/25 shadow-lg text-xs space-y-0.5">
                <div className="font-bold text-[#49372A]">{hoveredCluster.name}</div>
                <div className="text-[10px] text-[#6E5D53]">
                  Artisans: <strong className="text-[#49372A]">{hoveredCluster.artisanCount.toLocaleString("en-IN")}</strong> | Index: <strong className="text-[#B96D43]">{hoveredCluster.demandIndex}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-3 left-4 text-[10px] text-[#6E5D53] font-mono font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3F7A61]" />
            <span>Interactive Fixed Geometry: Click corridor to inspect telemetry</span>
          </div>
        </div>

        {/* Selected Corridor Telemetry Inspection Box */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#FFFDF8]/90 rounded-2xl border border-[#B96D43]/18 p-6 shadow-sm">
          <div>
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#B96D43]/14">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B96D43] font-bold block">
                  Active Regional Corridor
                </span>
                <h4 className="text-base font-bold text-[#49372A] mt-0.5">
                  {active.name}
                </h4>
                <p className="text-xs text-[#6E5D53] mt-1 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#B96D43] shrink-0" />
                  {active.states}
                </p>
              </div>
              <StatusBadge status={active.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-xl bg-[#EFE6D7]/60 border border-[#B96D43]/15">
                <div className="flex items-center gap-1.5 text-[#6E5D53] text-[11px] mb-1 font-medium">
                  <Users className="w-3.5 h-3.5 text-[#B96D43]" />
                  <span>Verified Artisans</span>
                </div>
                <div className="text-xl font-black text-[#49372A] num-display">
                  {active.artisanCount.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-[#3F7A61] font-bold mt-0.5">
                  +{active.growthPercent}% YoY Guild Growth
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#EFE6D7]/60 border border-[#B96D43]/15">
                <div className="flex items-center gap-1.5 text-[#6E5D53] text-[11px] mb-1 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-[#B96D43]" />
                  <span>Demand Velocity</span>
                </div>
                <div className="text-xl font-black text-[#B96D43] num-display">
                  {active.demandIndex}/100
                </div>
                <div className="text-[10px] text-[#6E5D53] font-medium mt-0.5">
                  High Metro Intent Index
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#49372A] uppercase tracking-wider block mb-2">
                Predominant Signature Crafts
              </span>
              <div className="space-y-1.5">
                {active.topCrafts.map((craft, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-[#F6F1E8] border border-[#B96D43]/12"
                  >
                    <span className="text-[#49372A] font-semibold">{craft}</span>
                    <span className="text-[10px] text-[#3F7A61] font-mono font-bold bg-[#3F7A61]/10 px-2 py-0.5 rounded border border-[#3F7A61]/20">
                      GI Authenticated
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#B96D43]/14 flex items-center justify-between text-xs">
            <span className="text-[#6E5D53] font-medium">
              Corridor Resilience Index: <strong className="text-[#49372A] font-bold">94.2%</strong>
            </span>
            <button
              onClick={() => setSelectedCluster(active)}
              className="text-xs font-bold text-[#B96D43] hover:text-[#49372A] transition-colors cursor-pointer"
            >
              Corridor Telemetry →
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
