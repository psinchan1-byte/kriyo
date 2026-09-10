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
      <body className="antialiased h-screen overflow-hidden bg-heritage-bg text-earth-dark relative font-sans">
        {/* Heritage Artwork & Ambient Liquid Glass Background */}
        <HeritageArtworkBackground />

        {/* Spatial Application Shell */}
        <div className="flex w-full h-screen overflow-hidden relative z-10">
          
          {/* LAYER 1: FIXED SIDEBAR (handled via Flex layout taking full static height) */}
          <div className="shrink-0 h-full z-40">
            <Sidebar />
          </div>
          
          {/* LAYER 2: SCROLLABLE MAIN WORKSPACE */}
          <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 w-full overflow-hidden bg-transparent">
            
            <Header />
            
            {/* Dedicated Main Scroll Area */}
            <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative w-full p-6 md:p-8">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}
