"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { 
  LayoutDashboard, 
  BarChart3, 
  Moon, 
  Sun,
  TrendingUp,
  Users,
  Network,
  Target,
  DollarSign,
  BookOpen,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI Coach", href: "/ai-coach", icon: TrendingUp },
  { name: "Collaborate", href: "/collaborate", icon: Users },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Revenue", href: "/revenue", icon: DollarSign },
  { name: "Referral Network", href: "/referral-network", icon: Network },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Globe", href: "/globe", icon: Globe },
];

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const isDark = theme === "dark";

  return (
    <>
      <div className={cn(
        "fixed left-0 top-0 h-full border-r flex flex-col z-50 backdrop-blur-xl transform transition-all duration-300 overflow-hidden",
        "hidden sm:flex", // Hide on mobile, show on larger screens
        isCollapsed ? "w-0 -translate-x-full opacity-0" : "w-64 opacity-100",
        isDark 
          ? "border-dark-border/50 bg-gradient-to-b from-dark-surface/90 to-dark-bg/90" 
          : "border-light-border/50 bg-gradient-to-b from-light-surface/90 to-light-bg/90"
      )}>
      {/* Logo/Brand */}
      <div className={cn("p-6 border-b relative", isDark ? "border-dark-border" : "border-light-border")}>
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="HL Logo"
            width={160}
            height={53}
            className="h-10 w-auto object-contain"
            priority
            unoptimized
          />
          <span className={cn("text-xl font-bold", isDark ? "text-dark-text" : "text-light-text")}>
            ArtistHub
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? isDark 
                    ? "bg-white/10 border border-white/20 text-white backdrop-blur-sm" 
                    : "bg-black/10 border border-black/20 text-black backdrop-blur-sm"
                  : isDark
                    ? "text-dark-text-muted hover:bg-white/5 hover:text-dark-text"
                    : "text-light-text-muted hover:bg-black/5 hover:text-light-text"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle & Footer */}
      <div className={cn("p-4 border-t space-y-2", isDark ? "border-dark-border" : "border-light-border")}>
        <button
          onClick={toggleTheme}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            isDark
              ? "text-dark-text-muted hover:bg-dark-card hover:text-dark-text"
              : "text-light-text-muted hover:bg-light-card hover:text-light-text"
          )}
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-5 h-5" />
              <span className="font-medium">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              <span className="font-medium">Dark Mode</span>
            </>
          )}
        </button>
      </div>
      
      {/* Toggle Button - only show when sidebar is visible */}
      {!isCollapsed && (
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute top-1/2 -right-3 w-7 h-7 rounded-full border flex items-center justify-center z-50 transition-all duration-300 shadow-lg",
            isDark
              ? "bg-dark-surface border-white/30 text-white hover:bg-white/20 hover:border-white/40"
              : "bg-light-surface border-black/30 text-black hover:bg-black/20 hover:border-black/40"
          )}
          style={{ transform: "translateY(-50%)" }}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
    
    {/* Toggle Button when collapsed */}
    {isCollapsed && (
      <button
        onClick={toggleSidebar}
        className={cn(
          "fixed top-1/2 left-0 w-7 h-7 rounded-r-full border-r border-t border-b flex items-center justify-center z-50 transition-all duration-300 shadow-lg hidden sm:flex",
          isDark
            ? "bg-dark-surface border-white/30 text-white hover:bg-white/20 hover:border-white/40"
            : "bg-light-surface border-black/30 text-black hover:bg-black/20 hover:border-black/40"
        )}
        style={{ transform: "translateY(-50%)" }}
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    )}
    </>
  );
}
