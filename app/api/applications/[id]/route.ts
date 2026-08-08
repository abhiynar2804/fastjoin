import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const validStatuses = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "REJECTED",
  "SELECTED",
];

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Props) {
  try {
    const session = await auth();

    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only recruiters can update application status
    if (session.user.role !== "RECRUITER") {
      return NextResponse.json(
        { error: "Forbidden: Recruiter access only" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    // Validate status
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid application status" },
        { status: 400 }
      );
    }

    // Find application and its job
    const application = await prisma.application.findUnique({
      where: {
        id,
      },
      include: {
        job: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Make sure recruiter owns the job
    if (application.job.recruiterId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You cannot manage this application" },
        { status: 403 }
      );
    }

    // Update application
    const updatedApplication = await prisma.application.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (err) {
    console.error("Update application status error:", err);

    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 }
    );
  }
}
