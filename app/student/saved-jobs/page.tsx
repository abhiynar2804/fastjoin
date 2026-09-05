import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";
import JobCard from "@/components/student/jobs/JobCard";
import { Bookmark } from "lucide-react";

export default async function SavedJobsPage() {
  const session = await requireStudent();

  const savedJobs = await prisma.savedJob.findMany({
    where: {
      studentId: session.user.id,
    },
    include: {
      job: true,
    },
    orderBy: {
      savedAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600 dark:text-purple-400">
            Keep your shortlist close
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Saved Jobs
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Revisit opportunities you want to explore later.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Bookmark className="h-4 w-4 text-teal-600 dark:text-purple-400" />
          {savedJobs.length} saved
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
          <Bookmark className="mx-auto h-9 w-9 text-zinc-400" />
          <h2 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No saved jobs yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Jobs you save will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((savedJob) => (
            <JobCard
              key={savedJob.id}
              id={savedJob.job.id}
              title={savedJob.job.title}
              company={savedJob.job.company}
              location={savedJob.job.location}
              salary={savedJob.job.salary}
              jobType={savedJob.job.jobType}
              workMode={savedJob.job.workMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
