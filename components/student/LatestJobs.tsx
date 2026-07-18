import Link from "next/link";

type LatestJobsProps = {
  jobs: {
    id: string;
    title: string;
    company: string;
    location: string;
  }[];
};

export default function LatestJobs({
  jobs,
}: LatestJobsProps) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Latest Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs available.
        </p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="mb-3 border-b pb-3 last:border-none"
          >
            <h3 className="font-medium">
              {job.company}
            </h3>

            <p>{job.title}</p>

            <span className="text-sm text-gray-500">
              {job.location}
            </span>
          </div>
        ))
      )}

      <Link
        href="/student/jobs"
        className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        View All →
      </Link>
    </div>
  );
}