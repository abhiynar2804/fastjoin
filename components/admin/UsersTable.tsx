import Link from "next/link";
import UserStatusButton from "./UserStatusButton";

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
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">User ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-center">Applications</th>
            <th className="px-4 py-3 text-center">Jobs</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b last:border-none">
                <td className="px-4 py-4">{user.publicId}</td>

                <td className="px-4 py-4">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>

                <td className="px-4 py-4">{user.email}</td>

                <td className="px-4 py-4">{user.role}</td>

                <td className="px-4 py-4 text-center">
                  {user._count.applications}
                </td>

                <td className="px-4 py-4 text-center">{user._count.jobs}</td>

                <td className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>

                    <UserStatusButton
                      userId={user.id}
                      isActive={user.isActive}
                    />
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  {user.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
