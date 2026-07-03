import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome, {session.user.name} 🚀</p>
    </div>
  );
}