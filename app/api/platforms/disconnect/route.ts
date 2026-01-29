import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { platform } = body;

    if (!platform) {
      return NextResponse.json({ error: "Platform required" }, { status: 400 });
    }

    const artistProfile = await db.artistProfile.findUnique({
      where: { userId: user.id },
    });

    if (!artistProfile) {
      return NextResponse.json({ error: "Artist profile not found" }, { status: 404 });
    }

    await db.platformConnection.updateMany({
      where: {
        artistId: artistProfile.id,
        platform,
      },
      data: {
        isConnected: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
