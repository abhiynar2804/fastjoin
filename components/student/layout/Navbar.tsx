"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Menu,
  Bell,
  User as UserIcon,
  LogOut,
  Bookmark,
  FileCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface NavbarProps {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    profileImage?: string | null;
  } | null;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  user,
  isCollapsed,
  setIsCollapsed,
  setIsMobileOpen,
}: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map route to page title
  const getPageTitle = () => {
    if (!pathname) return "Student Dashboard";
    if (pathname === "/student/dashboard") return "Student Dashboard";
    if (pathname.startsWith("/student/jobs")) return "Explore Jobs";
    if (pathname.startsWith("/student/saved-jobs")) return "Saved Jobs";
    if (pathname.startsWith("/student/applications")) return "My Applications";
    if (pathname.startsWith("/student/resume")) return "My Resume";
    if (pathname.startsWith("/student/profile")) return "Student Profile";
    return "Student Portal";
  };

  // Generate User Initials for Avatar Fallback
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "S";

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 transition-colors">
      
      {/* Left: Hamburger Toggle & Page Title */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop Hamburger Toggle Button */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="hidden md:flex items-center justify-center p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Hamburger Drawer Open Button */}
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title & Breadcrumb */}
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Actions & User Profile Dropdown */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Switcher */}
        <ThemeToggle />

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full btn-primary ring-2 ring-white dark:ring-zinc-950" />
        </button>

        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

        {/* Top-Right Profile Icon & Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/40 dark:focus:ring-purple-500/40"
            aria-expanded={dropdownOpen}
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name || "Student Avatar"}
                className="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-full btn-primary flex items-center justify-center font-bold text-sm text-white shadow-sm shadow-teal-500/20 dark:shadow-purple-500/20">
                {initials}
              </div>
            )}

            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-semibold leading-tight text-zinc-900 dark:text-zinc-100 max-w-[120px] truncate">
                {user?.name || "Student"}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Student Account
              </p>
            </div>

            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Profile Dropdown Content */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/10 dark:shadow-black/40 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Profile Summary Header */}
              <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name || "Student"}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full btn-primary flex items-center justify-center font-bold text-sm text-white">
                    {initials}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {user?.name || "Student"}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {user?.email || "student@example.com"}
                  </p>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1 px-1.5 space-y-0.5">
                <Link
                  href="/student/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-teal-600 dark:text-purple-400" />
                  <span>My Profile & Picture</span>
                </Link>

                <Link
                  href="/student/applications"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                >
                  <FileCheck className="w-4 h-4 text-zinc-500" />
                  <span>My Applications</span>
                </Link>

                <Link
                  href="/student/saved-jobs"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
                >
                  <Bookmark className="w-4 h-4 text-zinc-500" />
                  <span>Saved Jobs</span>
                </Link>
              </div>

              {/* Logout Section */}
              <div className="pt-1 mt-1 border-t border-zinc-100 dark:border-zinc-800 px-1.5">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}