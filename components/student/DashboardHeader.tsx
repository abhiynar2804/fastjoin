import { auth } from "@/auth";

export default async function DashboardHeader() {
  const session = await auth();

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full btn-primary uppercase tracking-wider">
            Placement Season 2026
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome back, {session?.user?.name || "Student"}! 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Here's your personal overview of ongoing applications, saved opportunities, and placement progress.
        </p>
      </div>
    </div>
  );
}