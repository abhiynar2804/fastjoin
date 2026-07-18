import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import UsersTable from "@/components/admin/UsersTable";

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

  const totalUsers = await prisma.user.count({
    where: {
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
        role,
      }),
    },
  });

  const totalPages = Math.ceil(totalUsers / pageSize);

  const users = await prisma.user.findMany({
    where: {
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
        role,
      }),
    },

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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>

        <p className="text-gray-500">Manage students, recruiters and admins.</p>
      </div>

      <form className="mb-6 flex flex-col gap-4 md:flex-row" method="GET">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name, email or ID..."
          className="rounded-lg border px-4 py-2 md:w-80"
        />

        <select
          name="role"
          defaultValue={role}
          className="rounded-lg border px-4 py-2"
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="RECRUITER">Recruiter</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Filter
        </button>
      </form>

      <UsersTable users={users} />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {Math.max(totalPages, 1)}
        </p>

        <div className="flex gap-2">
          {currentPage > 1 && (
            <a
              href={`?search=${search}&role=${role}&page=${currentPage - 1}`}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Previous
            </a>
          )}

          {currentPage < totalPages && (
            <a
              href={`?search=${search}&role=${role}&page=${currentPage + 1}`}
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
