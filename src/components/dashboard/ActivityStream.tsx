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
        return <Users className="w-3.5 h-3.5 text-emerald-700" />;
      case "demand":
        return <TrendingUp className="w-3.5 h-3.5 text-[#B8794A]" />;
      case "b2b":
        return <ShoppingBag className="w-3.5 h-3.5 text-[#8A5A2B]" />;
      case "health":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />;
      case "gi":
        return <Award className="w-3.5 h-3.5 text-sky-700" />;
      default:
        return <Radio className="w-3.5 h-3.5 text-[#6E5D53]" />;
    }
  };

  return (
    <GlassCard variant="default" className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#B8794A]/12">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <h3 className="text-sm font-bold text-[#2C221E] tracking-tight">
            Live Ecosystem Activity Stream
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B8794A]/10 text-[#B8794A] border border-[#B8794A]/20 font-semibold">
          EVENT BUS • ACTIVE
        </span>
      </div>

      <div className="mt-4 relative pl-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gradient-to-b before:from-[#B8794A]/50 before:via-[#B8794A]/20 before:to-transparent space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Timeline node marker */}
            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#FFFDF8] border border-[#B8794A]/40 flex items-center justify-center group-hover:border-[#B8794A] transition-colors shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B8794A]" />
            </div>

            <div className="p-3 rounded-2xl bg-[#F6F1E8] border border-[#B8794A]/15 hover:border-[#B8794A]/35 hover:bg-[#FFFDF8] transition-all shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1 rounded-lg bg-[#EFE7DA] border border-[#B8794A]/15 shrink-0">
                    {getIcon(act.type)}
                  </div>
                  <span className="text-xs font-bold text-[#2C221E] group-hover:text-[#B8794A] transition-colors truncate">
                    {act.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#9A887C] font-semibold shrink-0">
                  {act.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-[#6E5D53] font-medium mt-1 leading-relaxed">
                {act.description}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-md bg-[#EFE7DA] border border-[#B8794A]/12 text-[#6E5D53] font-semibold">
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
