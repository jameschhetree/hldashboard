#!/bin/bash

echo "🚀 Running Prisma Migration..."
echo ""

cd "/Users/jameschhetree/Desktop/HL Dashboard"

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    exit 1
fi

echo "✅ Found .env file"
echo ""

# Try using local Prisma binary first
if [ -f "./node_modules/.bin/prisma" ]; then
    echo "Using local Prisma binary..."
    ./node_modules/.bin/prisma migrate dev --name init
else
    echo "Using npx..."
    npx prisma@5.20.0 migrate dev --name init
fi

echo ""
echo "Migration complete!"
