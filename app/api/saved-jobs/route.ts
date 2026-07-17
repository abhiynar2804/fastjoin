import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // User must be logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only students can save jobs
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

    // Check if already saved
    const existingSavedJob = await prisma.savedJob.findUnique({
      where: {
        studentId_jobId: {
          studentId: session.user.id,
          jobId,
        },
      },
    });

    if (existingSavedJob) {
      return NextResponse.json(
        { error: "Job already saved" },
        { status: 409 }
      );
    }

    // Save job
    const savedJob = await prisma.savedJob.create({
      data: {
        studentId: session.user.id,
        jobId,
      },
    });

    return NextResponse.json(
      {
        message: "Job saved successfully",
        savedJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save job error:", error);

    return NextResponse.json(
      { error: "Failed to save job" },
      { status: 500 }
    );
  }
}