import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export async function getCurrentUser() {
  // #region agent log
  dbg("G", "lib/auth.ts:getCurrentUser", "enter", {});
  // #endregion
  const session = await getServerSession(authOptions);
  // #region agent log
  dbg("G", "lib/auth.ts:getCurrentUser", "session_result", {
    hasSession: !!session,
    hasUser: !!session?.user,
    userIdPresent: !!(session as any)?.user?.id,
  });
  // #endregion
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    // #region agent log
    dbg("G", "lib/auth.ts:requireAuth", "unauthorized", {});
    // #endregion
    throw new Error("Unauthorized");
  }
  // #region agent log
  dbg("G", "lib/auth.ts:requireAuth", "authorized", {
    userIdPresent: !!(user as any)?.id,
  });
  // #endregion
  return user;
}
