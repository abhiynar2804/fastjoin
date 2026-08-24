import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import JobStatusButton from "@/components/admin/JobStatusButton";
import DeleteJobButton from "@/components/admin/DeleteJobButton";
import { ArrowLeft, Building2, User, Mail, Briefcase, MapPin, DollarSign, Users, Calendar } from "lucide-react";

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
    <div className="max-w-4xl space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/jobs"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Job Management</span>
      </Link>

      {/* Header Summary Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {job.title}
              </h1>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  job.status === "OPEN"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
                }`}
              >
                {job.status}
              </span>
            </div>

            <p className="text-sm font-semibold text-teal-600 dark:text-purple-400 mt-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <JobStatusButton jobId={job.id} status={job.status} />
            <DeleteJobButton jobId={job.id} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2">
          <Info label="Company Name" value={job.company} />
          <Info label="Posted By Recruiter" value={job.recruiter.name} />
          <Info label="Recruiter Email" value={job.recruiter.email} />
          <Info label="Job Type" value={job.jobType.replaceAll("_", " ")} />
          <Info label="Work Mode" value={job.workMode} />
          <Info label="Salary / CTC" value={job.salary} />
          <Info label="Location" value={job.location} />
          <Info label="Total Applications" value={job.applications.length.toString()} />
        </div>
      </div>

      {/* Description Section */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Job Description
        </h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {job.description}
        </p>
      </div>

      {/* Requirements Section */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Role Requirements & Qualifications
        </h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {job.requirements}
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">{label}</p>
      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{value || "-"}</p>
    </div>
  );
}
