import Link from "next/link";
import { ArrowRight, Briefcase, Users } from "lucide-react";

type RecruiterRecentJobsProps = {
  jobs: {
    id: string;
    title: string;
    company: string;
    status: string;
    _count: {
      applications: number;
    };
  }[];
};

export default function RecruiterRecentJobs({ jobs }: RecruiterRecentJobsProps) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-600 dark:text-purple-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Active Job Postings
            </h2>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {jobs.length} Active
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400 text-sm">
            You haven't posted any jobs yet.
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="overflow-hidden">
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {job.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {job.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      job.status === "OPEN"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
                    }`}
                  >
                    {job.status}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5" />
                    <span>{job._count.applications}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href="/recruiter/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold brand-text hover:underline"
        >
          <span>Manage All Job Listings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}