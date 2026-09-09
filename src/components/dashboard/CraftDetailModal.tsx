"use client";

import React from "react";
import { Craft } from "@/types/craft";
import { StatusBadge } from "@/components/common/StatusBadge";
import { X, MapPin, Award, Layers, HeartPulse } from "lucide-react";

interface CraftDetailModalProps {
  craft: Craft | null;
  onClose: () => void;
}

export const CraftDetailModal: React.FC<CraftDetailModalProps> = ({ craft, onClose }) => {
  if (!craft) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/30 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#FFFDF8] border border-[#B8794A]/25 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#B8794A]/12">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8794A] font-bold">
                {craft.category}
              </span>
              <span className="text-[#9A887C]">•</span>
              <span className="text-xs text-[#6E5D53] flex items-center gap-1 font-mono font-medium">
                <MapPin className="w-3 h-3 text-[#B8794A]" />
                {craft.region}, {craft.state}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#2C221E] tracking-tight mt-1 flex items-center gap-3">
              <span>{craft.name}</span>
              {craft.nativeName && (
                <span className="text-sm font-normal text-[#6E5D53] font-sans">
                  ({craft.nativeName})
                </span>
              )}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E5D53] hover:text-[#2C221E] hover:bg-[#B8794A]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-[#EFE7DA]/60 border border-[#B8794A]/15 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#9A887C] font-bold block">
              Active Artisans
            </span>
            <span className="text-lg font-black text-[#2C221E] num-display">
              {craft.activeArtisansCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#EFE7DA]/60 border border-[#B8794A]/15 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#9A887C] font-bold block">
              Health Status
            </span>
            <div className="mt-1">
              <StatusBadge status={craft.healthStatus} size="sm" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#EFE7DA]/60 border border-[#B8794A]/15 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#9A887C] font-bold block">
              Demand Growth
            </span>
            <span className="text-lg font-black text-emerald-800 num-display">
              +{craft.metrics.demandGrowthPercent}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#EFE7DA]/60 border border-[#B8794A]/15 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#9A887C] font-bold block">
              Buyer Engagement
            </span>
            <span className="text-lg font-black text-[#B8794A] num-display">
              {(craft.metrics.views / 1000).toFixed(1)}K views
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#2C221E] font-mono text-[10px] block">
            Craft Overview & Historical Lineage
          </span>
          <p className="text-[#6E5D53] leading-relaxed bg-[#F6F1E8] p-3.5 rounded-2xl border border-[#B8794A]/12 font-medium">
            {craft.description}
          </p>
        </div>

        {/* Geographical Indication (GI) Details */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#B8794A]/12 to-[#C89B6D]/10 border border-[#B8794A]/25 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#B8794A]" />
            <span className="text-xs font-bold text-[#2C221E] tracking-wide">
              Geographical Indication (GI) Registry Record
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#6E5D53] block text-[11px] font-medium">GI Tag Status:</span>
              <span className="font-mono text-emerald-800 font-bold">
                {craft.heritage.giTagged ? "Authenticated & Certified" : "Pending Evaluation"}
              </span>
            </div>
            {craft.heritage.giRegistrationNumber && (
              <div>
                <span className="text-[#6E5D53] block text-[11px] font-medium">GI Reg Number & Year:</span>
                <span className="font-mono text-[#2C221E] font-bold">
                  {craft.heritage.giRegistrationNumber} ({craft.heritage.giYear})
                </span>
              </div>
            )}
            <div className="sm:col-span-2">
              <span className="text-[#6E5D53] block text-[11px] font-medium">Historical Origin:</span>
              <span className="text-[#2C221E] font-semibold">{craft.heritage.historicalOrigin}</span>
            </div>
          </div>
        </div>

        {/* Traditional Raw Materials */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-3.5 h-3.5 text-[#B8794A]" />
            <span className="text-xs font-bold text-[#2C221E]">
              Verified Traditional Raw Materials
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {craft.heritage.traditionalMaterials.map((mat, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#F6F1E8] border border-[#B8794A]/15 text-[#2C221E] text-xs font-mono font-semibold"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Endangered Reason if any */}
        {craft.heritage.endangeredReason && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-800">
              <HeartPulse className="w-4 h-4 text-rose-700" />
              <span>Vulnerability Diagnostic Analysis</span>
            </div>
            <p className="leading-relaxed font-medium">{craft.heritage.endangeredReason}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#B8794A]/12 flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#9A887C] font-semibold">
            Node ID: {craft.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#EFE7DA] hover:bg-[#E8DCCB] text-[#2C221E] text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
