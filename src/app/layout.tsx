import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HeritageArtworkBackground } from "@/components/layout/HeritageArtworkBackground";
import { PLATFORM_NAME, PLATFORM_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${PLATFORM_NAME} — Heritage Intelligence Platform`,
  description: `${PLATFORM_TAGLINE}. Real-time monitoring, AI telemetry, and preservation intelligence for India's craft ecosystem.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-[#F6F1E8] text-[#49372A] flex selection:bg-[#B96D43]/20 selection:text-[#49372A] relative font-sans overflow-hidden"
      >
        {/* Heritage Artwork & Ambient Liquid Glass Background */}
        <HeritageArtworkBackground />

        {/* Spatial Application Shell */}
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
          <Header />
          <main className="flex-1 overflow-y-auto flex flex-col relative">{children}</main>
        </div>
      </body>
    </html>
  );
}
