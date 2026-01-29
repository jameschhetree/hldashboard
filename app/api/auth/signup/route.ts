import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (auto-verify email - no verification required)
    const user = await db.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        emailVerified: new Date(), // Auto-verify on signup
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully! You can now log in.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { 
        error: error?.message || "Failed to create account",
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}
