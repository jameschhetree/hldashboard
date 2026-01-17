# Artist Dashboard - Master Project Document

## 🎯 Project Overview
**Name:** Artist Dashboard (HL Dashboard)  
**Type:** SaaS Platform for Music Artists  
**Goal:** Aggregate multi-platform streaming/social stats (Spotify, Apple Music, YouTube, Instagram, TikTok) into a unified, AI-powered analytics dashboard with actionable insights.

---

## 📋 Core Objectives

### Primary Goals
1. **Unified Analytics:** Single dashboard showing all platform metrics
2. **AI-Powered Insights:** Weekly recommendations via app + email
3. **Scalable SaaS:** User accounts, verification, automated data aggregation
4. **Beautiful UX:** Modern, dark-themed, customizable interface
5. **MVP First:** Visual prototype → Functional MVP → Full SaaS

### Success Metrics
- ✅ Artists referring the app to others
- ✅ Artists finding daily utility in the platform
- ✅ Seamless experience for 5+ artists (initial scale)
- ✅ User retention and engagement

---

## 🎨 Design Vision
- **Theme:** Dark, sleek, modern (inspired by provided UI examples)
- **Layout:** Left sidebar navigation + main content area with cards/widgets
- **Key Sections:**
  - Dashboard/Overview (aggregated stats)
  - Platform-specific views (Spotify, Apple, YouTube, IG, TikTok)
  - AI Recommendations section
  - Settings/Profile (account, API connections)
- **Visual Elements:** Charts, progress bars, trend indicators, color-coded metrics

---

## 🚀 Features

### MVP (Phase 1) - Visual Prototype
- [ ] Dark & light theme toggle
- [ ] Left sidebar navigation menu
- [ ] Main dashboard hero section
- [ ] Mock data visualization (charts, cards, metrics)
- [ ] Responsive layout
- [ ] Key metric cards (total streams, followers, revenue estimates)
- [ ] Platform-specific stat cards (Top 5: Spotify, Apple, YouTube, IG, TikTok)
- [ ] Hover effects and modern interactions
- [ ] Variety of chart types (line, bar, donut, area)

### Phase 2 - Functional MVP (Dashboard + Analytics Only)
- [ ] User authentication (Gmail/Apple OAuth via NextAuth.js)
- [ ] Songstats API integration (test key)
- [ ] Data aggregation from Songstats
- [ ] Daily/periodic data sync (once per day or every few days)
- [ ] Manual refresh capability (2x/day limit)
- [ ] Real dashboard data display
- [ ] Platform connection/verification flow (Top 5 platforms)
- [ ] Historical data storage and trend visualization

### Phase 3 - Full SaaS
- [ ] Multi-user support (5+ artists)
- [ ] Subscription/payment integration
- [ ] Advanced AI recommendations
- [ ] Customizable dashboard widgets
- [ ] Export reports (PDF, CSV)
- [ ] Historical data tracking
- [ ] Team collaboration features
- [ ] API rate limiting & scaling

---

## 🛠 Tech Stack Recommendations

### Frontend
**Selected:** **Next.js 14+ (React)** with **TypeScript**
- **Why:** Best long-term choice for SaaS, server-side rendering, API routes, excellent performance
- **Learning Curve:** Will teach TypeScript basics as we build (it's just JavaScript with types!)
- **UI Framework:** **Tailwind CSS** + **shadcn/ui** (modern, customizable components, dark/light mode support)
- **Charts:** **Recharts** (beautiful, responsive, works great with React)
- **State Management:** **Zustand** (lightweight, simple, perfect for this project)
- **Forms:** **React Hook Form** + **Zod** (validation)

### Backend
**Recommended:** **Next.js API Routes** (full-stack) OR **Node.js + Express**
- **Why Next.js API Routes:** Simpler for MVP, same codebase, built-in API handling
- **Why Express:** More flexibility, traditional separation, easier to scale separately

### Database
**Recommended:** **PostgreSQL** (via **Supabase** or **Vercel Postgres**)
- **Why:** Relational data (users, artists, stats, recommendations), excellent for SaaS
- **Alternative:** **MongoDB** (if you prefer NoSQL, but PostgreSQL is better for structured data)
- **ORM:** **Prisma** (type-safe, excellent DX, migrations)

**Note:** Firebase is fine, but PostgreSQL is more standard for SaaS with complex queries

### Authentication
**Selected:** **NextAuth.js** (Next.js)
- **Why:** Free, open-source, perfect for Next.js, supports Gmail/Apple OAuth
- **Implementation:** Google OAuth + Apple Sign-In, then platform-specific OAuth flows

### AI/Recommendations
**Recommended:** **OpenAI API** (GPT-4) or **Anthropic Claude**
- **Why:** Best for generating insights from data
- **Alternative:** **Gemini** (you've used it, good option)
- **Implementation:** Weekly cron job → analyze aggregated stats → generate recommendations → store in DB → email + app notification

### Email Service
**Recommended:** **Resend** or **SendGrid**
- **Why:** Modern, developer-friendly, good deliverability
- **Alternative:** **AWS SES** (cheaper at scale)

### Hosting/Deployment
**Recommended:** **Vercel** (Next.js) or **Railway** / **Render**
- **Why Vercel:** Best for Next.js, automatic deployments, free tier
- **Database Hosting:** **Supabase** (PostgreSQL + auth + storage) or **Vercel Postgres**

### API Integration
- **Songstats API:** Primary data source (sandbox key: `ab31010a-899e-4ba0-8132-34d71167fc8f`)
  - **Base URL:** `https://api.songstats.com/enterprise/v1`
  - **Authentication:** API key in header `apikey: [key]`
  - **Selected Endpoints for MVP:**
    - ✅ **Get Artist Info** - Basic metadata (name, avatar, bio, genres, country)
    - ✅ **Get Artist Current Stats** - Current streams, followers, listeners across platforms
    - ✅ **Get Artist Historic Stats** - Historical data for trend charts
    - ✅ **Get Artist Top Tracks** - Top-performing tracks
    - ✅ **Get Artist Audience** - Demographics/geographic data (Phase 2)
    - ✅ **Get Artist Catalog** - Full track list (Phase 2)
    - ✅ **Get Artist Top Playlists** - Playlist placements (Phase 2)
- **Platform APIs (Future):** Spotify API, Apple Music API, YouTube Data API, Instagram Graph API, TikTok API

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Dashboard   │  │  Analytics   │  │  AI Insights │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕ API Calls
┌─────────────────────────────────────────────────────────┐
│              Backend API (Next.js API Routes)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Auth       │  │  Data Sync   │  │  AI Service  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
         ↕                    ↕                    ↕
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PostgreSQL  │    │ Songstats API│    │  OpenAI API  │
│   (Supabase) │    │  (Sandbox)   │    │   (GPT-4)    │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 🔄 User Flow

1. **Sign Up** → Email verification → Onboarding
2. **Connect Platforms** → Verify artist identity → Link Songstats
3. **Dashboard** → View aggregated stats → Explore insights
4. **Weekly AI Report** → Receive email + in-app notification → Review recommendations
5. **Settings** → Customize dashboard → Manage account

---

## 📅 Development Phases

### Phase 1: Visual MVP (Current Focus)
- Set up Next.js 14 + TypeScript + Tailwind CSS
- Create dark/light theme system (black/grey vs cream/green)
- Build left sidebar navigation
- Design main dashboard hero section
- Create stat cards, charts (line, bar, donut, area)
- Implement hover effects and modern interactions
- Use mock data for all visualizations
- **Scope:** Dashboard + Analytics pages only (no auth, no API yet)

### Phase 2: Authentication & Database (After Visual MVP)
- Set up Supabase (PostgreSQL + Auth)
- Implement NextAuth.js with Google/Apple OAuth
- Create user schema (one artist per account)
- Build sign up/login pages
- Platform connection flow (Top 5 platforms)

### Phase 3: API Integration (After Auth)
- Integrate Songstats API (test key)
- Create data sync service (daily/periodic)
- Build API routes for data fetching
- Store aggregated data in database
- Implement manual refresh (2x/day limit)
- Historical data storage

### Phase 4: AI Recommendations (Future - Not in MVP)
- Set up OpenAI/Claude integration
- Create recommendation generation service
- Build weekly cron job
- Implement email notifications
- User tone selection (Professional/Casual/Data-driven)

### Phase 5: Polish & Testing
- Error handling and loading states
- Responsive design testing
- Performance optimization
- User testing with 5 artists

---

## ✅ Answered Questions (Decisions Made)

### API & Data
1. **Songstats API:** Using test key `ab31010a-899e-4ba0-8132-34d71167fc8f`, docs at https://docs.songstats.com
   - Provides TikTok sound usage data
   - Historical data available if artist already in database
   - Streamlined endpoints for full catalog access
   - Pricing tiers: 8 EUR/artist (50 EUR min) → scales down to 2 EUR/artist at 600+ artists
2. **Data Refresh:** Once daily or every few days (not real-time). Users can manually trigger refresh up to 2x/day
3. **Historical Data:** Store snapshots to show trends over time

### User Experience
4. **Onboarding:** 
   - Sign in with Gmail/Apple (OAuth)
   - Then verify each platform individually: Spotify, Apple Music, YouTube, Instagram, TikTok
   - Each platform requires separate OAuth/verification
5. **Dashboard Customization:** 
   - Light and dark mode toggle
   - Layout preference: left sidebar menu, main hero is dashboard
   - Hover effects, modern feel like provided examples
6. **AI Recommendations:** 
   - All types: growth tips, release timing, content strategy, audience insights
   - Actionable steps (not just analytics)
   - User picks tone: Professional, Casual, or Data-driven

### Technical
7. **Multi-Artist Support:** **One account = one artist** (for MVP, can expand later)
8. **Rate Limiting:** Songstats API limits apply. For 5 artists, should be manageable. Implement caching and respect rate limits
9. **Caching Strategy:** Cache API responses for several hours, allow manual refresh (2x/day max per user)

### Business
10. **Pricing Model:** TBD for future, focus on MVP first
11. **Data Retention:** Store historical data for trend analysis (duration TBD)

### Design
12. **Color Palette:**
   - **Dark Mode:** Black, white, grey tones
   - **Light Mode:** Cream grey with green/earthy nature tones
13. **Chart Types:** Variety (line, bar, donut, area) - use what makes sense for each metric
14. **Platform Focus:** Top 5 only - Spotify, Apple Music, YouTube, Instagram, TikTok

---

## 📝 Next Steps

1. ✅ **Create this master document** (DONE)
2. ✅ **Answer key questions** (DONE)
3. ⏭ **Set up development environment** (Next.js 14, TypeScript, Tailwind)
4. ⏭ **Build visual MVP** (Dashboard + Analytics with mock data)
5. ⏭ **Iterate based on feedback**

## 💰 Cost Estimate (MVP Phase)

- **Vercel Hosting:** Free tier (sufficient for MVP)
- **Supabase:** Free tier (500MB database, 50K monthly active users)
- **NextAuth.js:** Free (open source)
- **Songstats API:** Test key (free for development)
- **OpenAI API:** ~$10-50/month for AI recommendations (Phase 4, not MVP)
- **Total MVP Cost:** ~$0-20/month (mostly free tiers)
- **Future Scaling:** Songstats pricing starts at 8 EUR/artist (50 EUR min) when ready

---

## 🎓 Learning Resources (As We Build)

- Next.js Documentation
- TypeScript Basics
- Prisma ORM
- Tailwind CSS
- React Patterns
- API Design Best Practices
- Database Design
- Authentication Security

---

## 📌 Notes
- Start with visual MVP (no API yet) to validate design
- Use Songstats sandbox for development
- Focus on 5 artists initially for testing
- Build for scalability from day one
- Document everything as we go

---

**Last Updated:** January 15, 2025  
**Status:** Ready for Development → Starting Visual MVP

## 🎯 MVP Scope Clarification

**INCLUDED in MVP:**
- ✅ Dashboard page (main hero)
- ✅ Analytics page (platform-specific views)
- ✅ Dark/Light theme toggle
- ✅ Left sidebar navigation
- ✅ Mock data visualizations
- ✅ All Top 5 platform cards (Spotify, Apple, YouTube, IG, TikTok)

**NOT INCLUDED in MVP (Phase 2+):**
- ❌ Authentication (Phase 2)
- ❌ Songstats API integration (Phase 2)
- ❌ AI Recommendations (Phase 4)
- ❌ Settings page (Phase 2+)
- ❌ Email notifications (Phase 4)
