import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-obsidian-950 text-stone-100 flex selection:bg-heritage-terracotta/40 selection:text-white relative font-sans overflow-hidden">
        {/* Subtle Ambient Heritage Light Glows */}
        <div className="fixed top-[-100px] right-[15%] w-[550px] h-[550px] bg-heritage-terracotta/[0.045] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="fixed bottom-[-80px] left-[25%] w-[480px] h-[480px] bg-heritage-gold/[0.04] rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="fixed inset-0 bg-heritage-grid pointer-events-none z-0 opacity-40" />

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
