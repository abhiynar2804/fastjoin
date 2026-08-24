import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Users, ShieldCheck } from "lucide-react";

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
    <div className="space-y-8">
      {/* Top Banner Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full btn-primary uppercase tracking-wider">
              Super Admin Console
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome back, {session.user.name || "Administrator"}! 🛡️
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monitor platform health, manage registered users, review recruiter postings, and oversee placement operations.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-white btn-primary shadow-md shadow-teal-500/20 dark:shadow-purple-500/20"
          >
            <Users className="w-4 h-4" />
            <span>Manage Users</span>
          </Link>
        </div>
      </div>

      {/* Admin Stats Section */}
      <AdminStatsSection
        totalStudents={totalStudents}
        totalRecruiters={totalRecruiters}
        totalJobs={totalJobs}
        totalApplications={totalApplications}
        totalResumes={totalResumes}
      />

      {/* Overview Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentUsers users={recentUsers} />
        <RecentJobs jobs={recentJobs} />
      </div>
    </div>
  );
}