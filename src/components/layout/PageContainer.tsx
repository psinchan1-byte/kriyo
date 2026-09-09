import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  badge,
  actions,
  children,
  className = "",
}) => {
  return (
    <div className={cn("flex-1 p-5 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full", className)}>
      <div className="pb-6 mb-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-heritage-terracotta/20 text-heritage-terracotta-light border border-heritage-terracotta/30">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

