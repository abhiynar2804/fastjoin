import { requireStudent } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ResumeUpload from "@/components/student/resume/ResumeUpload";
import { CheckCircle2, FileText } from "lucide-react";

export default async function ResumePage() {
  const session = await requireStudent();

  const resume = await prisma.resume.findUnique({
    where: {
      studentId: session.user.id,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-teal-600 dark:text-purple-400">
          Put your best work forward
        </p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          My Resume
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Keep one current PDF ready for every application.
        </p>
      </div>

      <ResumeUpload />

      {resume ? (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-purple-500/10 dark:text-purple-400">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Current resume
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {resume.fileName}
              </p>
            </div>
          </div>
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

          <a
            href={`/api/resume/${session.user.id}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-bold brand-text hover:underline"
          >
            View Resume
          </a>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
          No resume uploaded yet.
        </div>
      )}
    </div>
  );
}
