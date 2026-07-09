import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {
  name,
  phone,
  bio,
  college,
  branch,
  semester,
  githubUrl,
  linkedinUrl,
  portfolioUrl,
  skills,
} = await request.json();

  const user = await prisma.user.update({
    where: {
  id: session.user.id,
},
    data: {
  name,
  phone,
  bio,
  college,
  branch,
  semester,
  githubUrl,
  linkedinUrl,
 portfolioUrl,
  skills,
},
  });

  return NextResponse.json(user);
}