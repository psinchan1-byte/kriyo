import React, { useState } from 'react';

const data = [
  { region: "Delhi NCR", val: 35 },
  { region: "Mumbai", val: 25 },
  { region: "Bengaluru", val: 20 },
  { region: "West Bengal", val: 12 },
  { region: "Bihar", val: 8 }
];

export const RegionalDemandChart = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 600;
  const height = 250;
  const padding = 40;

  const barWidth = 40;
  const spacing = (width - padding * 2) / data.length;

  return (
    <div className="w-full overflow-x-auto bg-white/60 p-4 rounded-xl border border-[#B96D43]/10">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[400px]">
        {/* Grid lines */}
        {[0, 10, 20, 30, 40].map((val, i) => {
          const y = height - padding - (val / 40) * (height - padding * 2);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#B96D43" strokeOpacity="0.1" strokeDasharray="4 4" />
              <text x={padding - 5} y={y + 4} fontSize="10" fill="#9A887C" textAnchor="end">{val}%</text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const x = padding + (i + 0.5) * spacing - barWidth / 2;
          const barHeight = (d.val / 40) * (height - padding * 2);
          const y = height - padding - barHeight;

          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer group"
            >
              <rect 
                x={x} 
                y={y} 
                width={barWidth} 
                height={barHeight} 
                rx="4" 
                fill="#B96D43" 
                className="transition-all duration-300 group-hover:fill-[#9c5934]" 
              />
              
              <text x={x + barWidth / 2} y={height - padding + 20} fontSize="12" fill="#49372A" textAnchor="middle" fontWeight="bold">
                {d.region}
              </text>
              
              {hoveredIdx === i && (
                <g>
                  <rect x={x + barWidth / 2 - 20} y={y - 25} width="40" height="20" rx="4" fill="#49372A" />
                  <text x={x + barWidth / 2} y={y - 11} fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
                    {d.val}%
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
