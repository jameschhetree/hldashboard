"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "form">("loading");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setError("No reset token provided");
    } else {
      setStatus("form");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    const token = searchParams.get("token");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password");
        setStatus("error");
      } else {
        setStatus("success");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login?reset=success");
        }, 3000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 z-10">
      <div
        className={cn(
          "w-full max-w-md rounded-xl border p-8 shadow-xl backdrop-blur-xl",
          isDark
            ? "border-white/10 bg-gradient-to-br from-dark-surface/90 to-dark-bg/90"
            : "border-light-border/50 bg-gradient-to-br from-light-surface/90 to-light-bg/90"
        )}
      >
        <div className="mb-6 text-center">
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
          
          <h1
            className={cn(
              "mb-2 text-2xl font-semibold",
              isDark ? "text-dark-text" : "text-light-text"
            )}
          >
            Reset Password
          </h1>
        </div>

        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
            <p
              className={cn(
                "text-sm",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              Loading...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2
              className={cn(
                "text-xl font-semibold mb-2",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Password Reset!
            </h2>
            <p
              className={cn(
                "text-sm mb-6",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              Your password has been reset successfully. Redirecting to login...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2
              className={cn(
                "text-xl font-semibold mb-2",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Reset Failed
            </h2>
            <p
              className={cn(
                "text-sm mb-6",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              {error || "Invalid or expired reset token"}
            </p>
            <Link
              href="/forgot-password"
              className={cn(
                "inline-block rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                isDark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-light-accent text-white hover:bg-light-accent/90"
              )}
            >
              Request New Link
            </Link>
          </div>
        )}

        {status === "form" && (
          <>
            {error && (
              <div
                className={cn(
                  "mb-4 rounded-lg p-3 text-sm",
                  isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"
                )}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={cn(
                    "mb-1 block text-sm font-medium",
                    isDark ? "text-dark-text" : "text-light-text"
                  )}
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className={cn(
                    "w-full rounded-lg border px-4 py-2.5 text-sm transition-all",
                    isDark
                      ? "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
                      : "border-light-border bg-white text-light-text placeholder:text-light-text-muted focus:border-light-accent focus:outline-none focus:ring-2 focus:ring-light-accent/20"
                  )}
                  placeholder="••••••••"
                />
                <p
                  className={cn(
                    "mt-1 text-xs",
                    isDark ? "text-dark-text-muted" : "text-light-text-muted"
                  )}
                >
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <label
                  className={cn(
                    "mb-1 block text-sm font-medium",
                    isDark ? "text-dark-text" : "text-light-text"
                  )}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className={cn(
                    "w-full rounded-lg border px-4 py-2.5 text-sm transition-all",
                    password !== confirmPassword && confirmPassword.length > 0
                      ? isDark
                        ? "border-red-500 bg-white/5 text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        : "border-red-500 bg-white text-light-text placeholder:text-light-text-muted focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      : isDark
                      ? "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
                      : "border-light-border bg-white text-light-text placeholder:text-light-text-muted focus:border-light-accent focus:outline-none focus:ring-2 focus:ring-light-accent/20"
                  )}
                  placeholder="••••••••"
                />
                {password !== confirmPassword && confirmPassword.length > 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                  isDark
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-light-accent text-white hover:bg-light-accent/90",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </>
        )}

        <p
          className={cn(
            "mt-6 text-center text-sm",
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          )}
        >
          Remember your password?{" "}
          <Link
            href="/login"
            className={cn(
              "font-medium underline",
              isDark ? "text-white hover:text-white/80" : "text-light-accent hover:text-light-accent/80"
            )}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
