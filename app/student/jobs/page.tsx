import SearchBar from "@/components/student/jobs/SearchBar";
import JobFilters from "@/components/student/jobs/JobFilters";
import JobList from "@/components/student/jobs/JobList";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";
import { BriefcaseBusiness } from "lucide-react";

export default async function JobsPage() {
  await requireStudent();

  const jobs = await prisma.job.findMany({
    where: {
      status: "OPEN",
      deadline: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600 dark:text-purple-400">
            Find your next opportunity
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Explore Jobs
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Browse open roles matched to your placement goals.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <BriefcaseBusiness className="h-4 w-4 text-teal-600 dark:text-purple-400" />
          {jobs.length} open {jobs.length === 1 ? "role" : "roles"}
        </div>
      </div>

      <SearchBar />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <JobFilters />

        <div className="lg:col-span-3">
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
}
