#!/bin/bash

echo "🔍 Checking dev server status..."
echo ""

# Check if port 3000 is in use
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "✅ Dev server is running on port 3000"
else
    echo "❌ No dev server found on port 3000"
    echo "   Run: npm run dev"
    exit 1
fi

echo ""
echo "📦 Checking .next directory..."
if [ -d ".next" ]; then
    echo "✅ .next directory exists"
    echo "   Files in .next/static/chunks/:"
    ls -1 .next/static/chunks/ 2>/dev/null | head -5 || echo "   (chunks directory not found yet)"
else
    echo "❌ .next directory not found"
    echo "   The dev server needs to compile first"
fi

echo ""
echo "🌐 Testing server response..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000 2>&1 || echo "   Server not responding"

echo ""
echo "💡 If you see 404 errors in browser:"
echo "   1. Wait 10-20 seconds for compilation to finish"
echo "   2. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
echo "   3. Check terminal for compilation errors"
