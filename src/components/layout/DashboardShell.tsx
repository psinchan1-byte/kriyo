"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kriyo-sidebar-collapsed");
    if (saved) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("kriyo-sidebar-collapsed", String(newState));
  };

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden relative z-10">
        <div className="shrink-0 h-full z-40">
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 w-full overflow-hidden bg-transparent">
          <Header />
          <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative w-full p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
      
      {/* Right Side Floating Control */}
      <button
        onClick={toggleSidebar}
        className="fixed right-0 top-1/2 -translate-y-1/2 w-10 h-24 bg-[#FFFDF8]/90 backdrop-blur-md border border-r-0 border-[#B96D43]/30 text-[#6E5D53] hover:text-[#B96D43] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-[1.03] z-50 cursor-pointer rounded-l-full shadow-[#B96D43]/10"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </>
  );
}
