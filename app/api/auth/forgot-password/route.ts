import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateVerificationToken, sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not (security best practice)
    // Always return success message
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const token = generateVerificationToken();
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token expires in 1 hour

    // Delete any existing tokens for this email
    await db.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Create new reset token
    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(email, token);
    
    if (!emailResult.success) {
      console.error("Failed to send password reset email:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send reset email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
