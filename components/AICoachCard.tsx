"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

interface AICoachCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function AICoachCard({
  title,
  description,
  icon: Icon,
}: AICoachCardProps) {
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
      
      <div className="relative z-10 flex items-start gap-2.5">
        <div
          className={cn(
            "p-2 rounded-lg flex-shrink-0 backdrop-blur-md border transition-transform group-hover:scale-110",
            isDark 
              ? "bg-white/10 border-white/20 text-white"
              : "bg-black/10 border-black/20 text-black"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-sm font-semibold mb-2",
            isDark ? "text-dark-text" : "text-light-text"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-xs leading-relaxed",
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          )}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
