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
    const { session, error } = await requireAdmin();

    if (error) return error;

    const { id } = await params;

    const body = await req.json();

    const { isActive } = body;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
    });

    return success(user);
  } catch (error) {
    console.error(error);

    return error("Something went wrong.", 500);
  }
}
