import { NextRequest, NextResponse } from "next/server";

/**
 * Clear session cookies
 * Access at: http://localhost:3000/api/auth/clear-session
 */
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ 
    success: true, 
    message: "Session cleared. Please refresh your browser." 
  });

  // Clear NextAuth session cookies
  response.cookies.delete("next-auth.session-token");
  response.cookies.delete("__Secure-next-auth.session-token");
  response.cookies.delete("next-auth.csrf-token");
  response.cookies.delete("__Host-next-auth.csrf-token");
  
  // Also clear any other potential session cookies
  const cookiesToDelete = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
  ];

  cookiesToDelete.forEach(cookieName => {
    response.cookies.set(cookieName, "", {
      expires: new Date(0),
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  });

  return response;
}
