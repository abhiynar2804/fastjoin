import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { success, error } from "@/lib/api-response";

export async function DELETE(
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

    await prisma.job.delete({
      where: {
        id,
      },
    });

    return success({
      message: "Job deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    return error("Something went wrong.", 500);
  }
}
