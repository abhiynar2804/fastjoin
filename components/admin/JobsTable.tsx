import Link from "next/link";

type JobsTableProps = {
  jobs: {
    id: string;
    title: string;
    company: string;
    status: string;
    jobType: string;
    workMode: string;
    createdAt: Date;

    recruiter: {
      id: string;
      name: string;
      email: string;
    };

    _count: {
      applications: number;
    };
  }[];
};

export default function JobsTable({
  jobs,
}: JobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        No jobs found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Recruiter</th>
            <th className="px-4 py-3 text-center">Applications</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Type</th>
            <th className="px-4 py-3 text-center">Mode</th>
            <th className="px-4 py-3 text-center">Posted</th>
            <th className="px-4 py-3 text-center">View</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-4 font-medium">
                {job.title}
              </td>

              <td className="px-4 py-4">
                {job.company}
              </td>

              <td className="px-4 py-4">
                {job.recruiter.name}
              </td>

              <td className="px-4 py-4 text-center">
                {job._count.applications}
              </td>

              <td className="px-4 py-4 text-center">
                {job.status}
              </td>

              <td className="px-4 py-4 text-center">
                {job.jobType}
              </td>

              <td className="px-4 py-4 text-center">
                {job.workMode}
              </td>

              <td className="px-4 py-4 text-center">
                {job.createdAt.toLocaleDateString()}
              </td>

              <td className="px-4 py-4 text-center">
                <Link
                  href={`/admin/jobs/${job.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}