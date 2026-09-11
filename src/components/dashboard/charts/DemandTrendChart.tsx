import React, { useState } from 'react';

const data = [
  { day: 1, value: 62 },
  { day: 5, value: 65 },
  { day: 10, value: 68 },
  { day: 15, value: 71 },
  { day: 20, value: 75 },
  { day: 25, value: 79 },
  { day: 30, value: 83 }
];

export const DemandTrendChart = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 600;
  const height = 200;
  const padding = 30;

  const minX = Math.min(...data.map(d => d.day));
  const maxX = Math.max(...data.map(d => d.day));
  const minY = Math.min(...data.map(d => d.value)) - 5;
  const maxY = Math.max(...data.map(d => d.value)) + 5;

  const getX = (day: number) => padding + ((day - minX) / (maxX - minX)) * (width - padding * 2);
  const getY = (val: number) => height - padding - ((val - minY) / (maxY - minY)) * (height - padding * 2);

  const pathD = `M ${data.map(d => `${getX(d.day)},${getY(d.value)}`).join(' L ')}`;
  
  return (
    <div className="w-full overflow-x-auto bg-white/60 p-4 rounded-xl border border-[#B96D43]/10">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[400px]">
        {/* Grid */}
        {[minY, (minY+maxY)/2, maxY].map((val, i) => (
          <g key={i}>
            <line x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} stroke="#B96D43" strokeOpacity="0.15" strokeDasharray="4 4" />
            <text x={padding - 5} y={getY(val) + 4} fontSize="10" fill="#9A887C" textAnchor="end">{Math.round(val)}</text>
          </g>
        ))}

        {/* X Axis labels */}
        {[1, 10, 20, 30].map((day, i) => (
          <text key={i} x={getX(day)} y={height - 10} fontSize="10" fill="#9A887C" textAnchor="middle">Day {day}</text>
        ))}

        {/* Line */}
        <path d={pathD} fill="none" stroke="#B96D43" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {data.map((d, i) => (
          <g 
            key={i} 
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="cursor-pointer"
          >
            <circle cx={getX(d.day)} cy={getY(d.value)} r="6" fill="#FFFDF8" stroke="#B96D43" strokeWidth="2" className="transition-all hover:r-8 hover:fill-[#B96D43]" />
            {hoveredIdx === i && (
              <g>
                <rect x={getX(d.day) - 30} y={getY(d.value) - 35} width="60" height="25" rx="4" fill="#49372A" />
                <text x={getX(d.day)} y={getY(d.value) - 18} fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">Day {d.day}: {d.value}</text>
              </g>
            )}
          </g>
        ))}
      </svg>
      <div className="flex justify-between mt-2 text-[10px] text-[#6E5D53] font-mono">
        <span>30 days ago</span>
        <span>Demand Index (Up 34%)</span>
        <span>Today</span>
      </div>
    </div>
  );
};
