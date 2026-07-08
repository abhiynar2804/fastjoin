import { auth } from "@/auth";
import { redirect } from "next/navigation";

// import Navbar from "@/components/student/Navbar";
import StatsCard from "@/components/student/StatsCard";
import RecentApplications from "@/components/student/RecentApplications";
import LatestJobs from "@/components/student/LatestJobs";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {/* <Navbar /> */}

      <main className="p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Welcome, {session.user.name} 👋
        </h1>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatsCard title="Applications" value={5} />
          <StatsCard title="Saved Jobs" value={3} />
          <StatsCard title="Available Jobs" value={20} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentApplications />
          <LatestJobs />
        </div>
      </main>
    </>
  );
}