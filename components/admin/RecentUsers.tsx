import Link from "next/link";

type RecentUsersProps = {
  users: {
    id: string;
    name: string | null;
    email: string;
    role: string;
  }[];
};

export default function RecentUsers({
  users,
}: RecentUsersProps) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500">
          No users found.
        </p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="mb-3 border-b pb-3 last:border-none"
          >
            <h3 className="font-medium">
              {user.name || "No Name"}
            </h3>

            <p className="text-sm text-gray-600">
              {user.email}
            </p>

            <span className="text-sm text-blue-600">
              {user.role}
            </span>
          </div>
        ))
      )}

      <Link
        href="/admin/users"
        className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Manage Users →
      </Link>
    </div>
  );
}