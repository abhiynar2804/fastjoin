import Link from "next/link";
import UserStatusButton from "./UserStatusButton";
import { ExternalLink } from "lucide-react";

type UsersTableProps = {
  users: {
    id: string;
    publicId: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    _count: {
      applications: number;
      jobs: number;
    };
  }[];
};

export default function UsersTable({ users }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "RECRUITER":
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
      default:
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/50 text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
            <th className="px-4 py-3.5">User ID</th>
            <th className="px-4 py-3.5">Name</th>
            <th className="px-4 py-3.5">Email</th>
            <th className="px-4 py-3.5">Role</th>
            <th className="px-4 py-3.5 text-center">Applications</th>
            <th className="px-4 py-3.5 text-center">Jobs</th>
            <th className="px-4 py-3.5 text-center">Status</th>
            <th className="px-4 py-3.5 text-center">Joined</th>
            <th className="px-4 py-3.5 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
          {users.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-10 text-center text-zinc-500 dark:text-zinc-400">
                No users found matching your search filter.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="px-4 py-3.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {user.publicId}
                </td>

                <td className="px-4 py-3.5 font-bold text-zinc-900 dark:text-zinc-100">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="hover:underline brand-text inline-flex items-center gap-1"
                  >
                    <span>{user.name}</span>
                  </Link>
                </td>

                <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-300 text-xs">
                  {user.email}
                </td>

                <td className="px-4 py-3.5">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getRoleBadge(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-center font-medium">
                  {user._count.applications}
                </td>

                <td className="px-4 py-3.5 text-center font-medium">
                  {user._count.jobs}
                </td>

                <td className="px-4 py-3.5 text-center">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      user.isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-center text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3.5 text-center">
                  <UserStatusButton userId={user.id} isActive={user.isActive} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
