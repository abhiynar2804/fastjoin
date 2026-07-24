import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-helpers";
import { success, error } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { session, error } = await requireStudent();

    if (error) return error;

    const body = await req.json();
    const { jobId } = body;

    if (!jobId) {
      return error("Job ID is required", 400);
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return error("Job not found", 404);
    }

    // Don't allow applications to closed or expired jobs
    if (job.status !== "OPEN" || job.deadline < new Date()) {
      return error("This job is no longer accepting applications", 400);
    }

    // Check if student already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId: session.user.id,
          jobId,
        },
      },
    });

    if (existingApplication) {
      return error("You have already applied for this job", 409);
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        studentId: session.user.id,
        jobId,
      },
    });

    return success(
      {
        message: "Application submitted successfully",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apply job error:", error);

    return error("Failed to submit application", 500);
  }
}