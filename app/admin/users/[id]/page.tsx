import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UserStatusButton from "@/components/admin/UserStatusButton";
import { ArrowLeft, User, Mail, Phone, Building, GraduationCap, Briefcase, FileCheck, FileText } from "lucide-react";

export default async function UserDetailsPage({
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

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      resume: true,
      applications: {
        include: {
          job: true,
        },
      },
      jobs: true,
    },
  });

  if (!user) {
    notFound();
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to User Management</span>
      </Link>

      {/* User Header Summary Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name || "User Avatar"}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-200 dark:border-zinc-700 shadow-md shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl btn-primary flex items-center justify-center font-bold text-2xl text-white shadow-md shrink-0">
                {initials}
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                  {user.name || "No Name"}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {user.email} • ID: <span className="font-mono">{user.publicId}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center sm:items-end gap-1">
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Account Status
            </span>
            <UserStatusButton userId={user.id} isActive={user.isActive} />
          </div>
        </div>
      </div>

      {/* Information Cards Grid */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Account Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Info label="Public ID" value={user.publicId} />
          <Info label="Full Name" value={user.name} />
          <Info label="Email Address" value={user.email} />
          <Info label="User Role" value={user.role} />
          <Info label="Phone Number" value={user.phone} />
          <Info label="College / Institution" value={user.college} />
          <Info label="Branch / Stream" value={user.branch} />
          <Info label="Semester" value={user.semester?.toString()} />
          <Info label="GitHub URL" value={user.githubUrl} />
          <Info label="LinkedIn URL" value={user.linkedinUrl} />
          <Info label="Portfolio Link" value={user.portfolioUrl} />
          <Info label="Account Status" value={user.isActive ? "Active" : "Inactive"} />
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          User Platform Activity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Applications Submitted" value={user.applications.length} icon={FileCheck} />
          <StatCard title="Jobs Posted" value={user.jobs.length} icon={Briefcase} />
          <StatCard title="Resume Uploaded" value={user.resume ? 1 : 0} icon={FileText} />
        </div>
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

function StatCard({ title, value, icon: Icon }: { title: string; value: number; icon: any }) {
  return (
    <div className="p-5 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
      <div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{title}</p>
        <p className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white shrink-0">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
