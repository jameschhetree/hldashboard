"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Mail, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send reset email");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
          <p
            className={cn(
              "text-sm",
              isDark ? "text-dark-text-muted" : "text-light-text-muted"
            )}
          >
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

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

        {success ? (
          <div className="text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2
              className={cn(
                "text-xl font-semibold mb-2",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Check your email
            </h2>
            <p
              className={cn(
                "text-sm mb-6",
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              )}
            >
              We&apos;ve sent a password reset link to <strong>{email}</strong>
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
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={cn(
                  "mb-1 block text-sm font-medium",
                  isDark ? "text-dark-text" : "text-light-text"
                )}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "w-full rounded-lg border px-4 py-2.5 text-sm transition-all",
                  isDark
                    ? "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
                    : "border-light-border bg-white text-light-text placeholder:text-light-text-muted focus:border-light-accent focus:outline-none focus:ring-2 focus:ring-light-accent/20"
                )}
                placeholder="you@example.com"
              />
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
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
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
