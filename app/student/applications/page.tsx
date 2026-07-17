import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";

export default async function ApplicationsPage() {
  const session = await requireStudent();

  const applications = await prisma.application.findMany({
    where: {
      studentId: session.user.id,
    },
    include: {
      job: true,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">
            No applications yet
          </h2>

          <p className="mt-2 text-gray-500">
            Jobs you apply for will appear here.
          </p>

          <Link
            href="/student/jobs"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-lg border p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">
                    {application.job.title}
                  </h2>

                  <p className="mt-1">
                    {application.job.company}
                  </p>

                  <p className="mt-2 text-gray-500">
                    📍 {application.job.location}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Applied on:{" "}
                    {application.appliedAt.toLocaleDateString()}
                  </p>
                </div>

                <span className="rounded-full border px-3 py-1 text-sm font-medium">
                  {application.status}
                </span>
              </div>

              <Link
                href={`/student/jobs/${application.job.id}`}
                className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}