import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only students can apply
    if (session.user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Forbidden: Student access only" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Don't allow applications to closed or expired jobs
    if (
      job.status !== "OPEN" ||
      job.deadline < new Date()
    ) {
      return NextResponse.json(
        { error: "This job is no longer accepting applications" },
        { status: 400 }
      );
    }

    // Check if student already applied
    const existingApplication =
      await prisma.application.findUnique({
        where: {
          studentId_jobId: {
            studentId: session.user.id,
            jobId,
          },
        },
      });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 409 }
      );
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        studentId: session.user.id,
        jobId,
      },
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apply job error:", error);

    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}