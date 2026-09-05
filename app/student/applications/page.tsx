import Link from "next/link";
import { ArrowRight, Building2, FileCheck, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";

export default async function ApplicationsPage() {
  const session = await requireStudent();

  const applications = await prisma.application.findMany({
    where: {
      studentId: session.user.id,
    },
    include: {
      job: true,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600 dark:text-purple-400">
            Stay on top of your progress
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            My Applications
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Track every role you have applied to in one place.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <FileCheck className="h-4 w-4 text-teal-600 dark:text-purple-400" />
          {applications.length} submitted
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
          <FileCheck className="mx-auto h-9 w-9 text-zinc-400" />
          <h2 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No applications yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Jobs you apply for will appear here.
          </p>

          <Link
            href="/student/jobs"
            className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm"
          >
            Browse jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {application.job.title}
                    </h2>
                    <p className="mt-1 truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {application.job.company}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                      <MapPin className="h-4 w-4" /> {application.job.location}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                      Applied on: {application.appliedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300">
                  {application.status.replaceAll("_", " ")}
                </span>
              </div>

              <Link
                href={`/student/jobs/${application.job.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold brand-text hover:underline"
              >
                View details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
