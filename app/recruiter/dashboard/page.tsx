import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PlusCircle, Sparkles } from "lucide-react";

import RecruiterStatsSection from "@/components/recruiter/RecruiterStatsSection";
import RecentRecruiterApplications from "@/components/recruiter/RecentRecruiterApplications";
import RecruiterRecentJobs from "@/components/recruiter/RecruiterRecentJobs";

export default async function RecruiterDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const recruiterId = session.user.id;

  const [
    jobsPosted,
    openJobs,
    applicationsReceived,
    shortlisted,
    selected,
    recentApplications,
    recentJobs,
  ] = await Promise.all([
    prisma.job.count({
      where: {
        recruiterId,
      },
    }),

    prisma.job.count({
      where: {
        recruiterId,
        status: "OPEN",
      },
    }),

    prisma.application.count({
      where: {
        job: {
          recruiterId,
        },
      },
    }),

    prisma.application.count({
      where: {
        job: {
          recruiterId,
        },
        status: "SHORTLISTED",
      },
    }),

    prisma.application.count({
      where: {
        job: {
          recruiterId,
        },
        status: "SELECTED",
      },
    }),

    prisma.application.findMany({
      where: {
        job: {
          recruiterId,
        },
      },
      include: {
        student: true,
        job: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
      take: 5,
    }),

    prisma.job.findMany({
      where: {
        recruiterId,
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
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
              Employer Console
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome back, {session.user.name || "Recruiter"}! 💼
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track hiring metrics, post new roles, review candidate applications, and manage active job listings.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/recruiter/jobs/create"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-white btn-primary shadow-md shadow-teal-500/20 dark:shadow-purple-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* Recruiter Stats Section */}
      <RecruiterStatsSection
        jobsPosted={jobsPosted}
        openJobs={openJobs}
        applicationsReceived={applicationsReceived}
        shortlisted={shortlisted}
        selected={selected}
      />

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentRecruiterApplications applications={recentApplications} />
        <RecruiterRecentJobs jobs={recentJobs} />
      </div>
    </div>
  );
}