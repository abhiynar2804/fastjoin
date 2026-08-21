import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import StudentLayout from "@/components/student/layout/StudentLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let user = null;
  if (session?.user?.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
      },
    });
  }

  return <StudentLayout user={user}>{children}</StudentLayout>;
}