"use client";

import React from "react";
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

export const Sidebar = ({ isCollapsed = false }: { isCollapsed?: boolean }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "glass-panel m-4 rounded-2xl h-[calc(100vh-2rem)] flex flex-col transition-all duration-300 z-40",
        isCollapsed ? "w-20" : "w-[260px]"
      )}
    >

      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-[#B96D43]/14 gap-3">
        {/* Monogram Glyph */}
        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#B96D43] to-[#7E4221] border border-[#B96D43]/40 flex items-center justify-center font-black text-white text-xs shadow-md shrink-0">
          <span>KS</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#B58A50] ring-2 ring-[#F6F1E8]" />
        </div>

        {!isCollapsed && (
          <div className="min-w-0 flex-1 overflow-hidden animate-in fade-in duration-200">
            <h1 className="font-bold text-[#49372A] text-xs tracking-wider uppercase truncate flex items-center gap-1.5">
              <span>{PLATFORM_NAME}</span>
              <Flame className="w-3 h-3 text-[#B96D43] fill-[#B96D43]" />
            </h1>
            <p className="text-[9.5px] text-[#B96D43] font-mono tracking-tight truncate font-bold">
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
              <div className="px-3 pb-1 text-[9.5px] font-bold text-earth-muted uppercase tracking-widest font-mono">
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
                  prefetch={true}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all relative group cursor-pointer",
                    isActive
                      ? "bg-heritage-terracotta/10 text-heritage-terracotta font-bold border border-heritage-terracotta/20 shadow-sm backdrop-blur-md"
                      : "text-earth-slate hover:text-earth-dark hover:bg-heritage-terracotta/5 border border-transparent"
                  )}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-heritage-terracotta shadow-sm" />
                  )}

                  {/* Icon */}
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-heritage-terracotta"
                        : "text-earth-slate group-hover:text-earth-dark"
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
                            "text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider font-bold shadow-sm",
                            item.badge === "Copilot"
                              ? "bg-heritage-gold/20 text-heritage-gold border border-heritage-gold/30"
                              : "bg-heritage-red/15 text-heritage-red border border-heritage-red/30"
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

      {/* Footer System Status */}
      <div className="p-3 border-t border-[#B96D43]/14 text-[#6E5D53] space-y-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors",
            pathname === "/settings"
              ? "bg-[#B96D43]/10 text-[#49372A] font-bold border border-[#B96D43]/20 shadow-sm"
              : "hover:text-[#49372A] hover:bg-[#B96D43]/08 border border-transparent"
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className={cn("w-4 h-4", pathname === "/settings" ? "text-[#49372A]" : "text-[#6E5D53]")} />
          {!isCollapsed && <span>System Settings</span>}
        </Link>

        {/* Live Node Heartbeat */}
        <div
          className={cn(
            "p-2.5 rounded-xl bg-[#FFFDF8]/70 border border-[#B96D43]/15 flex items-center text-[11px]",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3F7A61] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3F7A61]" />
            </span>
            {!isCollapsed && (
              <span className="text-[10px] text-[#49372A] font-mono truncate font-medium">
                ONDC Node • Live
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] font-mono text-[#3F7A61] bg-[#3F7A61]/15 px-1.5 py-0.5 rounded font-bold">
              99.98%
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
