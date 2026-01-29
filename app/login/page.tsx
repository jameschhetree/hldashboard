"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Redirect if already authenticated
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/login/page.tsx:useEffect',message:'session_check',data:{status,hasSession:!!session},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    if (status === "authenticated" && session) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/login/page.tsx:useEffect',message:'redirect_authenticated',data:{to:'/'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      router.push("/");
    }
  }, [status, session, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("=== LOGIN FORM SUBMITTED ===");
    console.log("Email:", email);
    console.log("Password length:", password.length);
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login for:", email);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Login result:", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        // Show the actual error message
        setError(result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        // Successfully logged in - redirect to dashboard
        // Dashboard will check for artist profile and redirect to onboarding if needed
        router.push("/");
        // Avoid router.refresh() here; it can contribute to reload loops in dev.
      } else {
        console.error("Unexpected login result:", result);
        setError("Login failed. Please check your credentials and try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsLoading(true);
    setError("");
    
    try {
      // For OAuth providers, signIn redirects to the provider
      // This will redirect to Google's OAuth page
      await signIn("google", { 
        callbackUrl: "/",
        redirect: true // OAuth needs redirect
      });
      
      // If we get here, something went wrong (should have redirected)
      setError("Google sign in failed. Please check your Google OAuth configuration.");
      setIsLoading(false);
    } catch (err) {
      console.error("Google login exception:", err);
      setError(err instanceof Error ? err.message : "Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 z-10">
      <div
        className={cn(
          "w-full max-w-md rounded-2xl border p-8 shadow-2xl backdrop-blur-2xl relative",
          isDark
            ? "border-white/20 bg-gradient-to-br from-dark-surface/95 via-dark-card/95 to-dark-surface/95 backdrop-blur-xl"
            : "border-light-border bg-white/95 backdrop-blur-xl shadow-lg"
        )}
      >
        <div className="mb-8 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image
              src="/images/logo.png"
              alt="HL Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span
              className={cn(
                "text-2xl font-bold tracking-tight",
                isDark ? "text-dark-text" : "text-light-text"
              )}
            >
              ArtistHub
            </span>
          </div>
          
          <h1
            className={cn(
              "mb-3 text-3xl font-bold",
              isDark ? "text-dark-text" : "text-light-text"
            )}
          >
            Welcome Back
          </h1>
          <p
            className={cn(
              "text-base",
              isDark ? "text-dark-text-muted" : "text-light-text-muted"
            )}
          >
            Sign in to your artist dashboard
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

        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div>
            <label
              className={cn(
                "mb-2 block text-sm font-semibold",
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
                "w-full rounded-xl border px-4 py-3 text-base transition-all",
                isDark
                  ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                  : "border-light-border/80 bg-white/80 text-light-text placeholder:text-light-text-muted/70 focus:border-light-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-light-accent/30 shadow-sm"
              )}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className={cn(
                "mb-2 block text-sm font-semibold",
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
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-base transition-all",
                isDark
                  ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                  : "border-light-border/80 bg-white/80 text-light-text placeholder:text-light-text-muted/70 focus:border-light-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-light-accent/30 shadow-sm"
              )}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full rounded-xl px-4 py-3.5 text-base font-semibold transition-all shadow-lg",
              isDark
                ? "bg-white text-black hover:bg-white/95 hover:shadow-xl active:scale-[0.98]"
                : "bg-black text-white hover:bg-gray-900 hover:shadow-xl active:scale-[0.98]",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-7 flex items-center">
          <div
            className={cn(
              "h-px flex-1",
              isDark ? "bg-white/15" : "bg-light-border/60"
            )}
          />
          <span
            className={cn(
              "px-4 text-xs font-medium uppercase tracking-wider",
              isDark ? "text-dark-text-muted" : "text-light-text-muted"
            )}
          >
            OR
          </span>
          <div
            className={cn(
              "h-px flex-1",
              isDark ? "bg-white/15" : "bg-light-border/60"
            )}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Google button clicked directly!");
            handleGoogleLogin(e);
          }}
          onMouseDown={() => console.log("Google button mouse down")}
          disabled={isLoading}
          className={cn(
            "w-full rounded-xl border-2 px-4 py-3.5 text-base font-semibold transition-all flex items-center justify-center gap-3 shadow-md",
            isDark
              ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg active:scale-[0.98]"
              : "border-light-border/80 bg-white text-light-text hover:bg-gray-50 hover:shadow-lg active:scale-[0.98]",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            "mt-8 text-center text-sm",
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          )}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className={cn(
              "font-semibold underline underline-offset-2 transition-colors",
              isDark ? "text-white hover:text-white/80" : "text-black hover:text-gray-700"
            )}
          >
            Sign up
          </Link>
        </p>

        <p
          className={cn(
            "mt-3 text-center text-sm",
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          )}
        >
          <Link
            href="/forgot-password"
            className={cn(
              "font-medium underline underline-offset-2 transition-colors",
              isDark ? "text-white/80 hover:text-white" : "text-light-text-muted hover:text-light-text"
            )}
          >
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
}
