import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { success, error } from "@/lib/api-response";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { session, error: authError } = await requireAdmin();

    if (authError) return authError;

    const { id } = await params;

    const { status } = await req.json();

    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return success(job);
  } catch (err) {
    console.error(err);

    return error("Something went wrong.", 500);
  }
}
