import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

    // Only students can upload resumes
    if (session.user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Forbidden: Student access only" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    // Check file
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    // Only allow PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Maximum file size: 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Resume must be smaller than 5 MB" },
        { status: 400 }
      );
    }

    // Upload resume to Vercel Blob
    const blob = await put(
      `resumes/${session.user.id}/${file.name}`,
      file,
      {
        access: "private",
        addRandomSuffix: true,
      }
    );

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

    return NextResponse.json(
      {
        message: "Resume uploaded successfully",
        resume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resume upload error:", error);

    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    );
  }
}