import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRecruiter } from "@/lib/auth";
import ApplicationStatusSelect from "@/components/recruiter/applications/ApplicationStatusSelect";
import { Users, GraduationCap, Calendar, Briefcase, ExternalLink, Mail, Building } from "lucide-react";

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
          profileImage: true,
        },
      },
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Applications Received
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Review applicant profiles, evaluate candidate qualifications, and update hiring decision statuses.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          {applications.length} Total Applications
        </span>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md space-y-4">
          <div className="w-12 h-12 rounded-2xl btn-primary mx-auto flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">No Applications Yet</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Applications submitted for your job postings will appear here in real-time.
            </p>
          </div>
          <Link
            href="/recruiter/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white btn-primary shadow-md"
          >
            <Briefcase className="w-4 h-4" />
            <span>View My Active Jobs</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Student Profile Info */}
                <div className="flex items-start gap-4">
                  {application.student.profileImage ? (
                    <img
                      src={application.student.profileImage}
                      alt={application.student.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center font-bold text-lg text-white shadow-sm shrink-0">
                      {application.student.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {application.student.name}
                    </h2>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{application.student.email}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-teal-600 dark:text-purple-400 bg-teal-500/10 dark:bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-teal-500/20 dark:border-purple-500/20">
                        Job: {application.job.title}
                      </span>

                      {application.student.college && (
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{application.student.college}</span>
                        </span>
                      )}

                      {application.student.branch && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{application.student.branch}</span>
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-zinc-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                      </span>
                    </div>

                    <div className="pt-3">
                      <Link
                        href={`/recruiter/applications/${application.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-primary shadow-sm"
                      >
                        <span>View Applicant Profile & Resume</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Status Selector Dropdown */}
                <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Application Status
                  </span>
                  <ApplicationStatusSelect
                    applicationId={application.id}
                    initialStatus={application.status}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}