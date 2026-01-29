import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "H",
        location: "app/api/onboarding/status/route.ts:GET",
        message: "enter",
        data: { pathname: "/api/onboarding/status" },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const user = await requireAuth();
    
    const artistProfile = await db.artistProfile.findUnique({
      where: { userId: user.id },
      include: {
        platforms: true,
      },
    });

    return NextResponse.json({
      hasArtistProfile: !!artistProfile,
      artistProfile: artistProfile ? {
        id: artistProfile.id,
        songstatsArtistId: artistProfile.songstatsArtistId,
        platforms: artistProfile.platforms,
      } : null,
    });
  } catch (error) {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "H",
        location: "app/api/onboarding/status/route.ts:GET",
        message: "error",
        data: { message: error instanceof Error ? error.message : String(error) },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
