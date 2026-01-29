import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// #region agent log
function dbg(hypothesisId: string, location: string, message: string, data: Record<string, unknown>) {
  fetch("http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "debug-session",
      runId: "pre-fix",
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

export async function middleware(req: NextRequest) {
  // TEMPORARILY DISABLED: Skip all middleware logic since auth is not being used
  // This prevents middleware from interfering with static asset loading on refresh
  return NextResponse.next();
  
  /* ORIGINAL AUTH LOGIC - COMMENTED OUT
  // Skip middleware entirely for static assets and API routes
  const pathname = req.nextUrl.pathname;
  
  // Explicitly allow all static assets, images, and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/videos/") ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|mp4|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email", "/signup-success", "/api/auth", "/api/admin", "/test-simple", "/test-js", "/test-react"];
  const isPublicPath = publicPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // If no token and not a public path, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
  */
}

export const config = {
  // TEMPORARILY DISABLED: Don't match any routes to prevent middleware from running
  // This ensures static assets load correctly on refresh
  matcher: [],
  
  /* ORIGINAL MATCHER - COMMENTED OUT
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|css|js|woff|woff2|ttf|eot)$).*)",
  ],
  */
};
