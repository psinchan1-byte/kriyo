"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  Palette,
  Users,
  Package,
  DollarSign,
  MapPin,
  ShieldAlert,
  ArrowRight,
  X,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Crafts" | "Artisans" | "Navigation" | "Signals" | "Regions";
  href: string;
  description?: string;
  icon: React.ReactNode;
}

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: "c-1",
    title: "Madhubani Folk Painting",
    category: "Crafts",
    href: "/crafts",
    description: "Mithila, Bihar • 540 Artisans • Thriving (GI-IN-0074)",
    icon: <Palette className="w-4 h-4 text-heritage-terracotta-light" />,
  },
  {
    id: "c-2",
    title: "Dokra Lost-Wax Metal Casting",
    category: "Crafts",
    href: "/crafts",
    description: "Bastar, Chhattisgarh • 280 Artisans • Vulnerable (GI-IN-0089)",
    icon: <Palette className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "c-3",
    title: "Kashmir Pashmina Handloom Weaving",
    category: "Crafts",
    href: "/crafts",
    description: "Srinagar & Ladakh • 320 Artisans • Vulnerable",
    icon: <Palette className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "c-4",
    title: "Toda Tribal Embroidery (Poothkuli)",
    category: "Crafts",
    href: "/revival",
    description: "Nilgiris, Tamil Nadu • 42 Artisans • Endangered Watchlist",
    icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
  },
  {
    id: "a-1",
    title: "Shanti Devi Jha (Master Artisan)",
    category: "Artisans",
    href: "/artisans",
    description: "National Awardee 2014 • Madhubani Guild • 38 yrs exp",
    icon: <Users className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "a-2",
    title: "Syed Ghulam Rasool (Master Weaver)",
    category: "Artisans",
    href: "/artisans",
    description: "Sant Kabir Award 2018 • Pashmina Handloom Guild",
    icon: <Users className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "s-1",
    title: "Market Signal: Surge in Folk Art Search",
    category: "Signals",
    href: "/ai",
    description: "Demand elasticity & fair-wage price advisory (+34%)",
    icon: <Sparkles className="w-4 h-4 text-heritage-gold" />,
  },
  {
    id: "r-1",
    title: "Eastern Riverine Folk Painting Corridor",
    category: "Regions",
    href: "/geography",
    description: "Bihar & Odisha • Demand Index 96 • 3,840 Artisans",
    icon: <MapPin className="w-4 h-4 text-sky-400" />,
  },
  {
    id: "n-1",
    title: "Sales & Fair-Trade Analytics",
    category: "Navigation",
    href: "/sales",
    description: "Gross turnover, direct artisan payouts & order telemetry",
    icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "n-2",
    title: "Product Provenance & Inventory",
    category: "Navigation",
    href: "/products",
    description: "Raw material traces, digital certification & stock",
    icon: <Package className="w-4 h-4 text-stone-400" />,
  },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = COMMAND_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: CommandItem) => {
    router.push(item.href);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian-950/80 backdrop-blur-md transition-opacity">
      <div
        className="w-full max-w-2xl bg-obsidian-850/95 border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] gap-3">
          <Search className="w-5 h-5 text-heritage-terracotta-light shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search artisans, crafts, GI products, regions, signals..."
            className="w-full bg-transparent text-white text-sm placeholder-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              No matching intelligence entities found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white/[0.08] border border-white/[0.12] text-white shadow-sm"
                      : "text-stone-300 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-obsidian-900 border border-white/[0.06] shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-stone-400">
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? "text-heritage-terracotta-light translate-x-0.5" : "text-stone-400 opacity-0"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-obsidian-900/80 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-stone-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-heritage-gold/80">KAARIGAR SETU • Omnisearch</span>
        </div>
      </div>
    </div>
  );
};
