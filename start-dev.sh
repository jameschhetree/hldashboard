#!/bin/bash

echo "🚀 Starting Next.js dev server..."
echo ""

cd "/Users/jameschhetree/Desktop/HL Dashboard"

# Kill any existing processes on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Start the dev server
echo "Starting on http://localhost:3000"
echo ""
npm run dev
