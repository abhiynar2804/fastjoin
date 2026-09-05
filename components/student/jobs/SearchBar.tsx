"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
      <input
        type="search"
        placeholder="Search jobs by title, company, or location"
        aria-label="Search jobs"
        className="input-focus h-12 w-full rounded-xl border border-zinc-200 bg-white/70 pl-12 pr-4 text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
      />
    </label>
  );
}
