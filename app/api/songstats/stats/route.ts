import { NextRequest, NextResponse } from "next/server";
import { getArtistCurrentStats } from "@/lib/songstats";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const artistId = searchParams.get("artistId");

    if (!artistId) {
      return NextResponse.json({ error: "Artist ID required" }, { status: 400 });
    }

    const result = await getArtistCurrentStats(artistId);
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
