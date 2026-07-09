import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/student/DashboardHeader";
import StatsSection from "@/components/student/StatsSection";
import RecentApplications from "@/components/student/RecentApplications";
import LatestJobs from "@/components/student/LatestJobs";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
  <>
    <DashboardHeader />

    <StatsSection />

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <RecentApplications />
      <LatestJobs />
    </div>
  </>
);
}