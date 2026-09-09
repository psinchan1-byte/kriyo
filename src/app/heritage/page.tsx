"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/common/GlassCard";
import { BookOpen, Award, Layers, Sparkles, ScrollText, CheckCircle2 } from "lucide-react";

export default function HeritagePage() {
  const heritageArchives = [
    {
      title: "Madhubani (Mithila) Painting Lineage",
      origin: "Mithila Antiquity (Ramayana Epical Period)",
      giCertificate: "GI-IN-0074 (Registered 2007)",
      materials: ["Handmade Paper", "Lampblack Soot", "Turmeric Extract", "Babul Gum"],
      documentationLevel: "Archived & Cryptographically Verified (Level 4)",
      mastersEnrolled: 540,
    },
    {
      title: "Dokra Lost-Wax Metallurgical Casting",
      origin: "Indus Valley Civilization (Mohenjo-daro Dancing Girl lineage)",
      giCertificate: "GI-IN-0089 (Registered 2008)",
      materials: ["Recycled Brass", "Natural Beeswax", "River Silt Clay"],
      documentationLevel: "Archived & Cryptographically Verified (Level 4)",
      mastersEnrolled: 280,
    },
    {
      title: "Kashmir Handspun Kani Pashmina",
      origin: "15th Century (Mir Sayyid Ali Hamadani & Zain-ul-Abidin)",
      giCertificate: "GI-IN-0046 (Registered 2008)",
      materials: ["Changthangi Capra Hircus Fleece", "Natural Vegetable Dye"],
      documentationLevel: "Archived & Cryptographically Verified (Level 4)",
      mastersEnrolled: 320,
    },
    {
      title: "Toda Tribal Counted-Thread Embroidery",
      origin: "Indigenous Nilgiris Pastoral Tribe Sacred Tradition",
      giCertificate: "GI-IN-0135 (Registered 2013)",
      materials: ["Unbleached Coarse Cotton", "Woollen Red-Black Yarn"],
      documentationLevel: "Endangerment Emergency Archive Protocol Active",
      mastersEnrolled: 42,
    },
  ];

  return (
    <PageContainer
      title="Heritage Documentation & Knowledge Graph"
      description="Digital preservation archive safeguarding the intangible cultural heritage, epical lineages, and raw material formulas of India's indigenous crafts."
      badge="NATIONAL KNOWLEDGE GRAPH"
    >
      {/* Knowledge Graph Status Card */}
      <GlassCard variant="highlighted" className="p-6 border border-heritage-gold/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-heritage-gold/15 border border-heritage-gold/30 flex items-center justify-center text-heritage-gold shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Intangible Cultural Heritage Knowledge Graph (ICH-KG)
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                Semantic ontologies mapping 142 GI crafts to 4,800 historical motifs, natural pigment formulas, and oral apprentice canons.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Immutable Provenance</span>
          </div>
        </div>
      </GlassCard>

      {/* Heritage Archives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {heritageArchives.map((archive, i) => (
          <GlassCard key={i} variant="interactive" className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">
                  Heritage Entity #{i + 1}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {archive.title}
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.06] text-stone-300 border border-white/[0.08]">
                {archive.giCertificate.split(" ")[0]}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Historical Lineage Origin:</span>
                <span className="text-stone-200 font-medium">{archive.origin}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px]">Traditional Raw Material Formula:</span>
                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  {archive.materials.map((mat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-obsidian-900 border border-white/[0.06] text-stone-300 font-mono text-[10px]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-stone-400 font-mono text-[11px]">
                <span>{archive.mastersEnrolled} Lineage Masters</span>
                <span className="text-heritage-terracotta-light">Registry Verified</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
