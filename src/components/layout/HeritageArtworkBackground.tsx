"use client";

import React from "react";

/**
 * Heritage Artwork & Ambient Layered Background
 * Layer 1: Warm Ivory Base (#F6F1E8)
 * Layer 2: Subtle Indian Folk-Art Line Motifs (Madhubani, Kalamkari, Warli geometry)
 * Layer 3: Soft Atmospheric Ambient Glow Spheres with 24s CSS keyframes
 * 
 * 100% SSR-deterministic: No Math.random(), no window/document calls during render.
 */
export const HeritageArtworkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft warm gradient ambient glow spheres (Layer 3 - Atmospheric layer with slow 24s CSS pulse) */}
      <div
        className="absolute -top-44 -left-44 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-40 mix-blend-multiply animate-ambient-sphere"
        style={{
          background: "radial-gradient(circle, rgba(199, 162, 124, 0.28) 0%, rgba(246, 241, 232, 0) 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-35 mix-blend-multiply animate-ambient-sphere"
        style={{
          background: "radial-gradient(circle, rgba(185, 109, 67, 0.22) 0%, rgba(246, 241, 232, 0) 70%)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="absolute -bottom-36 left-1/3 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 mix-blend-multiply animate-ambient-sphere"
        style={{
          background: "radial-gradient(circle, rgba(181, 138, 80, 0.20) 0%, rgba(246, 241, 232, 0) 70%)",
          animationDelay: "-16s",
        }}
      />

      {/* Traditional Indian Folk Art (Madhubani & Mandala Motif Watermark - Top Right) */}
      <svg
        className="absolute top-10 right-10 w-96 h-96 text-[#B96D43] opacity-[0.045] transform rotate-12 animate-ambient-mandala"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Concentric Mandala Rings */}
        <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="72" />
        <circle cx="100" cy="100" r="54" strokeDasharray="6 4" />
        <circle cx="100" cy="100" r="36" />
        <circle cx="100" cy="100" r="18" />
        {/* Radial Petals */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <path d="M 100 28 Q 110 46 100 64 Q 90 46 100 28 Z" fill="currentColor" fillOpacity="0.1" />
            <line x1="100" y1="10" x2="100" y2="28" />
            <circle cx="100" cy="10" r="2.5" fill="currentColor" />
          </g>
        ))}
      </svg>

      {/* Second Kalamkari/Warli Motif (Bottom Left) */}
      <svg
        className="absolute -bottom-28 -left-28 w-[38rem] h-[38rem] text-[#C7A27C] opacity-[0.04]"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="150" cy="150" r="140" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="110" />
        <circle cx="150" cy="150" r="80" strokeDasharray="8 4" />
        <circle cx="150" cy="150" r="50" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 150 150)`}>
            <polygon points="150,40 162,70 138,70" fill="currentColor" fillOpacity="0.08" />
            <line x1="150" y1="10" x2="150" y2="40" />
          </g>
        ))}
      </svg>

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-heritage-grid opacity-60" />
    </div>
  );
};
