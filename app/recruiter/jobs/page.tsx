import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRecruiter } from "@/lib/auth";
import {
  PlusCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Users,
  Calendar,
} from "lucide-react";

export default async function RecruiterJobsPage() {
  const session = await requireRecruiter();

  const jobs = await prisma.job.findMany({
    where: {
      recruiterId: session.user.id,
    },
    include: {
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            My Job Postings
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your active role openings, review job details, and track applicant counts.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white btn-primary shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Job</span>
        </Link>
      </div>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-2xl btn-primary mx-auto flex items-center justify-center text-white">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No Job Postings Yet</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Start recruiting by creating your first job opening.
            </p>
          </div>
          <Link
            href="/recruiter/jobs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white btn-primary shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Job Listing</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {job.title}
                    </h2>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        job.status === "OPEN"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-teal-600 dark:text-purple-400 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <Users className="w-4 h-4 text-teal-600 dark:text-purple-400" />
                    <span>{job._count.applications} Applicants</span>
                  </span>
                </div>
              </div>

              {/* Tags & Metadata */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-lg">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-lg">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{job.salary}</span>
                </div>

                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{job.jobType.replaceAll("_", " ")} • {job.workMode}</span>
                </div>

                <div className="flex items-center gap-1 ml-auto text-[11px] text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}