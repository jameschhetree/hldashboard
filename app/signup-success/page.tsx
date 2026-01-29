"use client";

import { useSearchParams } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignupSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 z-10">
      <div
        className={cn(
          "w-full max-w-md rounded-xl border p-8 shadow-xl backdrop-blur-xl text-center",
          isDark
            ? "border-white/10 bg-gradient-to-br from-dark-surface/90 to-dark-bg/90"
            : "border-light-border/50 bg-gradient-to-br from-light-surface/90 to-light-bg/90"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/images/logo.png"
            alt="HL Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span
            className={cn(
              "text-xl font-bold",
              isDark ? "text-dark-text" : "text-light-text"
            )}
          >
            ArtistHub
          </span>
        </div>

        <Mail className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        
        <h1
          className={cn(
            "text-2xl font-semibold mb-2",
            isDark ? "text-dark-text" : "text-light-text"
          )}
        >
          Account Created!
        </h1>
        
        <p
          className={cn(
            "text-sm mb-6",
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          )}
        >
          Your account has been created successfully. You can now log in to get started.
        </p>

        <Link
          href="/login"
          className={cn(
            "inline-block rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
            isDark
              ? "bg-white text-black hover:bg-white/90"
              : "bg-light-accent text-white hover:bg-light-accent/90"
          )}
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
