import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-xl border p-8 text-center shadow">
        <h1 className="text-4xl font-bold text-red-600">403</h1>

        <h2 className="mt-3 text-2xl font-semibold">
          Unauthorized Access
        </h2>

        <p className="mt-3 text-gray-600">
          You don't have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}