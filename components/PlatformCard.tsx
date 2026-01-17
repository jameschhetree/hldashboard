"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

interface PlatformCardProps {
  platform: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  followers: string;
  streams: string;
  growth: string;
  growthType: "positive" | "negative";
}

export function PlatformCard({
  platform,
  icon: Icon,
  iconColor,
  followers,
  streams,
  growth,
  growthType,
}: PlatformCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "relative rounded-xl p-3 border backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden group",
        isDark
          ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-xl"
          : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-xl"
      )}
    >
      {/* Glass overlay with stronger blur */}
      <div
          className={cn(
          "absolute inset-0 rounded-xl backdrop-blur-md",
          isDark 
            ? "bg-gradient-to-br from-white/8 via-white/4 to-transparent" 
            : "bg-gradient-to-br from-black/8 via-black/4 to-transparent"
        )}
      />
      
      {/* Top/left highlight for glass effect */}
      <div
          className={cn(
          "absolute inset-0 rounded-xl opacity-60",
          isDark 
            ? "bg-gradient-to-br from-white/15 via-transparent to-transparent" 
            : "bg-gradient-to-br from-black/15 via-transparent to-transparent"
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={cn(
                "p-2 rounded-lg backdrop-blur-md border transition-transform group-hover:scale-110 flex-shrink-0",
                isDark 
                  ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white shadow-lg" 
                  : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black shadow-lg"
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            {platform && (
              <h3 className={cn(
                "text-sm font-semibold truncate",
                isDark ? "text-dark-text" : "text-light-text"
              )}>
                {platform}
              </h3>
            )}
          </div>
          <span
            className={cn(
              "text-xs font-medium flex items-center gap-1 px-2.5 py-1 rounded-md backdrop-blur-sm ml-3 flex-shrink-0",
              isDark 
                ? "text-dark-text-muted bg-white/5 border border-white/10" 
                : "text-light-text-muted bg-black/5 border border-black/10"
            )}
          >
            {growthType === "positive" && "↑"}
            {growthType === "negative" && "↓"}
            {growth}
          </span>
        </div>

        <div className="space-y-2">
          <div>
            <p className={cn(
              "text-xs mb-1.5",
              isDark ? "text-dark-text-muted-2" : "text-light-text-muted-2"
            )}>
              Followers
            </p>
            <p className={cn(
              "text-lg font-semibold",
              isDark ? "text-dark-text" : "text-light-text"
            )}>
              {followers}
            </p>
          </div>
          <div>
            <p className={cn(
              "text-xs mb-1.5",
              isDark ? "text-dark-text-muted-2" : "text-light-text-muted-2"
            )}>
              Total Streams
            </p>
            <p className={cn(
              "text-base font-medium",
              isDark ? "text-dark-text" : "text-light-text"
            )}>
              {streams}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
