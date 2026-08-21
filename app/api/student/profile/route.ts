import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
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
      profileImage,
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
        semester: semester ? parseInt(semester, 10) : null,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
        skills,
        profileImage,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}