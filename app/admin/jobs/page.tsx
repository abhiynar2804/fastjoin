import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import JobsTable from "@/components/admin/JobsTable";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    jobType?: string;
    workMode?: string;
    page?: string;
  }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const {
    search = "",
    status = "ALL",
    jobType = "ALL",
    workMode = "ALL",
    page = "1",
  } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 10;

  const where: any = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        {
          recruiter: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      ],
    }),

    ...(status !== "ALL" && { status: status as any }),
    ...(jobType !== "ALL" && { jobType: jobType as any }),
    ...(workMode !== "ALL" && { workMode: workMode as any }),
  };

  const totalJobs = await prisma.job.count({
    where,
  });

  const totalPages = Math.ceil(totalJobs / pageSize);

  const jobs = await prisma.job.findMany({
    where,

    skip: (currentPage - 1) * pageSize,
    take: pageSize,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      recruiter: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Platform Job Postings
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage all employer listings, verify job statuses, and monitor applicant metrics.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 self-start sm:self-auto">
          {totalJobs} Total Jobs
        </span>
      </div>

      {/* Filters Bar */}
      <form method="GET" className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <div className="relative md:col-span-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search job or recruiter..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
          />
        </div>

        <select
          name="status"
          defaultValue={status}
          className="px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
        >
          <option value="ALL" className="dark:bg-zinc-900">All Status</option>
          <option value="OPEN" className="dark:bg-zinc-900">Open</option>
          <option value="CLOSED" className="dark:bg-zinc-900">Closed</option>
        </select>

        <select
          name="jobType"
          defaultValue={jobType}
          className="px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
        >
          <option value="ALL" className="dark:bg-zinc-900">All Types</option>
          <option value="INTERNSHIP" className="dark:bg-zinc-900">Internship</option>
          <option value="FULL_TIME" className="dark:bg-zinc-900">Full Time</option>
        </select>

        <select
          name="workMode"
          defaultValue={workMode}
          className="px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
        >
          <option value="ALL" className="dark:bg-zinc-900">All Modes</option>
          <option value="REMOTE" className="dark:bg-zinc-900">Remote</option>
          <option value="HYBRID" className="dark:bg-zinc-900">Hybrid</option>
          <option value="ONSITE" className="dark:bg-zinc-900">On Site</option>
        </select>

        <button className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl font-medium text-sm text-white btn-primary shadow-sm">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </form>

      {/* Jobs Table */}
      <JobsTable jobs={jobs} />

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          Page <span className="font-bold text-zinc-800 dark:text-zinc-200">{currentPage}</span> of{" "}
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{Math.max(totalPages, 1)}</span>
        </p>

        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <a
              href={`?search=${search}&status=${status}&jobType=${jobType}&workMode=${workMode}&page=${currentPage - 1}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </a>
          )}

          {currentPage < totalPages && (
            <a
              href={`?search=${search}&status=${status}&jobType=${jobType}&workMode=${workMode}&page=${currentPage + 1}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
