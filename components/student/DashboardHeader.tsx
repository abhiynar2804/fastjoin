import { auth } from "@/auth";

export default async function DashboardHeader() {
  const session = await auth();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name}! 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Here's an overview of your placement journey.
        </p>
      </div>
    </div>
  );
}