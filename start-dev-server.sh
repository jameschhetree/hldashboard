#!/bin/bash

echo "🛑 Stopping any running servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "🧹 Clearing caches..."
rm -rf .next
rm -rf node_modules/.cache

echo "🚀 Starting dev server..."
echo "   Watch for '✓ Ready' message - this means compilation succeeded"
echo "   If you see errors, share them with me"
echo ""

npm run dev
