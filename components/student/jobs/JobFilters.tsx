export default function JobFilters() {
  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-purple-400">
          Refine results
        </p>
        <h2 className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Filters
        </h2>
      </div>

      <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        Job type
        <select className="input-focus mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          <option>All Job Types</option>
          <option>Internship</option>
          <option>Full Time</option>
        </select>
      </label>

      <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        Work mode
        <select className="input-focus mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          <option>All Work Modes</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
      </label>
    </div>
  );
}
