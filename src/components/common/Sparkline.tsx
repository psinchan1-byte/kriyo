import React from "react";

interface SparklineProps {
  data: number[];
  color?: "terracotta" | "emerald" | "gold" | "cyan" | "ruby";
  height?: number;
  width?: number;
  showFill?: boolean;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = "emerald",
  height = 36,
  width = 110,
  showFill = true,
  className = "",
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const padding = 4;
  const graphHeight = height - padding * 2;
  const graphWidth = width;

  // Calculate coordinates
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * graphWidth;
    const y = padding + graphHeight - ((val - min) / range) * graphHeight;
    return { x, y };
  });

  // Construct smooth Bezier curve path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    pathD += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  const fillD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const colorMap = {
    terracotta: {
      stroke: "#d9653b",
      fillStart: "rgba(217, 101, 59, 0.28)",
      fillEnd: "rgba(217, 101, 59, 0.0)",
    },
    emerald: {
      stroke: "#10b981",
      fillStart: "rgba(16, 185, 129, 0.28)",
      fillEnd: "rgba(16, 185, 129, 0.0)",
    },
    gold: {
      stroke: "#d4a359",
      fillStart: "rgba(212, 163, 89, 0.28)",
      fillEnd: "rgba(212, 163, 89, 0.0)",
    },
    cyan: {
      stroke: "#38bdf8",
      fillStart: "rgba(56, 189, 248, 0.28)",
      fillEnd: "rgba(56, 189, 248, 0.0)",
    },
    ruby: {
      stroke: "#ef4444",
      fillStart: "rgba(239, 68, 68, 0.28)",
      fillEnd: "rgba(239, 68, 68, 0.0)",
    },
  };

  const theme = colorMap[color] || colorMap.emerald;
  const gradientId = `sparkline-grad-${color}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div className={`inline-block select-none overflow-hidden ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.fillStart} />
            <stop offset="100%" stopColor={theme.fillEnd} />
          </linearGradient>
        </defs>
        {showFill && (
          <path d={fillD} fill={`url(#${gradientId})`} />
        )}
        <path
          d={pathD}
          fill="none"
          stroke={theme.stroke}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Endpoint marker dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2.5"
          fill={theme.stroke}
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};
