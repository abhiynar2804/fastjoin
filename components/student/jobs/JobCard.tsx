import Link from "next/link";

type Props = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  workMode: string;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  jobType,
  workMode,
}: Props) {
  return (
    <div className="rounded-lg border p-5">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="mt-1">{company}</p>

      <div className="mt-2 space-y-1 text-gray-500">
        <p>📍 {location}</p>
        <p>💰 {salary}</p>
        <p>
          {jobType} • {workMode}
        </p>
      </div>

      <Link
        href={`/student/jobs/${id}`}
        className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
      >
        View Details
      </Link>
    </div>
  );
}