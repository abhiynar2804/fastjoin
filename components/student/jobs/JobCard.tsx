import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  WalletCards,
} from "lucide-react";

type Props = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  workMode: string;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  workMode,
}: Props) {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-purple-500/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-purple-500/10 dark:text-purple-400">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            <p className="mt-1 truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {company}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-700 dark:bg-purple-500/10 dark:text-purple-300">
          Open
        </span>
      </div>

      <div className="mt-5 grid gap-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-teal-600 dark:text-purple-400" />
          <span className="truncate">{location}</span>
        </p>
        <p className="flex items-center gap-2">
          <WalletCards className="h-4 w-4 text-teal-600 dark:text-purple-400" />
          <span className="truncate">{salary}</span>
        </p>
        <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {jobType.replaceAll("_", " ")}
        </span>
        <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {workMode}
        </span>
      </div>

      <Link
        href={`/student/jobs/${id}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold brand-text transition-colors hover:underline"
      >
        View details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
