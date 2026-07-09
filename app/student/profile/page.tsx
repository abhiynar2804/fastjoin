import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/student/profile/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
  id: session.user.id,
}
  });

  if (!user) {
    redirect("/login");
  }

  return (
  <div>
    <h1 className="text-3xl font-bold mb-6">
      My Profile
    </h1>

    <ProfileForm user={user} />
  </div>
);
}