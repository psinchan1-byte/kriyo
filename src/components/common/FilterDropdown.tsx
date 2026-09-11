import React from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  icon?: React.ReactNode;
}

export function FilterDropdown({
  label,
  value,
  onChange,
  options,
  icon,
}: FilterDropdownProps) {
  return (
    <div className="relative shrink-0">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none pl-8 pr-8 py-1.5 rounded-lg bg-[#FFFDF8]/90 border border-[#B8794A]/20 text-earth-dark text-xs focus:outline-none focus:border-heritage-terracotta focus:ring-1 focus:ring-heritage-terracotta/30 shadow-inner-light w-full min-w-[140px] font-medium cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-earth-muted flex items-center justify-center">
          {icon || <div className="w-3.5 h-3.5" />}
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-earth-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
