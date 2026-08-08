import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    studentId: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { studentId } = await params;

    // Student can access their own resume
    const isOwnResume =
      session.user.role === "STUDENT" && session.user.id === studentId;

    // Recruiter can access resume only if the student
    // applied to one of the recruiter's jobs
    let recruiterHasAccess = false;

    if (session.user.role === "RECRUITER") {
      const application = await prisma.application.findFirst({
        where: {
          studentId,
          job: {
            recruiterId: session.user.id,
          },
        },
      });

      recruiterHasAccess = !!application;
    }

    if (!isOwnResume && !recruiterHasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const resume = await prisma.resume.findUnique({
      where: {
        studentId,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const result = await get(resume.resumeUrl, {
      access: "private",
    });

    if (!result || !result.stream) {
      return NextResponse.json(
        { error: "Resume file not found" },
        { status: 404 }
      );
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/pdf",

        "Content-Disposition": `inline; filename="${resume.fileName}"`,
      },
    });
  } catch (err) {
    console.error("Resume access error:", err);

    return NextResponse.json(
      { error: "Failed to access resume" },
      { status: 500 }
    );
  }
}
