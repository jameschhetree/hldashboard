#!/bin/bash
# Quick fix script for Next.js build issues

echo "Stopping any running Next.js processes..."
pkill -f "next dev" || true

echo "Clearing Next.js cache..."
rm -rf .next

echo "Clearing node_modules cache..."
rm -rf node_modules/.cache

echo "Build cache cleared! Now run: npm run dev"
