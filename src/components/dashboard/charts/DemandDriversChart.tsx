import React, { useState } from 'react';

const data = [
  { label: "Search Volume", val: 85, metric: "+42%" },
  { label: "Buyer Saves/Wishlists", val: 75, metric: "+38%" },
  { label: "Festival Demand", val: 65, metric: "+25%" },
  { label: "Regional Interest (NCR/BLR)", val: 90, metric: "+55%" }
];

export const DemandDriversChart = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 600;
  const height = data.length * 40 + 40;
  
  return (
    <div className="w-full overflow-x-auto bg-white/60 p-4 rounded-xl border border-[#B96D43]/10">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[400px]">
        {data.map((d, i) => {
          const y = i * 40 + 20;
          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer group"
            >
              {/* Background Track */}
              <rect x="200" y={y} width="350" height="12" rx="6" fill="#EFE6D7" />
              
              {/* Value Bar */}
              <rect 
                x="200" 
                y={y} 
                width={3.5 * d.val} 
                height="12" 
                rx="6" 
                fill="#3F7A61" 
                className="transition-all duration-300 group-hover:fill-[#2a5442]" 
              />
              
              {/* Labels */}
              <text x="190" y={y + 10} fontSize="12" fill="#49372A" textAnchor="end" fontWeight="bold">
                {d.label}
              </text>
              
              <text x={200 + 3.5 * d.val + 10} y={y + 10} fontSize="12" fill="#3F7A61" fontWeight="bold">
                {d.metric}
              </text>
              
              {/* Tooltip */}
              {hoveredIdx === i && (
                <g>
                  <rect x={200 + (3.5 * d.val) / 2 - 25} y={y - 25} width="50" height="20" rx="4" fill="#49372A" />
                  <text x={200 + (3.5 * d.val) / 2} y={y - 11} fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
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
