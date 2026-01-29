#!/bin/bash

echo "🚀 Installing packages..."
echo ""

cd "/Users/jameschhetree/Desktop/HL Dashboard"

# Try with local cache first
npm install --cache ./.npm-cache

# Check if it worked
if [ -d "node_modules/next-auth" ]; then
    echo ""
    echo "✅ SUCCESS! Packages installed!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npx prisma migrate dev --name init"
    echo "2. Run: npx prisma generate"
else
    echo ""
    echo "❌ Installation may have failed. Try running manually:"
    echo "   npm install"
fi
