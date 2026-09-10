"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Users, TrendingUp, Compass, ShieldCheck } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import {
  REGION_CLUSTERS_DATA,
  RegionClusterData,
  ANDAMAN_NICOBAR_ISLANDS,
  LAKSHADWEEP_ISLANDS,
} from "@/data/indiaGeoJson";

export const IndiaMap: React.FC = () => {
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedCluster, setSelectedCluster] = useState<RegionClusterData>(
    REGION_CLUSTERS_DATA[3] // Default to Eastern Corridor (Madhubani)
  );
  const [hoveredCluster, setHoveredCluster] = useState<RegionClusterData | null>(null);

  useEffect(() => {
    fetch("/india-states.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading GeoJSON", err));
  }, []);

  const active = hoveredCluster || selectedCluster;

  // D3 Projection Setup
  // We use fitExtent to perfectly center and scale India within a padded bounding box of our 600x650 SVG
  const projection = geoMercator();
  const pathGenerator = geoPath().projection(projection);

  if (geoData) {
    projection.fitExtent(
      [
        [50, 50],
        [500, 600],
      ],
      geoData
    );
  }

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
            <span className="w-2.5 h-2.5 rounded-full bg-[#1686C9]" /> Stable
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6E5D53] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B47C35]" /> Vulnerable
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Precise Fixed India Map Canvas */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-4 min-h-[500px] bg-[#E8D7C0] rounded-2xl border border-[#B96D43]/16 shadow-inner-light select-none overflow-hidden">
          
          {!geoData ? (
            <div className="text-[#806C5B] font-mono text-sm font-bold tracking-widest animate-pulse">
              LOADING GEOGRAPHIC DATA...
            </div>
          ) : (
            <svg
              viewBox="0 0 600 650"
              className="w-full h-full max-w-[550px] pointer-events-none drop-shadow-[0_10px_25px_rgba(58,42,32,0.15)]"
            >
              <defs>
                <linearGradient id="indiaMapFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8EEDF" />
                  <stop offset="100%" stopColor="#E8D7C0" />
                </linearGradient>

                {/* Node colors based on the reference image */}
                <radialGradient id="haloBlue">
                  <stop offset="60%" stopColor="#1686C9" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1686C9" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="haloGreen">
                  <stop offset="60%" stopColor="#2D8A62" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2D8A62" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="haloOrange">
                  <stop offset="60%" stopColor="#D47A19" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#D47A19" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* BACKGROUND ORBITAL RINGS */}
              <g stroke="#806C5B" strokeOpacity="0.1" strokeWidth="1" fill="none">
                <circle cx="300" cy="325" r="450" />
                <circle cx="300" cy="325" r="350" strokeDasharray="4 8" />
                <circle cx="300" cy="325" r="250" />
                
                {/* Orbital dots */}
                <circle cx="100" cy="100" r="4" fill="#806C5B" fillOpacity="0.1" />
                <circle cx="500" cy="450" r="6" fill="#806C5B" fillOpacity="0.08" />
                <circle cx="150" cy="400" r="3" fill="#806C5B" fillOpacity="0.1" />
              </g>

              {/* COMPASS ROSE (Top Right) */}
              <g transform="translate(480, 70)" stroke="#806C5B" strokeOpacity="0.2" fill="none">
                <circle cx="0" cy="0" r="60" strokeWidth="1" />
                <circle cx="0" cy="0" r="50" strokeDasharray="2 4" />
                <circle cx="0" cy="0" r="40" strokeWidth="0.5" />
                
                {/* Star / Pointer */}
                <path d="M 0 -25 L 5 -5 L 25 0 L 5 5 L 0 25 L -5 5 L -25 0 L -5 -5 Z" fill="#806C5B" fillOpacity="0.2" stroke="none" />
                <path d="M 0 -25 L 5 -5 L 0 0 Z" fill="#806C5B" fillOpacity="0.4" stroke="none" />
                <path d="M 0 0 L 5 5 L 25 0 Z" fill="#806C5B" fillOpacity="0.2" stroke="none" />
                <path d="M 0 25 L -5 5 L 0 0 Z" fill="#806C5B" fillOpacity="0.4" stroke="none" />
                <path d="M 0 0 L -5 -5 L -25 0 Z" fill="#806C5B" fillOpacity="0.2" stroke="none" />
                
                <text x="0" y="-35" fill="#806C5B" fillOpacity="0.5" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">N</text>
              </g>

              {/* GEOGRAPHIC LABELS */}
              <g fill="#806C5B" fillOpacity="0.65" fontSize="9" fontWeight="700" letterSpacing="3" fontFamily="sans-serif">
                <text x="80" y="150">PAKISTAN</text>
                <text x="350" y="100">CHINA</text>
                <text x="310" y="190">NEPAL</text>
                <text x="420" y="200">BHUTAN</text>
                <text x="400" y="280">BANGLADESH</text>
                <text x="530" y="310">MYANMAR</text>

                {/* Water Bodies */}
                <text x="50" y="360" letterSpacing="4">ARABIAN</text>
                <text x="70" y="380" letterSpacing="4">SEA</text>
                <text x="440" y="400" letterSpacing="4">BAY OF</text>
                <text x="435" y="420" letterSpacing="4">BENGAL</text>
                <text x="270" y="600" letterSpacing="4">INDIAN OCEAN</text>
              </g>

              {/* 1 & 2. Authentic India Geographic Vectors (States) */}
              <g strokeLinejoin="round" strokeLinecap="round">
                {geoData.features.map((feature: any, i: number) => {
                  const d = pathGenerator(feature);
                  if (!d) return null;
                  return (
                    <path
                      key={i}
                      d={d}
                      fill="url(#indiaMapFill)"
                      stroke="#D7A984"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                      strokeDasharray="2 2"
                      className="pointer-events-none"
                    />
                  );
                })}
              </g>
              
              {/* National Boundary Overlay (Derived from merging states or just using the same paths with a thicker outline stroke) */}
              {/* We render a thicker outline by cloning the paths but with no fill and a solid stroke */}
              <g strokeLinejoin="round" strokeLinecap="round">
                {geoData.features.map((feature: any, i: number) => {
                  const d = pathGenerator(feature);
                  if (!d) return null;
                  return (
                    <path
                      key={`outline-${i}`}
                      d={d}
                      fill="none"
                      stroke="#B96635"
                      strokeWidth="1.5"
                      className="pointer-events-none"
                    />
                  );
                })}
              </g>

              {/* 3. Andaman & Nicobar Island Territories */}
              <g stroke="#B96635" strokeWidth="1" fill="url(#indiaMapFill)">
                {ANDAMAN_NICOBAR_ISLANDS.map((island, idx) => {
                  const p = projection([island.lng, island.lat]);
                  if (!p) return null;
                  return (
                    <circle
                      key={`an-${idx}`}
                      cx={p[0]}
                      cy={p[1]}
                      r={island.r}
                    />
                  );
                })}
                {(() => {
                  const p = projection([92.5, 12]);
                  return p && (
                    <text x={p[0] + 15} y={p[1]} fill="#806C5B" fillOpacity="0.65" fontSize="7" fontWeight="bold" letterSpacing="1">
                      ANDAMAN & NICOBAR
                    </text>
                  );
                })()}
              </g>

              {/* 4. Lakshadweep Island Territories */}
              <g stroke="#B96635" strokeWidth="1" fill="url(#indiaMapFill)">
                {LAKSHADWEEP_ISLANDS.map((island, idx) => {
                  const p = projection([island.lng, island.lat]);
                  if (!p) return null;
                  return (
                    <circle
                      key={`ld-${idx}`}
                      cx={p[0]}
                      cy={p[1]}
                      r={island.r}
                    />
                  );
                })}
                {(() => {
                  const p = projection([72.5, 11]);
                  return p && (
                    <text x={p[0] - 25} y={p[1] - 10} fill="#806C5B" fillOpacity="0.65" fontSize="7" fontWeight="bold" letterSpacing="1" textAnchor="end">
                      LAKSHADWEEP
                    </text>
                  );
                })()}
              </g>

              {/* 6. Fixed Interactive Geographic Markers */}
              {REGION_CLUSTERS_DATA.map((c) => {
                const isSelected = selectedCluster.id === c.id;
                const isHovered = hoveredCluster?.id === c.id;
                
                // Map regions to the specific colors in the mockup
                let color = "#D47A19"; // Default Orange
                let haloUrl = "url(#haloOrange)";
                if (c.name.includes("Northern") || c.name.includes("North-Eastern")) {
                  color = "#1686C9"; // Blue
                  haloUrl = "url(#haloBlue)";
                } else if (c.name.includes("Western") || c.name.includes("Eastern") && !c.name.includes("North")) {
                  color = "#2D8A62"; // Green
                  haloUrl = "url(#haloGreen)";
                }

                // Project Longitude/Latitude to SVG pixel coordinates
                const projectedPoint = projection([c.coordinates.lng, c.coordinates.lat]);
                if (!projectedPoint) return null;
                const [cx, cy] = projectedPoint;

                return (
                  <g
                    key={c.id}
                    className="pointer-events-auto cursor-pointer"
                    onClick={() => setSelectedCluster(c)}
                    onMouseEnter={() => setHoveredCluster(c)}
                    onMouseLeave={() => setHoveredCluster(null)}
                  >
                    {/* Outer translucent halo */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected || isHovered ? "28" : "20"}
                      fill={haloUrl}
                      className="transition-all duration-300"
                    />
                    
                    {/* Inner ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected || isHovered ? "14" : "12"}
                      fill={color}
                      opacity="0.15"
                    />

                    {/* Core Node Marker */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="5"
                      fill={color}
                    />

                    {/* Compact Label */}
                    <g transform={`translate(${cx + 12}, ${cy + 4})`}>
                      <text
                        x="0"
                        y="0"
                        fill="#3A2A20"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="sans-serif"
                        className="select-none"
                      >
                        {c.name.split(" ")[0]} ({c.demandIndex})
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          )}

          {/* Liquid Glass Dynamic Tooltip when Hovered */}
          {hoveredCluster && geoData && (
            <div
              className="absolute pointer-events-none z-30 transition-all duration-200"
              style={{
                left: (() => {
                  const p = projection([hoveredCluster.coordinates.lng, hoveredCluster.coordinates.lat]);
                  return p ? `${(p[0] / 600) * 100}%` : '50%';
                })(),
                top: (() => {
                  const p = projection([hoveredCluster.coordinates.lng, hoveredCluster.coordinates.lat]);
                  return p ? `calc(${(p[1] / 650) * 100}% - 35px)` : '50%';
                })(),
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="px-3 py-2 rounded-xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#B96D43]/25 shadow-lg text-xs space-y-0.5 whitespace-nowrap">
                <div className="font-bold text-[#49372A]">{hoveredCluster.name}</div>
                <div className="text-[10px] text-[#6E5D53]">
                  Artisans: <strong className="text-[#49372A]">{hoveredCluster.artisanCount.toLocaleString("en-IN")}</strong> | Index: <strong className="text-[#B96D43]">{hoveredCluster.demandIndex}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 text-[10px] text-[#8C7A6B] font-mono font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3F7A61]" />
            <span>Real GeoJSON Projection • Static Bounds</span>
          </div>
          
          {/* Legend Dots Bottom Right */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <div className="w-3 h-3 rounded-full bg-[#B96D43] opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-[#B96D43] opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-[#B96D43] opacity-60"></div>
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
