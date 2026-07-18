import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import UserStatusButton from "@/components/admin/UserStatusButton";

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

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-white p-6">
        <h1 className="mb-6 text-3xl font-bold">User Details</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Info label="Public ID" value={user.publicId} />
          <Info label="Name" value={user.name} />
          <Info label="Email" value={user.email} />
          <Info label="Role" value={user.role} />
          <Info label="Phone" value={user.phone} />
          <Info label="College" value={user.college} />
          <Info label="Branch" value={user.branch} />
          <Info label="Semester" value={user.semester?.toString()} />
          <Info label="GitHub" value={user.githubUrl} />
          <Info label="LinkedIn" value={user.linkedinUrl} />
          <Info label="Portfolio" value={user.portfolioUrl} />
          <Info label="Status" value={user.isActive ? "Active" : "Inactive"} />
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Statistics</h2>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Account Actions</h2>

          <UserStatusButton userId={user.id} isActive={user.isActive} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Applications" value={user.applications.length} />

          <StatCard title="Jobs" value={user.jobs.length} />

          <StatCard title="Resume" value={user.resume ? 1 : 0} />
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

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-lg border p-5 text-center">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
