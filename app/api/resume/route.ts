import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth-helpers";
import { success, error } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { session, error } = await requireStudent();

    if (error) return error;

    const formData = await req.formData();
    const file = formData.get("file");

    // Check file
    if (!(file instanceof File)) {
      return error("Resume file is required", 400);
    }

    // Only allow PDF
    if (file.type !== "application/pdf") {
      return error("Only PDF files are allowed", 400);
    }

    // Maximum file size: 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return error("Resume must be smaller than 5 MB", 400);
    }

    // Upload resume to Vercel Blob
    const blob = await put(`resumes/${session.user.id}/${file.name}`, file, {
      access: "private",
      addRandomSuffix: true,
    });

    // Create or update resume record
    const resume = await prisma.resume.upsert({
      where: {
        studentId: session.user.id,
      },
      update: {
        resumeUrl: blob.url,
        fileName: file.name,
        uploadedAt: new Date(),
      },
      create: {
        studentId: session.user.id,
        resumeUrl: blob.url,
        fileName: file.name,
      },
    });

    return success(
      {
        message: "Resume uploaded successfully",
        resume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resume upload error:", error);

    return error("Failed to upload resume", 500);
  }
}
