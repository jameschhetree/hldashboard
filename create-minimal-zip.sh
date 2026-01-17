#!/bin/bash

# Create minimal deployment zip - only essential files for AWS Amplify
# This ensures we stay under the 1,000 file limit

echo "Creating minimal deployment zip for AWS Amplify..."
echo "This will only include essential source files..."

# Remove old zip if it exists
rm -f deploy-minimal.zip

# Create zip with only essential files
zip -r deploy-minimal.zip \
  app/ \
  components/ \
  lib/ \
  public/ \
  package.json \
  package-lock.json \
  next.config.mjs \
  tailwind.config.ts \
  postcss.config.mjs \
  tsconfig.json \
  amplify.yml \
  .eslintrc.json \
  -x "*.DS_Store" \
  -x "*.log"

echo ""
echo "✅ Minimal deployment zip created: deploy-minimal.zip"
echo "📦 File size: $(du -h deploy-minimal.zip | cut -f1)"
echo "📦 File count: $(unzip -l deploy-minimal.zip 2>/dev/null | tail -1 | awk '{print $2}')"
echo ""
echo "📦 Upload deploy-minimal.zip to AWS Amplify Console"
echo ""
echo "Note: This zip only includes source files, not node_modules"
echo "      Amplify will run 'npm install' during build"
