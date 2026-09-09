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
        "p-10 text-center bg-[#FFFDF8]/80 backdrop-blur-xl rounded-2xl border border-dashed border-[#B8794A]/25 flex flex-col items-center justify-center shadow-sm",
        className
      )}
    >
      <div className="w-12 h-12 mb-4 rounded-2xl bg-gradient-to-br from-[#B8794A]/15 to-[#C89B6D]/15 border border-[#B8794A]/30 flex items-center justify-center text-[#B8794A] shadow-sm">
        {icon || <Sparkles className="w-5 h-5" />}
      </div>
      <h3 className="text-base font-bold text-[#2C221E] tracking-tight">{title}</h3>
      <p className="text-xs text-[#6E5D53] font-medium max-w-md mx-auto mt-1.5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 bg-gradient-to-r from-[#B8794A] to-[#965C34] text-white text-xs font-bold rounded-xl hover:brightness-105 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

