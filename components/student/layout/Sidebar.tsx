"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";

const links = [
  { name: "Dashboard", href: "/student/dashboard" },
  { name: "Jobs", href: "/student/jobs" },
  { name: "Saved Jobs", href: "/student/saved-jobs" },
  { name: "Applications", href: "/student/applications" },
  { name: "Resume", href: "/student/resume" },
  { name: "Profile", href: "/student/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">FastJoin</h1>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded p-2 ${
              pathname === link.href ? "bg-blue-600 text-white" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <LogoutButton />
    </aside>
  );
}