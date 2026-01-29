#!/bin/bash

echo "🔍 DIAGNOSING NEXT.JS COMPILATION ISSUE"
echo "========================================"
echo ""

echo "1️⃣ Checking Node.js version..."
node --version
npm --version
echo ""

echo "2️⃣ Checking if dev server is running..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "   ✅ Port 3000 is in use"
    echo "   Process IDs: $(lsof -ti:3000 | tr '\n' ' ')"
else
    echo "   ❌ No process on port 3000"
fi
echo ""

echo "3️⃣ Checking .next directory..."
if [ -d ".next" ]; then
    echo "   ✅ .next directory exists"
    if [ -d ".next/static" ]; then
        echo "   ✅ .next/static exists"
        echo "   Files: $(ls .next/static 2>/dev/null | wc -l | tr -d ' ') directories"
    else
        echo "   ❌ .next/static does NOT exist - Next.js hasn't compiled!"
    fi
else
    echo "   ❌ .next directory does NOT exist - Next.js hasn't compiled!"
fi
echo ""

echo "4️⃣ Checking for common issues..."
if [ ! -f "node_modules/next/package.json" ]; then
    echo "   ❌ Next.js not installed! Run: npm install"
else
    echo "   ✅ Next.js is installed"
fi

if [ ! -f "postcss.config.mjs" ] && [ ! -f "postcss.config.js" ]; then
    echo "   ⚠️  PostCSS config missing"
else
    echo "   ✅ PostCSS config exists"
fi

if [ ! -f "tailwind.config.ts" ] && [ ! -f "tailwind.config.js" ]; then
    echo "   ⚠️  Tailwind config missing"
else
    echo "   ✅ Tailwind config exists"
fi
echo ""

echo "5️⃣ Testing if server responds..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "000" ]; then
    if [ "$HTTP_CODE" = "000" ]; then
        echo "   ❌ Server not responding (connection refused)"
    else
        echo "   ✅ Server responding (HTTP $HTTP_CODE)"
    fi
else
    echo "   ⚠️  Server responded with HTTP $HTTP_CODE"
fi
echo ""

echo "💡 NEXT STEPS:"
echo "   1. If .next/static doesn't exist, the dev server isn't compiling"
echo "   2. Check the terminal where you ran 'npm run dev' for errors"
echo "   3. Look for red error messages or compilation failures"
echo "   4. Share any error messages you see"
echo ""
