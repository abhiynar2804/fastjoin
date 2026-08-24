import Link from "next/link";
import { ExternalLink } from "lucide-react";

type JobsTableProps = {
  jobs: {
    id: string;
    title: string;
    company: string;
    status: string;
    jobType: string;
    workMode: string;
    createdAt: Date;

    recruiter: {
      id: string;
      name: string;
      email: string;
    };

    _count: {
      applications: number;
    };
  }[];
};

export default function JobsTable({ jobs }: JobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-10 text-center text-zinc-500 dark:text-zinc-400">
        No jobs found matching your criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/50 text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
            <th className="px-4 py-3.5">Title</th>
            <th className="px-4 py-3.5">Company</th>
            <th className="px-4 py-3.5">Recruiter</th>
            <th className="px-4 py-3.5 text-center">Applications</th>
            <th className="px-4 py-3.5 text-center">Status</th>
            <th className="px-4 py-3.5 text-center">Type</th>
            <th className="px-4 py-3.5 text-center">Mode</th>
            <th className="px-4 py-3.5 text-center">Posted Date</th>
            <th className="px-4 py-3.5 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <td className="px-4 py-3.5 font-bold text-zinc-900 dark:text-zinc-100">
                {job.title}
              </td>

              <td className="px-4 py-3.5 font-semibold text-teal-600 dark:text-purple-400">
                {job.company}
              </td>

              <td className="px-4 py-3.5 text-xs text-zinc-600 dark:text-zinc-300">
                {job.recruiter.name}
              </td>

              <td className="px-4 py-3.5 text-center font-medium">
                {job._count.applications}
              </td>

              <td className="px-4 py-3.5 text-center">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    job.status === "OPEN"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
                  }`}
                >
                  {job.status}
                </span>
              </td>

              <td className="px-4 py-3.5 text-center text-xs">
                {job.jobType.replaceAll("_", " ")}
              </td>

              <td className="px-4 py-3.5 text-center text-xs">
                {job.workMode}
              </td>

              <td className="px-4 py-3.5 text-center text-xs text-zinc-500 dark:text-zinc-400">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3.5 text-center">
                <Link
                  href={`/admin/jobs/${job.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold brand-text hover:underline"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}