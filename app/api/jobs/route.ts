import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/lib/validations/job";
import { requireRecruiter } from "@/lib/auth-helpers";
import { success, error } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { session, error: authError } = await requireRecruiter();

    if (authError) return authError;

    const body = await req.json();

    const result = jobSchema.safeParse({
      ...body,
      salary: Number(body.salary),
    });

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

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
    } = result.data;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        salary: String(salary),
        description,
        requirements,
        jobType,
        workMode,
        deadline,
        recruiterId: session.user.id,
      },
    });

    return success(job, 201);
  } catch (err) {
    console.error(err);

    return error("Failed to create job", 500);
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

    return success(jobs);
  } catch (err) {
    console.error(err);

    return error("Failed to fetch jobs", 500);
  }
}
