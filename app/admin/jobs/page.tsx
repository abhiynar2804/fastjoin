import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import JobsTable from "@/components/admin/JobsTable";

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

  const where = {
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          company: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          recruiter: {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    }),

    ...(status !== "ALL" && { status }),
    ...(jobType !== "ALL" && { jobType }),
    ...(workMode !== "ALL" && { workMode }),
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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Job Management</h1>

        <p className="text-gray-500">Manage all jobs posted on the platform.</p>
      </div>

      <form method="GET" className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search..."
          className="rounded-lg border px-4 py-2"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border px-4 py-2"
        >
          <option value="ALL">All Status</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          name="jobType"
          defaultValue={jobType}
          className="rounded-lg border px-4 py-2"
        >
          <option value="ALL">All Types</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FULL_TIME">Full Time</option>
        </select>

        <select
          name="workMode"
          defaultValue={workMode}
          className="rounded-lg border px-4 py-2"
        >
          <option value="ALL">All Modes</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ONSITE">On Site</option>
        </select>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Filter
        </button>
      </form>

      <JobsTable jobs={jobs} />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {Math.max(totalPages, 1)}
        </p>

        <div className="flex gap-2">
          {currentPage > 1 && (
            <a
              href={`?search=${search}&status=${status}&jobType=${jobType}&workMode=${workMode}&page=${currentPage - 1}`}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Previous
            </a>
          )}

          {currentPage < totalPages && (
            <a
              href={`?search=${search}&status=${status}&jobType=${jobType}&workMode=${workMode}&page=${currentPage + 1}`}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </>
  );
}
