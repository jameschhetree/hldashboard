"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Search, Check, Loader2 } from "lucide-react";

const PLATFORMS = [
  { id: "spotify", name: "Spotify", color: "bg-green-500" },
  { id: "apple_music", name: "Apple Music", color: "bg-red-500" },
  { id: "youtube", name: "YouTube", color: "bg-red-600" },
  { id: "instagram", name: "Instagram", color: "bg-pink-500" },
  { id: "tiktok", name: "TikTok", color: "bg-black" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-dark-text-muted" />
      </div>
    );
  }

  // Don't render content if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-dark-text-muted" />
        <p className="ml-3 text-dark-text-muted">Redirecting to login...</p>
      </div>
    );
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`/api/songstats/artist?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectArtist = async (artist: any) => {
    setSelectedArtist(artist);
    
    // Save artist profile immediately when selected
    try {
      const response = await fetch("/api/platforms/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "songstats", // Just to save the artist ID
          songstatsArtistId: artist.id,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save artist profile");
      }
    } catch (error) {
      console.error("Error saving artist:", error);
    }
    
    setStep(2);
  };

  const handleConnectPlatform = async (platform: string) => {
    if (!selectedArtist) return;

    setIsConnecting(true);
    try {
      const response = await fetch("/api/platforms/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          songstatsArtistId: selectedArtist.id,
        }),
      });

      if (response.ok) {
        setConnectedPlatforms([...connectedPlatforms, platform]);
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Auto-connect all platforms when artist is selected (Songstats provides all platform data)
  useEffect(() => {
    if (selectedArtist && step === 2 && connectedPlatforms.length === 0) {
      // Mark all platforms as connected via Songstats
      const allPlatforms = PLATFORMS.map(p => p.id);
      setConnectedPlatforms(allPlatforms);
      
      // Save all platform connections
      Promise.all(
        allPlatforms.map(platform =>
          fetch("/api/platforms/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform,
              songstatsArtistId: selectedArtist.id,
            }),
          })
        )
      ).catch(error => {
        console.error("Error connecting platforms:", error);
      });
    }
  }, [selectedArtist, step]);

  const handleComplete = async () => {
    // Ensure artist profile is saved
    if (selectedArtist) {
      try {
        await fetch("/api/platforms/connect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: "songstats",
            songstatsArtistId: selectedArtist.id,
          }),
        });
      } catch (error) {
        console.error("Error completing setup:", error);
      }
    }
    
    router.push("/");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 z-10">
      <div
        className={cn(
          "w-full max-w-2xl rounded-xl border p-8 shadow-xl backdrop-blur-xl",
          isDark
            ? "border-white/10 bg-gradient-to-br from-dark-surface/90 to-dark-bg/90"
            : "border-light-border/50 bg-gradient-to-br from-light-surface/90 to-light-bg/90"
        )}
      >
        {step === 1 && (
          <div>
            <h1
              className={cn(
                "mb-2 text-2xl font-semibold",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Find Your Artist Profile
            </h1>
            <p
              className={cn(
                "mb-6 text-sm",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              Search for your artist name to connect your accounts
            </p>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                    isDark ? "text-dark-text-muted" : "text-light-text-muted"
                  )}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search for your artist name..."
                  className={cn(
                    "w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm transition-all",
                    isDark
                      ? "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
                      : "border-light-border bg-white text-light-text placeholder:text-light-text-muted focus:border-light-accent focus:outline-none focus:ring-2 focus:ring-light-accent/20"
                  )}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className={cn(
                  "rounded-lg px-6 py-2.5 text-sm font-medium transition-all",
                  isDark
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-light-accent text-white hover:bg-light-accent/90",
                  isSearching && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchResults.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleSelectArtist(artist)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-all hover:border-white/20",
                      isDark
                        ? "border-white/10 bg-white/5 hover:bg-white/10"
                        : "border-light-border bg-white hover:bg-light-surface"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {artist.avatar && (
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            isDark ? "text-dark-text" : "text-light-text"
                          )}
                        >
                          {artist.name}
                        </p>
                        {artist.genres && (
                          <p
                            className={cn(
                              "text-xs mt-1",
                              isDark ? "text-dark-text-muted" : "text-light-text-muted"
                            )}
                          >
                            {artist.genres.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h1
              className={cn(
                "mb-2 text-2xl font-semibold",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Connect Your Platforms
            </h1>
            <p
              className={cn(
                "mb-6 text-sm",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              Connect your social media accounts to see your analytics
            </p>

            {selectedArtist && (
              <div
                className={cn(
                  "mb-6 rounded-lg border p-4",
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-light-border bg-white"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium mb-2",
                    isDark ? "text-dark-text" : "text-light-text"
                  )}
                >
                  Selected Artist:
                </p>
                <p
                  className={cn(
                    "text-lg",
                    isDark ? "text-dark-text" : "text-light-text"
                  )}
                >
                  {selectedArtist.name}
                </p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              {PLATFORMS.map((platform) => {
                const isConnected = connectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => !isConnected && handleConnectPlatform(platform.id)}
                    disabled={isConnecting || isConnected}
                    className={cn(
                      "w-full rounded-lg border p-4 flex items-center justify-between transition-all",
                      isDark
                        ? "border-white/10 bg-white/5 hover:bg-white/10"
                        : "border-light-border bg-white hover:bg-light-surface",
                      isConnected && "opacity-60 cursor-not-allowed",
                      isConnecting && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white", platform.color)}>
                        {platform.name[0]}
                      </div>
                      <span
                        className={cn(
                          "font-medium",
                          isDark ? "text-dark-text" : "text-light-text"
                        )}
                      >
                        {platform.name}
                      </span>
                    </div>
                    {isConnected ? (
                      <Check className={cn("w-5 h-5", isDark ? "text-green-400" : "text-green-600")} />
                    ) : (
                      <span
                        className={cn(
                          "text-sm",
                          isDark ? "text-dark-text-muted" : "text-light-text-muted"
                        )}
                      >
                        Connect
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleComplete}
              className={cn(
                "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                isDark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-light-accent text-white hover:bg-light-accent/90"
              )}
            >
              Complete Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
