#!/bin/bash

echo "🛑 Stopping any running dev servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process on port 3000"

echo "🧹 Clearing .next cache..."
rm -rf .next

echo "🚀 Starting dev server..."
npm run dev
