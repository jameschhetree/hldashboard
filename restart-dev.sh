#!/bin/bash

echo "🔄 Restarting Next.js dev server..."
echo ""

cd "/Users/jameschhetree/Desktop/HL Dashboard"

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null

# Wait a moment
sleep 1

# Start the dev server
echo "Starting dev server..."
npm run dev
