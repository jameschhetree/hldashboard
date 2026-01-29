# Authentication & Social Integration Implementation Plan

## 🎯 Goal
Enable users to:
1. Sign up/login with email or Google OAuth
2. Connect their social platforms (TikTok, Instagram, YouTube, Spotify, Apple Music) via Songstats API
3. View a customized dashboard with their real data

---

## 📋 Step-by-Step Implementation

### **Phase 1: Database Setup** (Choose One)

#### Option A: Supabase (Recommended - Easiest)
- **Why:** Free tier, built-in auth, PostgreSQL, easy setup
- **Steps:**
  1. Create account at [supabase.com](https://supabase.com)
  2. Create new project
  3. Get connection string and API keys
  4. Install: `npm install @supabase/supabase-js @supabase/auth-helpers-nextjs`

#### Option B: Vercel Postgres (If you prefer Vercel ecosystem)
- **Why:** Integrated with Vercel, PostgreSQL
- **Steps:**
  1. In Vercel dashboard → Storage → Create Postgres database
  2. Get connection string
  3. Install: `npm install @vercel/postgres`

**Recommendation:** Start with **Supabase** (easier auth setup)

---

### **Phase 2: Authentication Setup (NextAuth.js)**

#### Step 1: Install Dependencies
```bash
npm install next-auth @auth/prisma-adapter
npm install prisma @prisma/client
npm install bcryptjs
npm install -D @types/bcryptjs
```

#### Step 2: Set Up NextAuth.js
1. Create `app/api/auth/[...nextauth]/route.ts`
2. Configure Google OAuth provider
3. Set up email/password authentication
4. Create session management

#### Step 3: Environment Variables
Create `.env.local`:
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (Supabase)
DATABASE_URL=your-supabase-connection-string

# Songstats API
SONGSTATS_API_KEY=ab31010a-899e-4ba0-8132-34d71167fc8f
SONGSTATS_BASE_URL=https://api.songstats.com/enterprise/v1
```

---

### **Phase 3: Database Schema (Prisma)**

#### Step 1: Initialize Prisma
```bash
npx prisma init
```

#### Step 2: Define Schema (`prisma/schema.prisma`)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // One artist per user (MVP)
  artistProfile ArtistProfile?
  
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model ArtistProfile {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Songstats artist ID (once connected)
  songstatsArtistId String?
  
  // Connected platforms
  platforms PlatformConnection[]
  
  // Stats snapshots (for historical data)
  statsSnapshots StatsSnapshot[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model PlatformConnection {
  id        String   @id @default(cuid())
  artistId  String
  artist    ArtistProfile @relation(fields: [artistId], references: [id], onDelete: Cascade)
  
  platform  String   // "spotify", "apple_music", "youtube", "instagram", "tiktok"
  isConnected Boolean @default(false)
  connectedAt DateTime?
  
  // Platform-specific data
  platformUserId String?
  platformUsername String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([artistId, platform])
}

model StatsSnapshot {
  id        String   @id @default(cuid())
  artistId  String
  artist    ArtistProfile @relation(fields: [artistId], references: [id], onDelete: Cascade)
  
  // Aggregated stats
  totalStreams    Int
  totalFollowers  Int
  monthlyListeners Int
  
  // Platform-specific stats (JSON)
  platformStats   Json
  
  snapshotDate    DateTime @default(now())
  
  createdAt DateTime @default(now())
}
```

#### Step 3: Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### **Phase 4: Authentication Pages**

#### Step 1: Create Login Page
- `app/login/page.tsx` - Login form with email/password and Google OAuth button

#### Step 2: Create Signup Page
- `app/signup/page.tsx` - Signup form

#### Step 3: Create Onboarding Flow
- `app/onboarding/page.tsx` - Platform connection wizard

---

### **Phase 5: Songstats API Integration**

#### Step 1: Create API Service
- `lib/songstats.ts` - API client for Songstats

#### Step 2: Create API Routes
- `app/api/songstats/artist/route.ts` - Get artist info
- `app/api/songstats/stats/route.ts` - Get current stats
- `app/api/songstats/historic/route.ts` - Get historical stats
- `app/api/songstats/tracks/route.ts` - Get top tracks

#### Step 3: Platform Connection Flow
- `app/api/platforms/connect/route.ts` - Connect platform via Songstats
- `app/api/platforms/disconnect/route.ts` - Disconnect platform

---

### **Phase 6: Protected Routes & Middleware**

#### Step 1: Create Auth Middleware
- `middleware.ts` - Protect routes, redirect unauthenticated users

#### Step 2: Update Layout
- Wrap app with session provider
- Add auth checks to pages

---

### **Phase 7: Dashboard Customization**

#### Step 1: Fetch Real Data
- Replace mock data with API calls
- Add loading states
- Add error handling

#### Step 2: Platform-Specific Views
- Show connected platforms
- Hide disconnected platforms
- Add "Connect Platform" buttons

---

## 🚀 Quick Start Order

1. **Set up Supabase** (15 min)
   - Create account & project
   - Get connection string

2. **Install dependencies** (5 min)
   ```bash
   npm install next-auth @supabase/supabase-js prisma @prisma/client
   ```

3. **Set up Prisma** (10 min)
   - Initialize Prisma
   - Create schema
   - Run migrations

4. **Set up NextAuth** (20 min)
   - Create NextAuth route
   - Configure Google OAuth
   - Set up email auth

5. **Create auth pages** (30 min)
   - Login page
   - Signup page
   - Onboarding flow

6. **Songstats integration** (30 min)
   - Create API client
   - Create API routes
   - Test with sandbox key

7. **Platform connection** (45 min)
   - Connection UI
   - API endpoints
   - Database updates

8. **Dashboard updates** (1 hour)
   - Replace mock data
   - Add real data fetching
   - Customize based on connections

---

## 📝 Files to Create

```
app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts
│   ├── songstats/
│   │   ├── artist/
│   │   │   └── route.ts
│   │   ├── stats/
│   │   │   └── route.ts
│   │   └── historic/
│   │       └── route.ts
│   └── platforms/
│       ├── connect/
│       │   └── route.ts
│       └── disconnect/
│           └── route.ts
├── login/
│   └── page.tsx
├── signup/
│   └── page.tsx
└── onboarding/
    └── page.tsx

lib/
├── songstats.ts
├── auth.ts
└── db.ts (Prisma client)

prisma/
└── schema.prisma

middleware.ts
.env.local
```

---

## 🔑 Key Decisions Needed

1. **Database:** Supabase or Vercel Postgres? (Recommend Supabase)
2. **Email Auth:** Use NextAuth email provider or custom? (NextAuth is easier)
3. **Platform Connection:** Via Songstats only, or direct OAuth? (Start with Songstats)
4. **Onboarding:** Single page or multi-step wizard? (Multi-step is better UX)

---

## ⚠️ Important Notes

- **Songstats Sandbox Key:** `ab31010a-899e-4ba0-8132-34d71167fc8f`
- **Rate Limits:** Respect Songstats API limits, implement caching
- **Security:** Never expose API keys in client-side code
- **Testing:** Test with sandbox first before production

---

## 🎯 Next Steps

**Ready to start?** Let me know which option you prefer:
1. **Start with Supabase setup** (I'll guide you through it)
2. **Start with NextAuth setup** (I'll create the files)
3. **Start with database schema** (I'll create Prisma schema)

Or I can create all the foundational files at once and you can fill in the API keys!
