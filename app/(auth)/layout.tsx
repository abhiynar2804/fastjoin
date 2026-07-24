import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    switch (session.user.role) {
      case "ADMIN":
        redirect("/admin/dashboard");

      case "RECRUITER":
        redirect("/recruiter/dashboard");

      default:
        redirect("/student/dashboard");
    }
  }

  return <>{children}</>;
}