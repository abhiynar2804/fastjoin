import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";
import { notFound } from "next/navigation";
import SaveJobButton from "@/components/student/jobs/SaveJobButton";
import ApplyJobButton from "@/components/student/jobs/ApplyJobButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({ params }: Props) {
  const session = await requireStudent();

const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }
  const savedJob = await prisma.savedJob.findUnique({
  where: {
    studentId_jobId: {
      studentId: session.user.id,
      jobId: job.id,
    },
  },
});

const isSaved = !!savedJob;

const existingApplication = await prisma.application.findUnique({
  where: {
    studentId_jobId: {
      studentId: session.user.id,
      jobId: job.id,
    },
  },
});

const isApplied = !!existingApplication;


  return (
    <div className="max-w-4xl">
      <div className="rounded-xl border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {job.title}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {job.company}
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {job.status}
          </span>
        </div>

        <div className="mt-6 grid gap-3 text-gray-600 sm:grid-cols-2">
          <p>📍 Location: {job.location}</p>
          <p>💰 Salary: {job.salary}</p>
          <p>💼 Job Type: {job.jobType}</p>
          <p>🏢 Work Mode: {job.workMode}</p>
          <p>
            📅 Deadline:{" "}
            {job.deadline.toLocaleDateString()}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Job Description
          </h2>

          <p className="mt-3 whitespace-pre-line text-gray-600">
            {job.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Requirements
          </h2>

          <p className="mt-3 whitespace-pre-line text-gray-600">
            {job.requirements}
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <ApplyJobButton
  jobId={job.id}
  initialApplied={isApplied}
/>

          <SaveJobButton
  jobId={job.id}
  initialSaved={isSaved}
/>
        </div>
      </div>
    </div>
  );
}