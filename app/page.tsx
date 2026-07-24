import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  switch (session.user.role) {
    case "STUDENT":
      redirect("/student/dashboard");

    case "RECRUITER":
      redirect("/recruiter/dashboard");

    case "ADMIN":
      redirect("/admin/dashboard");

    default:
      redirect("/login");
  }
}