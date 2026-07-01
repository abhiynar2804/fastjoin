import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
  data: {
    publicId: `02-FJ-${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    role: "STUDENT",
  },
});

return NextResponse.json(
  {
    message: "User created successfully",
    user,
  },
  { status: 201 }
);
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}