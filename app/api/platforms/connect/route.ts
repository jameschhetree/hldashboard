import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { platform, songstatsArtistId } = body;

    if (!platform || !songstatsArtistId) {
      return NextResponse.json(
        { error: "Platform and Songstats Artist ID required" },
        { status: 400 }
      );
    }

    // Get or create artist profile
    let artistProfile = await db.artistProfile.findUnique({
      where: { userId: user.id },
    });

    if (!artistProfile) {
      artistProfile = await db.artistProfile.create({
        data: {
          userId: user.id,
          songstatsArtistId,
        },
      });
    } else if (!artistProfile.songstatsArtistId) {
      artistProfile = await db.artistProfile.update({
        where: { id: artistProfile.id },
        data: { songstatsArtistId },
      });
    }

    // If platform is "songstats", just save the artist ID (all platforms are available via Songstats)
    // This is used when selecting an artist during onboarding
    if (platform === "songstats") {
      // Also mark all platforms as connected since Songstats provides data for all
      const allPlatforms = ["spotify", "apple_music", "youtube", "instagram", "tiktok"];
      await Promise.all(
        allPlatforms.map(p =>
          db.platformConnection.upsert({
            where: {
              artistId_platform: {
                artistId: artistProfile.id,
                platform: p,
              },
            },
            create: {
              artistId: artistProfile.id,
              platform: p,
              isConnected: true,
              connectedAt: new Date(),
            },
            update: {
              isConnected: true,
              connectedAt: new Date(),
            },
          })
        )
      );

      return NextResponse.json({ 
        success: true, 
        artistProfile: {
          id: artistProfile.id,
          songstatsArtistId: artistProfile.songstatsArtistId,
        }
      });
    }

    // Create or update platform connection for specific platforms
    const platformConnection = await db.platformConnection.upsert({
      where: {
        artistId_platform: {
          artistId: artistProfile.id,
          platform,
        },
      },
      create: {
        artistId: artistProfile.id,
        platform,
        isConnected: true,
        connectedAt: new Date(),
      },
      update: {
        isConnected: true,
        connectedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, platformConnection });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
