import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    role?: string;
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

  const { search = "", role = "ALL", page = "1" } = await searchParams;

  const currentPage = Number(page);
  const pageSize = 10;

  const where: any = {
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          publicId: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),

    ...(role !== "ALL" && {
      role: role as any,
    }),
  };

  const totalUsers = await prisma.user.count({
    where,
  });

  const totalPages = Math.ceil(totalUsers / pageSize);

  const users = await prisma.user.findMany({
    where,

    skip: (currentPage - 1) * pageSize,
    take: pageSize,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          applications: true,
          jobs: true,
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
            User Management Directory
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Oversee registered accounts for Students, Recruiters, and Admins across the placement portal.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 self-start sm:self-auto">
          {totalUsers} Total Accounts
        </span>
      </div>

      {/* Search & Role Filter Bar */}
      <form method="GET" className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by name, email or public ID..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
          />
        </div>

        <select
          name="role"
          defaultValue={role}
          className="px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
        >
          <option value="ALL" className="dark:bg-zinc-900">All Roles</option>
          <option value="STUDENT" className="dark:bg-zinc-900">Student</option>
          <option value="RECRUITER" className="dark:bg-zinc-900">Recruiter</option>
          <option value="ADMIN" className="dark:bg-zinc-900">Admin</option>
        </select>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl font-medium text-sm text-white btn-primary shadow-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Apply Filter</span>
        </button>
      </form>

      {/* Users Table */}
      <UsersTable users={users} />

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          Showing Page <span className="font-bold text-zinc-800 dark:text-zinc-200">{currentPage}</span> of{" "}
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{Math.max(totalPages, 1)}</span>
        </p>

        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <a
              href={`?search=${search}&role=${role}&page=${currentPage - 1}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </a>
          )}

          {currentPage < totalPages && (
            <a
              href={`?search=${search}&role=${role}&page=${currentPage + 1}`}
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