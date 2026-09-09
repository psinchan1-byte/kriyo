"use client";

import React from "react";
import { Craft } from "@/types/craft";
import { StatusBadge } from "@/components/common/StatusBadge";
import { X, MapPin, Award, BookOpen, Layers, HeartPulse } from "lucide-react";

interface CraftDetailModalProps {
  craft: Craft | null;
  onClose: () => void;
}

export const CraftDetailModal: React.FC<CraftDetailModalProps> = ({ craft, onClose }) => {
  if (!craft) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-obsidian-850/95 border border-white/[0.14] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-terracotta-light">
                {craft.category}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                <MapPin className="w-3 h-3 text-stone-400" />
                {craft.region}, {craft.state}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
              <span>{craft.name}</span>
              {craft.nativeName && (
                <span className="text-sm font-normal text-stone-400 font-sans">
                  ({craft.nativeName})
                </span>
              )}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-obsidian-900 border border-white/[0.06]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
              Active Artisans
            </span>
            <span className="text-lg font-bold text-white num-display">
              {craft.activeArtisansCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-900 border border-white/[0.06]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
              Health Status
            </span>
            <div className="mt-1">
              <StatusBadge status={craft.healthStatus} size="sm" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-900 border border-white/[0.06]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
              Demand Growth
            </span>
            <span className="text-lg font-bold text-emerald-400 num-display">
              +{craft.metrics.demandGrowthPercent}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-900 border border-white/[0.06]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
              Buyer Engagement
            </span>
            <span className="text-lg font-bold text-heritage-gold num-display">
              {(craft.metrics.views / 1000).toFixed(1)}K views
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 text-xs">
          <span className="font-semibold uppercase tracking-wider text-stone-300 font-mono text-[10px] block">
            Craft Overview & Historical Lineage
          </span>
          <p className="text-stone-300 leading-relaxed bg-obsidian-900/60 p-3.5 rounded-xl border border-white/[0.05]">
            {craft.description}
          </p>
        </div>

        {/* Geographical Indication (GI) Details */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-heritage-terracotta/[0.08] to-heritage-gold/[0.05] border border-heritage-terracotta/20 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-heritage-gold" />
            <span className="text-xs font-bold text-white tracking-wide">
              Geographical Indication (GI) Registry Record
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px]">GI Tag Status:</span>
              <span className="font-mono text-emerald-400 font-semibold">
                {craft.heritage.giTagged ? "Authenticated & Certified" : "Pending Evaluation"}
              </span>
            </div>
            {craft.heritage.giRegistrationNumber && (
              <div>
                <span className="text-stone-400 block text-[11px]">GI Reg Number & Year:</span>
                <span className="font-mono text-stone-200">
                  {craft.heritage.giRegistrationNumber} ({craft.heritage.giYear})
                </span>
              </div>
            )}
            <div className="sm:col-span-2">
              <span className="text-stone-400 block text-[11px]">Historical Origin:</span>
              <span className="text-stone-200">{craft.heritage.historicalOrigin}</span>
            </div>
          </div>
        </div>

        {/* Traditional Raw Materials */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs font-semibold text-stone-200">
              Verified Traditional Raw Materials
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {craft.heritage.traditionalMaterials.map((mat, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-white/[0.08] text-stone-300 text-xs font-mono"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Endangered Reason if any */}
        {craft.heritage.endangeredReason && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-rose-200">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Vulnerability Diagnostic Analysis</span>
            </div>
            <p className="leading-relaxed">{craft.heritage.endangeredReason}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[11px] font-mono text-stone-400">
            Node ID: {craft.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
