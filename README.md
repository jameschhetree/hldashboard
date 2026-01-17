# Artist Dashboard

A unified analytics dashboard for music artists, aggregating stats from Spotify, Apple Music, YouTube, Instagram, and TikTok.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/) or use `brew install node`)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
HL Dashboard/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components (to be created)
├── lib/                   # Utilities and helpers (to be created)
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration with custom themes
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Design System

### Dark Theme
- Background: Black (#0a0a0a)
- Surface: Dark grey (#141414)
- Text: White with muted variants

### Light Theme
- Background: Cream grey (#f5f5f0)
- Surface: Off-white (#fafaf5)
- Accents: Green/earthy tones

## 🔌 API Integration

Using Songstats API with test key for development.

**Selected Endpoints:**
- Get Artist Info
- Get Artist Current Stats
- Get Artist Historic Stats
- Get Artist Top Tracks
- Get Artist Audience (Phase 2)
- Get Artist Catalog (Phase 2)
- Get Artist Top Playlists (Phase 2)

## 📚 Documentation

- [Master Project Document](./PROJECT_MASTER_DOC.md) - Complete project specifications
- [Setup Instructions](./SETUP_INSTRUCTIONS.md) - Detailed setup guide

## 🛠 Tech Stack

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** Zustand
- **Icons:** Lucide React

## 📝 Next Steps

1. Install Node.js if not already installed
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Start building the dashboard UI components
