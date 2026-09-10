"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Calendar,
  ShieldCheck,
  Check,
} from "lucide-react";
import { CommandPalette } from "./CommandPalette";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Dynamic titles and subtitles based on route
  const getPageMeta = () => {
    switch (pathname) {
      case "/":
      case "/dashboard":
        return {
          title: "Executive Overview",
          subtitle: "Monitor the pulse and living telemetry of India's craft ecosystem",
        };
      case "/crafts":
        return {
          title: "Craft Intelligence & GI Registry",
          subtitle: "Living craft taxonomy, geographical indications, and health indices",
        };
      case "/artisans":
        return {
          title: "Artisan Monitoring & Guilds",
          subtitle: "Profiles of verified master craftspeople, awards, and demographics",
        };
      case "/products":
        return {
          title: "Product Provenance & Inventory",
          subtitle: "Handcrafted catalog traces, raw material verification, and catalog stats",
        };
      case "/sales":
        return {
          title: "Sales & Fair-Trade Commerce",
          subtitle: "Gross turnover, order conversions, and guaranteed artisan direct payouts",
        };
      case "/engagement":
        return {
          title: "Buyer Engagement & Demand Signals",
          subtitle: "Buyer search trends, save velocities, and conversion funnel analytics",
        };
      case "/geography":
        return {
          title: "Geographic Demand & Regional Corridors",
          subtitle: "Pan-India cluster densities, state export indices, and spatial demand",
        };
      case "/heritage":
        return {
          title: "Heritage Intelligence & Lineages",
          subtitle: "Cryptographic preservation records, material archives, and history",
        };
      case "/ai":
        return {
          title: "AI Intelligence & Predictive Signals",
          subtitle: "Autonomous market signals, elasticity pricing models, and intervention alerts",
        };
      case "/revival":
        return {
          title: "Craft Risk & Revival Interventions",
          subtitle: "Endangerment monitoring, master protection, and institutional revival pipelines",
        };
      default:
        return {
          title: "Executive Overview",
          subtitle: "Ecosystem telemetry & analytics",
        };
    }
  };

  const { title, subtitle } = getPageMeta();

  return (
    <>
      <header className="h-16 liquid-control-bar mx-4 mt-4 rounded-2xl px-5 sm:px-8 flex items-center justify-between sticky top-4 z-30 select-none">
        {/* Left: Page Title & Contextual Subtitle */}
        <div className="min-w-0 pr-4">
          <h1 className="text-sm font-bold text-[#49372A] tracking-tight flex items-center gap-2 truncate">
            <span>{title}</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#B96D43]/12 text-[#B96D43] border border-[#B96D43]/25 font-bold">
              LIVE NODE
            </span>
          </h1>
          <p className="text-[11px] text-[#6E5D53] truncate hidden sm:block font-medium">
            {subtitle}
          </p>
        </div>

        {/* Center: Global Command / Search Trigger */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#FFFDF8]/85 border border-[#B96D43]/18 text-[#6E5D53] hover:text-[#49372A] hover:border-[#B96D43]/35 hover:bg-white transition-all text-xs group cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#B96D43] group-hover:scale-110 transition-transform" />
              <span className="truncate">Search artisans, crafts, GI products...</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] bg-[#EFE6D7]/70 border border-[#B96D43]/15 px-1.5 py-0.5 rounded-md text-[#6E5D53]">
              <span>⌘</span>
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right: Date Range, AI Status, Notifications, Admin Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="md:hidden p-2 rounded-xl bg-[#FFFDF8]/85 border border-[#B96D43]/18 text-[#6E5D53] hover:text-[#49372A]"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Date Range Selector Dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF8]/85 border border-[#B96D43]/18 hover:bg-white text-[#49372A] text-xs transition-colors shadow-sm font-semibold"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B96D43]" />
              <span>{timeRange}</span>
              <ChevronDown className="w-3 h-3 text-[#6E5D53]" />
            </button>

            {showTimeDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-[#FFFDF8]/95 border border-[#B96D43]/20 rounded-xl shadow-xl p-1 z-40 backdrop-blur-2xl">
                {["Last 7 Days", "Last 30 Days", "Q3 2026", "FY 2025-26", "All-Time"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setShowTimeDropdown(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#49372A] hover:bg-[#B96D43]/10 text-left transition-colors font-semibold"
                  >
                    <span>{range}</span>
                    {timeRange === range && <Check className="w-3.5 h-3.5 text-[#B96D43]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Copilot Status Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B96D43]/14 border border-[#B96D43]/30 text-[#B96D43] text-[11px] font-bold">
            <Sparkles className="w-3 h-3 animate-pulse text-[#B96D43]" />
            <span>AI Copilot Active • 98.4%</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-[#FFFDF8]/85 border border-[#B96D43]/18 text-[#6E5D53] hover:text-[#49372A] hover:bg-white transition-colors shadow-sm cursor-pointer"
              title="Intelligence Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B96D43] animate-pulse ring-2 ring-[#F6F1E8]" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#FFFDF8]/95 border border-[#B96D43]/20 rounded-2xl shadow-xl p-3 z-40 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#B96D43]/14 mb-2">
                  <span className="text-xs font-bold text-[#49372A]">Intelligence Alerts</span>
                  <span className="text-[10px] font-mono text-[#3F7A61] bg-[#3F7A61]/15 px-2 py-0.5 rounded border border-[#3F7A61]/30 font-bold">
                    3 New
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#EFE6D7]/60 hover:bg-[#EFE6D7] transition-colors cursor-pointer border border-[#B96D43]/12">
                    <p className="font-bold text-[#49372A]">Madhubani Demand Surge</p>
                    <p className="text-[11px] text-[#6E5D53] mt-0.5">+34% increase in search intent over 30 days.</p>
                    <span className="text-[10px] text-[#9A887C] font-mono mt-1 block font-medium">8 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#EFE6D7]/60 hover:bg-[#EFE6D7] transition-colors cursor-pointer border border-[#B96D43]/12">
                    <p className="font-bold text-[#B47C35]">Bidriware Watchlist Flag</p>
                    <p className="text-[11px] text-[#6E5D53] mt-0.5">Raw zinc alloy scarcity reported in Bidar cluster.</p>
                    <span className="text-[10px] text-[#9A887C] font-mono mt-1 block font-medium">22 mins ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Pill */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#B96D43]/15">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B96D43] to-[#B58A50] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              AD
            </div>
            <div className="hidden 2xl:block text-left">
              <div className="text-xs font-bold text-[#49372A] leading-tight">Admin Director</div>
              <div className="text-[10px] text-[#6E5D53] flex items-center gap-1 font-mono font-bold">
                <ShieldCheck className="w-2.5 h-2.5 text-[#3F7A61]" />
                Apex Access
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
