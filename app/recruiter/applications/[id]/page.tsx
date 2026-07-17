import { prisma } from "@/lib/prisma";
import { requireRecruiter } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicantDetailsPage({
  params,
}: Props) {
  const session = await requireRecruiter();
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: {
      id,
    },
    include: {
      job: true,
      student: {
  include: {
    resume: true,
  },
},
    },
  });

  if (!application) {
    notFound();
  }

  // Recruiter can only view applicants for their own jobs
  if (application.job.recruiterId !== session.user.id) {
    redirect("/unauthorized");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold">
        Applicant Details
      </h1>

      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-2xl font-semibold">
          {application.student.name}
        </h2>

        <div className="mt-4 space-y-2 text-gray-600">
          <p>Email: {application.student.email}</p>

          <p>
            College: {application.student.college || "Not provided"}
          </p>

          <p>
            Branch: {application.student.branch || "Not provided"}
          </p>

          <p>
            Semester: {application.student.semester || "Not provided"}
          </p>

          <p>
            Skills: {application.student.skills || "Not provided"}
          </p>
          <div className="mt-6">
  <h3 className="text-lg font-semibold">Resume</h3>

  {application.student.resume ? (
    <a
      href={`/api/resume/${application.student.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
    >
      View Resume
    </a>
  ) : (
    <p className="mt-2 text-gray-500">
      No resume uploaded.
    </p>
  )}
</div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold">
            Application Details
          </h3>

          <div className="mt-3 space-y-2 text-gray-600">
            <p>Applied For: {application.job.title}</p>

            <p>Status: {application.status}</p>

            <p>
              Applied On:{" "}
              {application.appliedAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}