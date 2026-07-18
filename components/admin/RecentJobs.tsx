import Link from "next/link";

type RecentJobsProps = {
  jobs: {
    id: string;
    title: string;
    company: string;
    status: string;
    recruiter: {
      name: string | null;
    };
  }[];
};

export default function RecentJobs({
  jobs,
}: RecentJobsProps) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs found.
        </p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="mb-3 border-b pb-3 last:border-none"
          >
            <h3 className="font-medium">
              {job.title}
            </h3>

            <p>{job.company}</p>

            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-blue-600">
                {job.status}
              </span>

              <span className="text-gray-500">
                {job.recruiter.name || "Unknown Recruiter"}
              </span>
            </div>
          </div>
        ))
      )}

      <Link
        href="/admin/jobs"
        className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Manage Jobs →
      </Link>
    </div>
  );
}