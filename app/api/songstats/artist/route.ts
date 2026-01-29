import { NextRequest, NextResponse } from "next/server";
import { getArtistInfo, searchArtist } from "@/lib/songstats";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const artistId = searchParams.get("id");
    const query = searchParams.get("q");

    if (query) {
      // Search for artists
      const result = await searchArtist(query);
      if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 400 });
      }
      return NextResponse.json(result.data);
    }

    if (!artistId) {
      return NextResponse.json({ error: "Artist ID or search query required" }, { status: 400 });
    }

    // Get artist info
    const result = await getArtistInfo(artistId);
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
