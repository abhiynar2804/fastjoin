import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRecruiter } from "@/lib/auth";
import ApplicationStatusSelect from "@/components/recruiter/applications/ApplicationStatusSelect";

export default async function RecruiterApplicationsPage() {
  const session = await requireRecruiter();

  const applications = await prisma.application.findMany({
    where: {
      job: {
        recruiterId: session.user.id,
      },
    },
    include: {
      job: true,
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          college: true,
          branch: true,
        },
      },
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Applications
      </h1>

      {applications.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">
            No applications yet
          </h2>

          <p className="mt-2 text-gray-500">
            Applications for your job postings will appear here.
          </p>

          <Link
            href="/recruiter/jobs"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            View My Jobs
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
                    {application.student.name}
                  </h2>

                  <p className="text-gray-600">
                    {application.student.email}
                  </p>

                  <div className="mt-3 text-sm text-gray-500">
                    <p>
                      Applied for:{" "}
                      <span className="font-medium">
                        {application.job.title}
                      </span>
                    </p>

                    {application.student.college && (
                      <p>
                        College: {application.student.college}
                      </p>
                    )}

                    {application.student.branch && (
                      <p>
                        Branch: {application.student.branch}
                      </p>
                    )}

                    <p>
                      Applied on:{" "}
                      {application.appliedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Link
  href={`/recruiter/applications/${application.id}`}
  className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
>
  View Applicant
</Link>
                </div>

                <ApplicationStatusSelect
  applicationId={application.id}
  initialStatus={application.status}
/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}