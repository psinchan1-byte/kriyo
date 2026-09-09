"use client";

import React from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { ActivityItem } from "@/types/dashboard";
import { Radio, Users, TrendingUp, ShoppingBag, ShieldAlert, Award } from "lucide-react";

interface ActivityStreamProps {
  activities: ActivityItem[];
}

export const ActivityStream: React.FC<ActivityStreamProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "artisan":
        return <Users className="w-3.5 h-3.5 text-emerald-400" />;
      case "demand":
        return <TrendingUp className="w-3.5 h-3.5 text-heritage-terracotta-light" />;
      case "b2b":
        return <ShoppingBag className="w-3.5 h-3.5 text-heritage-gold" />;
      case "health":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case "gi":
        return <Award className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <Radio className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  return (
    <GlassCard variant="default" className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Live Ecosystem Activity Stream
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-stone-400">
          EVENT BUS • ACTIVE
        </span>
      </div>

      <div className="mt-4 relative pl-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-heritage-terracotta/40 before:via-white/10 before:to-transparent space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Timeline node marker */}
            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-obsidian-900 border border-white/[0.2] flex items-center justify-center group-hover:border-heritage-terracotta transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta-light" />
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/60 border border-white/[0.05] hover:border-white/[0.12] hover:bg-obsidian-850/80 transition-all">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1 rounded bg-white/[0.04] border border-white/[0.06] shrink-0">
                    {getIcon(act.type)}
                  </div>
                  <span className="text-xs font-semibold text-stone-200 group-hover:text-white truncate">
                    {act.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  {act.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                {act.description}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-stone-400">
                  {act.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
