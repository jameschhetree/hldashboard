import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            throw new Error("Email and password are required");
          }

          console.log("Looking up user:", credentials.email);
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("User not found:", credentials.email);
            throw new Error("Invalid email or password");
          }

          // Check if user has a password (might be OAuth-only user)
          if (!user.password) {
            console.log("User has no password (OAuth-only):", credentials.email);
            throw new Error("This account was created with Google. Please sign in with Google.");
          }

          // Check password
          console.log("Checking password for user:", credentials.email);
          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            console.log("Password mismatch for user:", user.email);
            throw new Error("Invalid email or password");
          }

          console.log("Login successful for user:", user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error: any) {
          console.error("Authorize error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth v5: NextAuth() returns an object containing route handlers
const { handlers } = NextAuth(authOptions);

// Wrap handlers with error catching to prevent dev server crashes
const wrappedGET = async (req: Request, context: any) => {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/auth/[...nextauth]/route.ts:GET',message:'handler_called',data:{url:req.url,method:'GET'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    return await handlers.GET(req, context);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/auth/[...nextauth]/route.ts:GET',message:'handler_error',data:{error:error instanceof Error ? error.message : 'Unknown error'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    console.error('NextAuth GET handler error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

const wrappedPOST = async (req: Request, context: any) => {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/auth/[...nextauth]/route.ts:POST',message:'handler_called',data:{url:req.url,method:'POST'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    return await handlers.POST(req, context);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/03f79a81-b1f0-4f62-a445-1eabb44bb78a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/auth/[...nextauth]/route.ts:POST',message:'handler_error',data:{error:error instanceof Error ? error.message : 'Unknown error'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    console.error('NextAuth POST handler error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET = wrappedGET;
export const POST = wrappedPOST;
