import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function requireRecruiter() {
  const session = await requireAuth();

  if (session.user.role !== "RECRUITER") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireStudent() {
  const session = await requireAuth();

  if (session.user.role !== "STUDENT") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}