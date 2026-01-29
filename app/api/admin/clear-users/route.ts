import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * ADMIN ROUTE: Clear all users from database
 * WARNING: Only use in development!
 * Access at: http://localhost:3000/api/admin/clear-users
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  try {
    console.log("🗑️  Starting to clear all users...");

    // Delete all users (cascades to accounts, sessions, artist profiles, etc.)
    const result = await db.user.deleteMany({});

    // Also clear verification tokens
    const tokensResult = await db.verificationToken.deleteMany({});

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.count} user(s) and ${tokensResult.count} verification token(s)`,
      deletedUsers: result.count,
      deletedTokens: tokensResult.count,
    });
  } catch (error) {
    console.error("❌ Error clearing users:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also allow GET for easy browser access
export async function GET(request: NextRequest) {
  return POST(request);
}
