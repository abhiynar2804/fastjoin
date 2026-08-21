"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Users,
  X,
  ChevronRight,
  Building2,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { name: "My Jobs", href: "/recruiter/jobs", icon: Briefcase },
  { name: "Post New Job", href: "/recruiter/jobs/create", icon: PlusCircle },
  { name: "Applications", href: "/recruiter/applications", icon: Users },
];

interface RecruiterSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function RecruiterSidebar({
  isCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: RecruiterSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-5 px-3">
      {/* Top Section: Logo Header */}
      <div>
        <div className="flex items-center justify-between px-3 mb-6 h-10">
          <Link href="/recruiter/dashboard" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white btn-primary shadow-md shadow-teal-500/20 dark:shadow-purple-500/20 transition-transform group-hover:scale-105 shrink-0">
              F
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 block leading-tight">
                  FastJoin
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 dark:text-purple-400 block leading-none">
                  Employer
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close Mobile Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 px-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/recruiter/dashboard" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? link.name : undefined}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-purple-600/20 dark:text-purple-300 dark:border dark:border-purple-500/30 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                {/* Left Active Pill Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full btn-primary" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive
                      ? "text-white dark:text-purple-400"
                      : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1">{link.name}</span>
                )}

                {!isCollapsed && isActive && (
                  <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Badge */}
      {!isCollapsed && (
        <div className="p-3 mx-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-teal-600 dark:text-purple-400 shrink-0" />
          <div>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">Recruiter Console</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Campus Hiring 2026</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Collapsible) */}
      <aside
        className={`hidden md:block h-screen sticky top-0 border-r border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-all duration-300 z-30 shrink-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Mobile Sidebar (Slide-over Drawer) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
