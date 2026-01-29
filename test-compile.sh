#!/bin/bash

echo "🧪 TESTING NEXT.JS COMPILATION"
echo "==============================="
echo ""

echo "Clearing caches..."
rm -rf .next
rm -rf node_modules/.cache

echo ""
echo "Starting dev server (will timeout after 30 seconds)..."
echo "Watch for compilation errors below:"
echo ""

timeout 30 npm run dev 2>&1 || {
    echo ""
    echo "⏱️  Timeout reached or compilation failed"
    echo ""
    echo "Checking if .next/static was created..."
    if [ -d ".next/static" ]; then
        echo "✅ .next/static exists - compilation succeeded!"
    else
        echo "❌ .next/static does NOT exist - compilation failed!"
        echo ""
        echo "Last 20 lines of output:"
        echo "---"
    fi
}
