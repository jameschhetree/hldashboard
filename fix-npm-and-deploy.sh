#!/bin/bash

# Fix npm permissions and deploy to Vercel

echo "🔧 Fixing npm permissions..."
sudo chown -R $(whoami) "$HOME/.npm"

echo ""
echo "📦 Installing Vercel CLI..."
npm install -g vercel

echo ""
echo "🚀 Deploying to Vercel..."
cd "/Users/jameschhetree/Desktop/HL Dashboard"
npx vercel --prod

echo ""
echo "✅ Done! Your app will be live at the URL shown above."
