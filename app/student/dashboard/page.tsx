import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/student/DashboardHeader";
import StatsSection from "@/components/student/StatsSection";
import RecentApplications from "@/components/student/RecentApplications";
import LatestJobs from "@/components/student/LatestJobs";

import { prisma } from "@/lib/prisma";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const studentId = session.user.id;

  const [
    savedJobsCount,
    appliedJobsCount,
    resume,
    recentApplications,
    latestJobs,
  ] = await Promise.all([
    prisma.savedJob.count({
      where: {
        studentId,
      },
    }),

    prisma.application.count({
      where: {
        studentId,
      },
    }),

    prisma.resume.findUnique({
      where: {
        studentId,
      },
    }),

    prisma.application.findMany({
      where: {
        studentId,
      },
      include: {
        job: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
      take: 5,
    }),

    prisma.job.findMany({
      where: {
        status: "OPEN",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  return (
    <>
      <DashboardHeader />

      <StatsSection
        savedJobsCount={savedJobsCount}
        appliedJobsCount={appliedJobsCount}
        hasResume={!!resume}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentApplications
          applications={recentApplications}
        />

        <LatestJobs
          jobs={latestJobs}
        />
      </div>
    </>
  );
}