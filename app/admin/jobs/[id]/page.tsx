import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import JobStatusButton from "@/components/admin/JobStatusButton";
import DeleteJobButton from "@/components/admin/DeleteJobButton";

export default async function AdminJobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      recruiter: true,
      applications: {
        include: {
          student: true,
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-white p-6">
        <h1 className="mb-6 text-3xl font-bold">{job.title}</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Info label="Company" value={job.company} />
          <Info label="Recruiter" value={job.recruiter.name} />
          <Info label="Recruiter Email" value={job.recruiter.email} />
          <Info label="Job Type" value={job.jobType} />
          <Info label="Work Mode" value={job.workMode} />
          <Info label="Status" value={job.status} />
          <Info label="Salary" value={job.salary?.toString()} />
          <Info
            label="Applications"
            value={job.applications.length.toString()}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Description</h2>

        <p className="whitespace-pre-line text-gray-700">{job.description}</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Requirements</h2>

        <p className="whitespace-pre-line text-gray-700">{job.requirements}</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Job Actions</h2>

        <div className="flex gap-3">
          <JobStatusButton jobId={job.id} status={job.status} />

          <DeleteJobButton jobId={job.id} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
