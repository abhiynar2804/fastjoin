import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md py-6 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-white btn-primary text-xs">
            F
          </div>
          <div>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">FastJoin</span>
            <span className="mx-2">•</span>
            <span>Smart Placement Portal</span>
          </div>
        </div>

        {/* Center: Quick Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/student/dashboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Dashboard
          </Link>
          <Link href="/student/jobs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Jobs
          </Link>
          <Link href="/student/saved-jobs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Saved Jobs
          </Link>
          <Link href="/student/applications" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Applications
          </Link>
          <Link href="/student/resume" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Resume
          </Link>
        </nav>

        {/* Right: Copyright */}
        <div>
          © {new Date().getFullYear()} FastJoin. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
