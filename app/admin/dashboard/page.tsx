import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/layout/LogoutButton";

import { prisma } from "@/lib/prisma";

import AdminStatsSection from "@/components/admin/AdminStatsSection";
import RecentUsers from "@/components/admin/RecentUsers";
import RecentJobs from "@/components/admin/RecentJobs";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const [
    totalStudents,
    totalRecruiters,
    totalJobs,
    totalApplications,
    totalResumes,
    recentUsers,
    recentJobs,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "STUDENT",
      },
    }),

    prisma.user.count({
      where: {
        role: "RECRUITER",
      },
    }),

    prisma.job.count(),

    prisma.application.count(),

    prisma.resume.count(),

    prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.job.findMany({
      include: {
        recruiter: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500">
            Platform Overview
          </p>
        </div>

        <Link
          href="/admin/users"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Manage Users
        </Link>

        <LogoutButton />
      </div>

      <AdminStatsSection
        totalStudents={totalStudents}
        totalRecruiters={totalRecruiters}
        totalJobs={totalJobs}
        totalApplications={totalApplications}
        totalResumes={totalResumes}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentUsers users={recentUsers} />

        <RecentJobs jobs={recentJobs} />
      </div>
    </>
  );
}