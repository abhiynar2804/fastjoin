import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";
import JobCard from "@/components/student/jobs/JobCard";

export default async function SavedJobsPage() {
  const session = await requireStudent();

  const savedJobs = await prisma.savedJob.findMany({
    where: {
      studentId: session.user.id,
    },
    include: {
      job: true,
    },
    orderBy: {
      savedAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">
            No saved jobs
          </h2>

          <p className="mt-2 text-gray-500">
            Jobs you save will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((savedJob) => (
            <JobCard
              key={savedJob.id}
              id={savedJob.job.id}
              title={savedJob.job.title}
              company={savedJob.job.company}
              location={savedJob.job.location}
              salary={savedJob.job.salary}
              jobType={savedJob.job.jobType}
              workMode={savedJob.job.workMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}