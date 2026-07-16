import Link from "next/link";
import { prisma } from "@/lib/prisma";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import { requireRecruiter } from "@/lib/auth";

export default async function RecruiterJobsPage() {
  const session = await requireRecruiter();

  const jobs = await prisma.job.findMany({
    where: {
      recruiterId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Jobs</h1>

        <Link
          href="/recruiter/jobs/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="border rounded-lg p-10 text-center">
          <h2 className="text-xl font-semibold">No Jobs Yet</h2>
          <p className="text-gray-500 mt-2">
            Create your first job posting.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {job.title}
                  </h2>

                  <p className="text-gray-600">
                    {job.company}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    📍 {job.location}
                  </p>

                  <p className="text-sm text-gray-500">
                    💰 {job.salary}
                  </p>

                  <p className="text-sm text-gray-500">
                    {job.jobType} • {job.workMode}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}