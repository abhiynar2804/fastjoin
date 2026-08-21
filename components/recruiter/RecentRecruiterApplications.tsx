import Link from "next/link";
import { ArrowRight, Users, User } from "lucide-react";

type RecentRecruiterApplicationsProps = {
  applications: {
    id: string;
    status: string;
    student: {
      name: string;
    };
    job: {
      title: string;
    };
  }[];
};

export default function RecentRecruiterApplications({
  applications,
}: RecentRecruiterApplicationsProps) {
  const getStatusBadge = (status: string) => {
    const s = status.toUpperCase();
    if (s === "SELECTED") {
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    }
    if (s === "SHORTLISTED") {
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    }
    if (s === "REJECTED") {
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    }
    if (s === "UNDER_REVIEW") {
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
    return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
  };

  return (
    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600 dark:text-purple-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Recent Applications
            </h2>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {applications.length} Received
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400 text-sm">
            No applicant submissions received yet.
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg btn-primary flex items-center justify-center text-white shrink-0 font-bold text-xs">
                    {application.student.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                      {application.student.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      Applied for: {application.job.title}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${getStatusBadge(
                    application.status
                  )}`}
                >
                  {application.status.replaceAll("_", " ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href="/recruiter/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold brand-text hover:underline"
        >
          <span>View All Applications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}