#!/bin/bash

# Create deployment zip for AWS Amplify
# This script excludes node_modules and .next but includes all necessary files

echo "Creating deployment zip for AWS Amplify..."
echo "This will exclude node_modules and other unnecessary files..."

# Remove old zip if it exists
rm -f deploy.zip

# Create zip with comprehensive exclusions to stay under file limit
zip -r deploy.zip . \
  -x "node_modules/*" \
  -x "node_modules/**/*" \
  -x ".next/*" \
  -x ".next/**/*" \
  -x ".git/*" \
  -x ".git/**/*" \
  -x "*.git/*" \
  -x ".DS_Store" \
  -x "*.log" \
  -x "*.tsbuildinfo" \
  -x "deploy.zip" \
  -x "create-deploy-zip.sh" \
  -x ".vscode/*" \
  -x ".idea/*" \
  -x "*.swp" \
  -x "*.swo" \
  -x "*~" \
  -x "coverage/*" \
  -x ".pnp/*" \
  -x ".pnp.js" \
  -x "*.pem"

echo ""
echo "✅ Deployment zip created: deploy.zip"
echo "📦 File size: $(du -h deploy.zip | cut -f1)"
echo "📦 Upload this file to AWS Amplify Console"
echo ""
echo "Note: Make sure the zip is under 1,000 files total"
