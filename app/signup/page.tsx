"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("=== SIGNUP FORM SUBMITTED ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password length:", password.length);
    console.log("Confirm password length:", confirmPassword.length);
    
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      console.log("Password too short");
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    console.log("Creating account for:", email);

    try {
      // Create user account
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("Signup response status:", response.status);

      const data = await response.json();
      console.log("Signup response data:", data);

      if (!response.ok) {
        console.error("Signup error:", data);
        const errorMessage = data.error || `Failed to create account (Status: ${response.status})`;
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      console.log("Account created successfully, attempting auto-login...");

      // Small delay to ensure user is saved to database
      await new Promise(resolve => setTimeout(resolve, 500));

      // Auto-login after successful signup
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Login result:", loginResult);

      if (loginResult?.error) {
        console.error("Auto-login error:", loginResult.error);
        setError(`Account created successfully! However, auto-login failed: ${loginResult.error}. Redirecting to login page...`);
        setIsLoading(false);
        // Still redirect to login page so they can log in
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }

      if (!loginResult?.ok) {
        console.error("Login not successful:", loginResult);
        setError("Account created successfully! However, auto-login failed. Redirecting to login page...");
        setIsLoading(false);
        // Still redirect to login page so they can log in
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }

      console.log("Auto-login successful, redirecting to onboarding...");

      // Redirect to onboarding to set up artist profile
      router.push("/onboarding");
    } catch (err) {
      console.error("Signup exception:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("=== GOOGLE SIGNUP CLICKED ===");
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Attempting Google sign up...");
      const result = await signIn("google", { callbackUrl: "/onboarding" });
      console.log("Google sign up result:", result);
    } catch (err) {
      console.error("Google signup error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign up with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 z-10">
      <div
        className={cn(
          "w-full max-w-md rounded-xl border p-8 shadow-xl backdrop-blur-xl relative z-10",
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
            Create Account
          </h1>
          <p
            className={cn(
              "text-sm",
              isDark ? "text-dark-text-muted" : "text-light-text-muted"
            )}
          >
            Start tracking your music analytics
          </p>
        </div>

        {error && (
          <div
            className={cn(
              "mb-4 rounded-xl p-4 text-sm font-medium border-2",
              isDark 
                ? "bg-red-500/20 text-red-400 border-red-500/30" 
                : "bg-red-50 text-red-700 border-red-200"
            )}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              className={cn(
                "mb-1 block text-sm font-medium",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={cn(
                "w-full rounded-lg border px-4 py-2.5 text-sm transition-all",
                isDark
                  ? "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
                  : "border-light-border bg-white text-light-text placeholder:text-light-text-muted focus:border-light-accent focus:outline-none focus:ring-2 focus:ring-light-accent/20"
              )}
              placeholder="Your name"
            />
          </div>

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

          <div>
            <label
              className={cn(
                "mb-1 block text-sm font-medium",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              Password
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
              <p className={cn(
                "mt-2 text-sm font-medium",
                isDark ? "text-red-400" : "text-red-600"
              )}>
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
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div
            className={cn(
              "h-px flex-1",
              isDark ? "bg-white/10" : "bg-light-border"
            )}
          />
          <span
            className={cn(
              "px-4 text-xs",
              isDark ? "text-dark-text-muted" : "text-light-text-muted"
            )}
          >
            OR
          </span>
          <div
            className={cn(
              "h-px flex-1",
              isDark ? "bg-white/10" : "bg-light-border"
            )}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            console.log("Google signup button clicked directly!");
            handleGoogleSignup(e);
          }}
          disabled={isLoading}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2",
            isDark
              ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
              : "border-light-border bg-white text-light-text hover:bg-light-surface",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p
          className={cn(
            "mt-6 text-center text-sm",
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          )}
        >
          Already have an account?{" "}
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
