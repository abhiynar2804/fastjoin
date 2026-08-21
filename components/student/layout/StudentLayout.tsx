"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface StudentLayoutProps {
  children: React.ReactNode;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    profileImage?: string | null;
  } | null;
}

export default function StudentLayout({
  children,
  user,
}: StudentLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="flex flex-1">
        {/* Collapsible Hamburger Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area with Navbar and Footer */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Navbar
            user={user}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            setIsMobileOpen={setIsMobileOpen}
          />

          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}