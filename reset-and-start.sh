#!/bin/bash
# Complete reset script to fix persistent 404 issues

echo "🔄 Resetting Next.js dev environment..."

# Kill any existing dev servers
echo "Stopping existing servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
sleep 2

# Remove all build artifacts and caches
echo "Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Clear npm cache (optional but helps)
# npm cache clean --force

echo "✅ Clean complete. Starting dev server..."
echo ""
echo "📝 Next steps:"
echo "1. Wait for 'Ready' message"
echo "2. Open http://localhost:3000/login"
echo "3. Test signup/login flow"
echo ""

npm run dev
