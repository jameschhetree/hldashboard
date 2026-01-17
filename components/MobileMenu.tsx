"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";
import { 
  LayoutDashboard, 
  BarChart3, 
  Moon, 
  Sun,
  Menu,
  X,
  TrendingUp,
  Users,
  ChevronRight,
  Network,
  Target,
  DollarSign,
  BookOpen,
  Globe,
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

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isDark = theme === "dark";

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsCollapsed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !isOpen) return;
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    
    if (diff < 0 && sidebarRef.current) {
      const translateX = Math.max(diff, -264); // -264px is the width (w-64)
      sidebarRef.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    const diff = currentXRef.current - startXRef.current;
    if (diff < -100) {
      // Swiped left enough to collapse
      setIsCollapsed(true);
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = "translateX(-264px)";
      }
    } else {
      // Spring back
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = "translateX(0)";
      }
    }
  };

  const handleToggle = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      if (sidebarRef.current) {
        sidebarRef.current.style.transform = "translateX(0)";
      }
    } else {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setIsCollapsed(false);
      }
    }
  };

  return (
    <>
      {/* Collapsed Arrow Button (when sidebar is collapsed) */}
      {isCollapsed && (
        <button
          onClick={handleToggle}
          className={cn(
            "fixed top-1/2 left-0 z-50 p-2 rounded-r-xl backdrop-blur-xl border-r border-t border-b sm:hidden shadow-lg",
            isDark
              ? "bg-dark-card/80 border-dark-border/50 text-dark-text"
              : "bg-light-card/80 border-light-border/50 text-light-text"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Menu Button (when sidebar is open or closed) */}
      {!isCollapsed && (
        <button
          onClick={handleToggle}
          className={cn(
            "fixed top-4 left-4 z-50 p-2.5 rounded-xl backdrop-blur-xl border sm:hidden shadow-lg",
            isDark
              ? "bg-dark-card/80 border-dark-border/50 text-dark-text"
              : "bg-light-card/80 border-light-border/50 text-light-text"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Mobile Sidebar Overlay */}
      {isOpen && !isCollapsed && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => {
              setIsOpen(false);
              setIsCollapsed(false);
            }}
          />
          <div
            ref={sidebarRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={cn(
              "fixed left-0 top-0 h-full w-64 border-r flex flex-col z-50 backdrop-blur-xl transform transition-transform duration-300 sm:hidden",
              isDark
                ? "border-dark-border/50 bg-gradient-to-b from-dark-surface/95 to-dark-bg/95"
                : "border-light-border/50 bg-gradient-to-b from-light-surface/95 to-light-bg/95"
            )}
            style={{ transform: isCollapsed ? "translateX(-264px)" : "translateX(0)" }}
          >
            {/* Logo/Brand */}
            <div className={cn("p-6 border-b", isDark ? "border-dark-border/50" : "border-light-border/50")}>
              <Link href="/" className="flex items-center gap-4" onClick={() => {
                setIsOpen(false);
                setIsCollapsed(false);
              }}>
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
                    onClick={() => {
                      setIsOpen(false);
                      setIsCollapsed(false);
                    }}
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

            {/* Theme Toggle */}
            <div className={cn("p-4 border-t", isDark ? "border-dark-border/50" : "border-light-border/50")}>
              <button
                onClick={toggleTheme}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isDark
                    ? "text-dark-text-muted hover:bg-dark-card/50 hover:text-dark-text"
                    : "text-light-text-muted hover:bg-light-card/50 hover:text-light-text"
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
          </div>
        </>
      )}
    </>
  );
}
