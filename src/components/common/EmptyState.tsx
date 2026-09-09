import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "p-10 text-center bg-obsidian-850/60 backdrop-blur-xl rounded-xl border border-dashed border-white/[0.12] flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-heritage-terracotta/20 to-heritage-gold/10 border border-heritage-terracotta/30 flex items-center justify-center text-heritage-terracotta-light shadow-glow-terracotta">
        {icon || <Sparkles className="w-5 h-5" />}
      </div>
      <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-stone-400 max-w-md mx-auto mt-1.5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 bg-gradient-to-r from-heritage-terracotta to-heritage-terracotta-dark text-white text-xs font-semibold rounded-lg hover:brightness-110 shadow-glow-terracotta transition-all active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

