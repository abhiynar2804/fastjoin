import SearchBar from "@/components/student/jobs/SearchBar";
import JobFilters from "@/components/student/jobs/JobFilters";
import JobList from "@/components/student/jobs/JobList";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";

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
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Jobs
      </h1>

      <SearchBar />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <JobFilters />

        <div className="lg:col-span-3">
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
}