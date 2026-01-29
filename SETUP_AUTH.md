# Authentication Setup Guide

## 🚀 Quick Setup Steps

### 1. Install Dependencies

Run this command in your terminal:

```bash
npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client @supabase/supabase-js bcryptjs
npm install -D @types/bcryptjs
```

### 2. Set Up Database (Choose One)

#### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (URI format)
5. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

#### Option B: Vercel Postgres

1. In your Vercel dashboard, go to your project
2. Go to **Storage** → **Create Database** → **Postgres**
3. Copy the connection string

### 3. Set Up Prisma

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your database connection string to `.env.local`:
   ```env
   DATABASE_URL=your-connection-string-here
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### 4. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set **Application type** to **Web application**
6. Add **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google` (for production)
7. Copy **Client ID** and **Client Secret**

### 5. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

### 6. Update `.env.local`

Add all your credentials:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=your-supabase-connection-string

# Songstats API (already set)
SONGSTATS_API_KEY=ab31010a-899e-4ba0-8132-34d71167fc8f
SONGSTATS_BASE_URL=https://api.songstats.com/enterprise/v1
```

### 7. Test It Out!

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/login`
3. Try signing up with email or Google!

---

## 📝 What Was Created

### Database Schema (Prisma)
- `User` - User accounts
- `Account` - OAuth accounts (Google, etc.)
- `Session` - User sessions
- `ArtistProfile` - One per user
- `PlatformConnection` - Connected social platforms
- `StatsSnapshot` - Historical stats data

### Authentication
- `/app/login` - Login page
- `/app/signup` - Signup page
- `/app/onboarding` - Platform connection flow
- `/app/api/auth/[...nextauth]` - NextAuth API route
- `/app/api/auth/signup` - Email signup endpoint

### API Routes
- `/api/songstats/artist` - Search/get artist info
- `/api/songstats/stats` - Get current stats
- `/api/songstats/historic` - Get historical stats
- `/api/platforms/connect` - Connect a platform
- `/api/platforms/disconnect` - Disconnect a platform

### Middleware
- `middleware.ts` - Protects routes, redirects unauthenticated users

### Utilities
- `lib/db.ts` - Prisma client
- `lib/songstats.ts` - Songstats API client
- `lib/auth.ts` - Auth helpers

---

## 🔒 Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- Use strong, unique secrets for production
- Keep your database connection strings secure
- Rotate API keys regularly

---

## 🐛 Troubleshooting

### "Prisma Client not generated"
Run: `npx prisma generate`

### "Database connection failed"
- Check your `DATABASE_URL` in `.env.local`
- Make sure your database is running
- Check firewall/network settings

### "NextAuth secret missing"
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Generate a new secret if needed

### "Google OAuth not working"
- Check redirect URIs match exactly
- Verify Client ID and Secret are correct
- Make sure Google+ API is enabled

---

## ✅ Next Steps

Once authentication is working:

1. Test the onboarding flow
2. Connect platforms via Songstats
3. Update dashboard to fetch real data
4. Add loading states and error handling
