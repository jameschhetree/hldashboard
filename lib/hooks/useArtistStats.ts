"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface ArtistStats {
  artistId: string;
  totalStreams: number;
  totalFollowers: number;
  monthlyListeners: number;
  platforms: Array<{
    platform: string;
    streams?: number;
    followers?: number;
    listeners?: number;
    growth?: number;
  }>;
}

export interface OnboardingStatus {
  hasArtistProfile: boolean;
  artistProfile: {
    id: string;
    songstatsArtistId: string | null;
    platforms: any[];
  } | null;
}

export function useArtistStats() {
  const { data: session, status } = useSession();
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus | null>(null);
  const [stats, setStats] = useState<ArtistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "B",
        location: "lib/hooks/useArtistStats.ts:useEffect",
        message: "session_status_changed",
        data: { status, hasSession: !!session },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    if (status === "loading") {
      setLoading(true);
      return;
    }
    if (status === "unauthenticated") {
      setLoading(false);
      setOnboardingStatus(null); // Explicitly set to null so dashboard doesn't redirect
      return;
    }

    // Only fetch if authenticated
    if (status !== "authenticated" || !session) {
      setLoading(false);
      setOnboardingStatus(null);
      return;
    }

    async function fetchData() {
      try {
        // Check onboarding status - only called when authenticated
        const statusRes = await fetch("/api/onboarding/status");
        // #region agent log
        fetch("http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "debug-session",
            runId: "pre-fix",
            hypothesisId: "B",
            location: "lib/hooks/useArtistStats.ts:fetchData",
            message: "onboarding_status_response",
            data: { ok: statusRes.ok, status: statusRes.status },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion

        if (!statusRes.ok) {
          // If 401, user is not authenticated - set to null so middleware handles redirect
          if (statusRes.status === 401) {
            setOnboardingStatus(null);
            setLoading(false);
            return;
          }
          throw new Error("Failed to fetch onboarding status");
        }
        const statusData: OnboardingStatus = await statusRes.json();
        setOnboardingStatus(statusData);

        // If user has artist profile, fetch stats
        if (statusData.hasArtistProfile && statusData.artistProfile?.songstatsArtistId) {
          const statsRes = await fetch(
            `/api/songstats/stats?artistId=${statusData.artistProfile.songstatsArtistId}`
          );
          if (statsRes.ok) {
            const statsData: ArtistStats = await statsRes.json();
            setStats(statsData);
          } else {
            // Don't set error for stats - we can still show dashboard with mock data
            console.warn("Failed to fetch stats, using mock data");
          }
        }
      } catch (err) {
        console.error("Error fetching onboarding status:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // Set to null on error - let middleware handle redirect if unauthenticated
        setOnboardingStatus(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [status, session]);

  return { onboardingStatus, stats, loading, error };
}
