import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
   const session = await auth();

if (!session?.user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

if (session.user.role !== "RECRUITER") {
  return NextResponse.json(
    { error: "Forbidden: Recruiter access only" },
    { status: 403 }
  );
}

    const body = await req.json();

    const {
      title,
      company,
      location,
      salary,
      description,
      requirements,
      jobType,
      workMode,
      deadline,
    } = body;

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !description ||
      !requirements ||
      !jobType ||
      !workMode ||
      !deadline
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
  data: {
    title,
    company,
    location,
    salary,
    description,
    requirements,
    jobType,
    workMode,
    deadline: new Date(deadline),
    recruiterId: session.user.id,
  },
});

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: "OPEN",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        recruiter: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
