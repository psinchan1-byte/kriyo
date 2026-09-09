"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  Users,
  Package,
  CircleDollarSign,
  TrendingUp,
  Compass,
  BookOpen,
  Sparkles,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Settings,
  Flame,
} from "lucide-react";
import { NAVIGATION_GROUPS, PLATFORM_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  "/": <LayoutDashboard className="w-4 h-4 shrink-0" />,
  "/crafts": <Palette className="w-4 h-4 shrink-0" />,
  "/artisans": <Users className="w-4 h-4 shrink-0" />,
  "/products": <Package className="w-4 h-4 shrink-0" />,
  "/sales": <CircleDollarSign className="w-4 h-4 shrink-0" />,
  "/engagement": <TrendingUp className="w-4 h-4 shrink-0" />,
  "/geography": <Compass className="w-4 h-4 shrink-0" />,
  "/heritage": <BookOpen className="w-4 h-4 shrink-0" />,
  "/ai": <Sparkles className="w-4 h-4 shrink-0" />,
  "/revival": <ShieldAlert className="w-4 h-4 shrink-0" />,
};

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-obsidian-900/85 backdrop-blur-2xl text-stone-300 min-h-screen flex flex-col border-r border-white/[0.08] shrink-0 select-none z-40 transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-[74px]" : "w-64"
      )}
    >
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-obsidian-850 border border-white/[0.14] text-stone-300 hover:text-white flex items-center justify-center shadow-glass transition-transform hover:scale-110 z-50 cursor-pointer"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Brand & Monogram Header */}
      <div className="h-16 flex items-center px-4 border-b border-white/[0.08] gap-3">
        {/* Monogram Glyph */}
        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-heritage-terracotta to-heritage-earth border border-heritage-terracotta/40 flex items-center justify-center font-black text-white text-xs shadow-glow-terracotta shrink-0">
          <span>KS</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-heritage-gold ring-2 ring-obsidian-900" />
        </div>

        {!isCollapsed && (
          <div className="min-w-0 flex-1 overflow-hidden animate-in fade-in duration-200">
            <h1 className="font-bold text-white text-xs tracking-wider uppercase truncate flex items-center gap-1.5">
              <span>{PLATFORM_NAME}</span>
              <Flame className="w-3 h-3 text-heritage-terracotta fill-heritage-terracotta" />
            </h1>
            <p className="text-[9.5px] text-heritage-gold/80 font-mono tracking-tight truncate">
              HERITAGE INTELLIGENCE
            </p>
          </div>
        )}
      </div>

      {/* Grouped Navigation List */}
      <nav className="flex-1 px-2.5 py-4 space-y-5 overflow-y-auto overflow-x-hidden">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 text-[9.5px] font-bold text-stone-400 uppercase tracking-widest font-mono">
                {group.title}
              </div>
            )}

            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/" && pathname === "/dashboard");
              const icon = ICON_MAP[item.href] || <LayoutDashboard className="w-4 h-4 shrink-0" />;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all relative group cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-heritage-terracotta/20 to-white/[0.04] text-white font-semibold border border-heritage-terracotta/40 shadow-sm"
                      : "text-stone-400 hover:text-stone-100 hover:bg-white/[0.05] border border-transparent"
                  )}
                >
                  {/* Active Indicator Accent Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-heritage-terracotta shadow-glow-terracotta" />
                  )}

                  {/* Icon */}
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-heritage-terracotta-light"
                        : "text-stone-400 group-hover:text-stone-200"
                    )}
                  >
                    {icon}
                  </span>

                  {/* Text & Badge */}
                  {!isCollapsed && (
                    <div className="min-w-0 flex-1 flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold",
                            item.badge === "Copilot"
                              ? "bg-heritage-gold/20 text-heritage-gold border border-heritage-gold/30"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer System Status & Settings */}
      <div className="p-3 border-t border-white/[0.08] text-stone-400 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs hover:text-white hover:bg-white/[0.05] transition-colors"
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 text-stone-400" />
          {!isCollapsed && <span>System Settings</span>}
        </Link>

        {/* Live Node Heartbeat */}
        <div
          className={cn(
            "p-2.5 rounded-xl bg-obsidian-950/70 border border-white/[0.06] flex items-center text-[11px]",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {!isCollapsed && (
              <span className="text-[10px] text-stone-300 font-mono truncate">
                ONDC Node • Live
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded">
              99.98%
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
