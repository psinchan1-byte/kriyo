import type { Metadata } from "next";
import "./globals.css";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HeritageArtworkBackground } from "@/components/layout/HeritageArtworkBackground";
import { PLATFORM_NAME, PLATFORM_TAGLINE } from "@/lib/constants";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: `${PLATFORM_NAME} — Heritage Intelligence Platform`,
  description: `${PLATFORM_TAGLINE}. Real-time monitoring, AI telemetry, and preservation intelligence for India's craft ecosystem.`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname.startsWith("/login");

  if (isLoginPage) {
    return (
      <html lang="en" className="light" suppressHydrationWarning>
        <body suppressHydrationWarning className="antialiased min-h-screen bg-[#FFFFFF] font-sans">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased h-screen overflow-hidden text-earth-dark relative font-sans">
        {/* Render fixed decorative background first */}
        <HeritageArtworkBackground />

        {/* Render Shell which contains Sidebar + Main Content */}
        <DashboardShell>
          {children}
        </DashboardShell>
      </body>
    </html>
  );
}
