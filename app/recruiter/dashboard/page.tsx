import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/layout/LogoutButton";

import { prisma } from "@/lib/prisma";

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
    <>
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">
            Recruiter Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome back.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Post Job
        </Link>

        <LogoutButton />
      </div>

      <RecruiterStatsSection
        jobsPosted={jobsPosted}
        openJobs={openJobs}
        applicationsReceived={applicationsReceived}
        shortlisted={shortlisted}
        selected={selected}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentRecruiterApplications
          applications={recentApplications}
        />

        <RecruiterRecentJobs
          jobs={recentJobs}
        />
      </div>
    </>
  );
}