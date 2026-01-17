"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-white",
}: StatCardProps) {
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
      
      {/* Subtle gradient border glow on hover */}
      <div
          className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isDark 
            ? "bg-gradient-to-r from-white/15 via-transparent to-white/15" 
            : "bg-gradient-to-r from-black/15 via-transparent to-black/15"
        )}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={cn(
              "text-xs font-medium mb-2",
              isDark ? "text-dark-text-muted-2" : "text-light-text-muted-2"
            )}>
              {title}
            </p>
            <p className={cn(
              "text-xl sm:text-2xl font-bold mb-1.5 bg-gradient-to-b bg-clip-text",
              isDark 
                ? "text-transparent from-white to-dark-text-muted" 
                : "text-transparent from-black to-light-text-muted"
            )}>
              {value}
            </p>
            {change && (
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm",
                    isDark 
                      ? "text-dark-text-muted bg-white/5 border border-white/10" 
                      : "text-light-text-muted bg-black/5 border border-black/10"
                  )}
                >
                  {changeType === "positive" && "↑"}
                  {changeType === "negative" && "↓"}
                  {change}
                </span>
                <span className={cn(
                  "text-xs",
                  isDark ? "text-dark-text-muted-3" : "text-light-text-muted-3"
                )}>
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "p-2 rounded-lg flex-shrink-0 backdrop-blur-md border transition-transform group-hover:scale-110",
              isDark 
                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white shadow-lg" 
                : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black shadow-lg"
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
