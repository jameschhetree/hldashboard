/**
 * Songstats API Client
 * Base URL: https://api.songstats.com/enterprise/v1
 * Authentication: API key in header `apikey: [key]`
 */

const SONGSTATS_BASE_URL = process.env.SONGSTATS_BASE_URL || "https://api.songstats.com/enterprise/v1";
const SONGSTATS_API_KEY = process.env.SONGSTATS_API_KEY || "ab31010a-899e-4ba0-8132-34d71167fc8f";

interface SongstatsResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

async function songstatsRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<SongstatsResponse<T>> {
  try {
    const response = await fetch(`${SONGSTATS_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "apikey": SONGSTATS_API_KEY,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          code: errorData.code || response.status.toString(),
        },
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

// Artist Info
export interface ArtistInfo {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  genres?: string[];
  country?: string;
}

export async function getArtistInfo(artistId: string): Promise<SongstatsResponse<ArtistInfo>> {
  return songstatsRequest<ArtistInfo>(`/artists/${artistId}`);
}

// Current Stats
export interface PlatformStats {
  platform: string;
  streams?: number;
  followers?: number;
  listeners?: number;
  growth?: number;
}

export interface ArtistCurrentStats {
  artistId: string;
  totalStreams: number;
  totalFollowers: number;
  monthlyListeners: number;
  platforms: PlatformStats[];
}

export async function getArtistCurrentStats(artistId: string): Promise<SongstatsResponse<ArtistCurrentStats>> {
  return songstatsRequest<ArtistCurrentStats>(`/artists/${artistId}/stats/current`);
}

// Historic Stats
export interface HistoricDataPoint {
  date: string;
  streams: number;
  followers: number;
  listeners: number;
}

export interface ArtistHistoricStats {
  artistId: string;
  period: string; // "week", "month", "year"
  data: HistoricDataPoint[];
}

export async function getArtistHistoricStats(
  artistId: string,
  period: "week" | "month" | "year" = "week"
): Promise<SongstatsResponse<ArtistHistoricStats>> {
  return songstatsRequest<ArtistHistoricStats>(`/artists/${artistId}/stats/historic?period=${period}`);
}

// Top Tracks
export interface Track {
  id: string;
  name: string;
  streams: number;
  growth: number;
  platforms: string[];
}

export interface ArtistTopTracks {
  artistId: string;
  tracks: Track[];
}

export async function getArtistTopTracks(artistId: string): Promise<SongstatsResponse<ArtistTopTracks>> {
  return songstatsRequest<ArtistTopTracks>(`/artists/${artistId}/tracks/top`);
}

// Search Artist (to find artist ID)
export interface ArtistSearchResult {
  id: string;
  name: string;
  avatar?: string;
  genres?: string[];
}

export interface ArtistSearchResponse {
  results: ArtistSearchResult[];
  total: number;
}

export async function searchArtist(query: string): Promise<SongstatsResponse<ArtistSearchResponse>> {
  return songstatsRequest<ArtistSearchResponse>(`/artists/search?q=${encodeURIComponent(query)}`);
}
