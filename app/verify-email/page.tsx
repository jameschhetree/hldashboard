"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    // Verify email
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login?verified=true");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to verify email");
        }
      })
      .catch((error) => {
        setStatus("error");
        setMessage("An error occurred while verifying your email");
      });
  }, [searchParams, router]);

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

        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
            <h1
              className={cn(
                "text-2xl font-semibold mb-2",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Verifying your email...
            </h1>
            <p
              className={cn(
                "text-sm",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1
              className={cn(
                "text-2xl font-semibold mb-2",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Email Verified!
            </h1>
            <p
              className={cn(
                "text-sm mb-6",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              {message}
            </p>
            <p
              className={cn(
                "text-xs",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h1
              className={cn(
                "text-2xl font-semibold mb-2",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Verification Failed
            </h1>
            <p
              className={cn(
                "text-sm mb-6",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              {message}
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
          </>
        )}
      </div>
    </div>
  );
}
