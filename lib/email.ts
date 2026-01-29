import crypto from "crypto";

// #region agent log
function dbg(hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  fetch("http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "debug-session",
      runId: "pre-fix",
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

async function getResendClient() {
  try {
    // Dynamic import so dev server doesn't crash if dependency is missing.
    const mod = await import("resend");
    const Resend = mod.Resend;
    return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
  } catch (err) {
    // #region agent log
    dbg("F", "lib/email.ts:getResendClient", "resend_import_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    // #endregion
    return null;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/verify-email?token=${token}`;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const resend = await getResendClient();
  if (!resend) {
    return { success: false, error: "Email service dependency missing (resend)" };
  }

  console.log("Sending verification email to:", email);
  console.log("Resend API Key present:", !!apiKey);
  console.log("From email:", fromEmail);

  if (!apiKey || apiKey === "re_placeholder") {
    console.error("RESEND_API_KEY is not set!");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const result: any = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Verify your ArtistHub account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to ArtistHub!</h1>
          <p>Thanks for signing up. Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Verify Email
          </a>
          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 12px; word-break: break-all;">${verificationUrl}</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">This link will expire in 24 hours.</p>
        </div>
      `,
    });
    
    console.log("Resend API response:", result);
    
    // Check if Resend returned an error message (free tier restriction)
    if (result?.message && result.message.includes("only send testing emails")) {
      console.warn("Resend free tier restriction:", result.message);
      return { 
        success: false, 
        error: "Email service is in testing mode. Please use your verified email address or verify a domain in Resend." 
      };
    }
    
    return { success: true, result };
  } catch (error: any) {
    console.error("Email send error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Check for Resend free tier restriction
    if (error?.message?.includes("only send testing emails")) {
      return { 
        success: false, 
        error: "Email service is in testing mode. Please use your verified email address or verify a domain in Resend." 
      };
    }
    
    return { success: false, error: error?.message || "Unknown error" };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  const resend = await getResendClient();
  if (!resend) {
    return { success: false, error: "Email service dependency missing (resend)" };
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Reset your ArtistHub password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Reset Your Password</h1>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 12px; word-break: break-all;">${resetUrl}</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">This link will expire in 1 hour.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
