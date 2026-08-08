import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-helpers";
import { success, error } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireStudent();

    if (authError) return authError;

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
      return error("Job already saved", 409);
    }

    // Save job
    const savedJob = await prisma.savedJob.create({
      data: {
        studentId: session.user.id,
        jobId,
      },
    });

    return success(
      {
        message: "Job saved successfully",
        savedJob,
      },
      201
    );
  } catch (err) {
    console.error("Save job error:", err);

    return error("Failed to save job", 500);
  }
}
