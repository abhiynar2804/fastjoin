import Link from "next/link";

type RecentApplicationsProps = {
  applications: {
    id: string;
    status: string;
    job: {
      id: string;
      title: string;
      company: string;
    };
  }[];
};

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications yet.
        </p>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            className="mb-3 border-b pb-3 last:border-none"
          >
            <h3 className="font-medium">
              {application.job.company}
            </h3>

            <p>{application.job.title}</p>

            <span className="text-sm text-blue-600">
              {application.status.replaceAll("_", " ")}
            </span>
          </div>
        ))
      )}

      <Link
        href="/student/applications"
        className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        View All →
      </Link>
    </div>
  );
}