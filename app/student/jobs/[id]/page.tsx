import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";
import { notFound } from "next/navigation";
import SaveJobButton from "@/components/student/jobs/SaveJobButton";
import ApplyJobButton from "@/components/student/jobs/ApplyJobButton";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  WalletCards,
} from "lucide-react";

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
      <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-purple-500/10 dark:text-purple-400">
              <BriefcaseBusiness className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
                {job.title}
              </h1>

              <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:text-base">
                {job.company}
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {job.status}
          </span>
        </div>

        <div className="mt-7 grid gap-3 border-y border-zinc-100 py-5 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-600 dark:text-purple-400" />{" "}
            {job.location}
          </p>
          <p className="flex items-center gap-2">
            <WalletCards className="h-4 w-4 text-teal-600 dark:text-purple-400" />{" "}
            {job.salary}
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-teal-600 dark:text-purple-400" />{" "}
            {job.jobType.replaceAll("_", " ")}
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-teal-600 dark:text-purple-400" />{" "}
            {job.workMode}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-teal-600 dark:text-purple-400" />{" "}
            Deadline: {job.deadline.toLocaleDateString()}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Job Description
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {job.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Requirements
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {job.requirements}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <ApplyJobButton jobId={job.id} initialApplied={isApplied} />

          <SaveJobButton jobId={job.id} initialSaved={isSaved} />
        </div>
      </div>
    </div>
  );
}
