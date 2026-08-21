import { prisma } from "@/lib/prisma";
import { requireRecruiter } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import ApplicationStatusSelect from "@/components/recruiter/applications/ApplicationStatusSelect";
import {
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  FileText,
  Briefcase,
  Calendar,
  Code,
  Globe,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicantDetailsPage({ params }: Props) {
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

  const { student, job } = application;

  const initials = student.name
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "S";

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back Link */}
      <Link
        href="/recruiter/applications"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Applications</span>
      </Link>

      {/* Header Profile Summary Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-200 dark:border-zinc-700 shadow-md shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl btn-primary flex items-center justify-center font-bold text-2xl text-white shadow-md shrink-0">
                {initials}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {student.name}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {student.email}
              </p>

              {student.bio && (
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl">
                  "{student.bio}"
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center sm:items-end gap-1">
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Change Status
            </span>
            <ApplicationStatusSelect
              applicationId={application.id}
              initialStatus={application.status}
            />
          </div>
        </div>
      </div>

      {/* Section 1: Academic & Contact Details */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Academic Profile & Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Phone Number</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{student.phone || "Not provided"}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">College / University</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{student.college || "Not provided"}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Branch / Stream</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{student.branch || "Not provided"}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Semester</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{student.semester ? `Semester ${student.semester}` : "Not provided"}</span>
          </div>
        </div>

        {/* Skills List */}
        {student.skills && (
          <div className="pt-2">
            <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Key Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.split(",").map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 text-xs font-semibold"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {student.githubUrl && (
            <a
              href={student.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Code className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}

          {student.linkedinUrl && (
            <a
              href={student.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
            </a>
          )}

          {student.portfolioUrl && (
            <a
              href={student.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Globe className="w-4 h-4 text-teal-600" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>

      {/* Section 2: Resume Document View */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600 dark:text-purple-400" />
          <span>Student Resume Document</span>
        </h2>

        {student.resume ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                {student.resume.fileName || "Student_Resume.pdf"}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Uploaded: {new Date(student.resume.uploadedAt).toLocaleDateString()}
              </p>
            </div>

            <a
              href={`/api/resume/${student.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white btn-primary shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume File</span>
            </a>
          </div>
        ) : (
          <div className="p-6 text-center text-zinc-500 dark:text-zinc-400 text-sm rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800">
            No resume uploaded by candidate.
          </div>
        )}
      </div>

      {/* Section 3: Application Metadata */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Application Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block">Applied Position</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{job.title}</span>
          </div>

          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block">Current Status</span>
            <span className="font-semibold text-teal-600 dark:text-purple-400 text-sm">{application.status.replaceAll("_", " ")}</span>
          </div>

          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block">Applied On</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{new Date(application.appliedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}