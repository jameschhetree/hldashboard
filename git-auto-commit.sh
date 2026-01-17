#!/bin/bash

# Automated git commit and push script
# This script commits all changes and pushes to GitHub

echo "🔄 Auto-committing changes..."

# Add all changes
git add .

# Get list of changed files
CHANGED_FILES=$(git diff --cached --name-only)

if [ -z "$CHANGED_FILES" ]; then
    echo "✅ No changes to commit"
    exit 0
fi

# Create commit message with list of changed files
COMMIT_MSG="Auto-commit: Update project files

Changed files:
$(echo "$CHANGED_FILES" | head -10 | sed 's/^/  - /')
$([ $(echo "$CHANGED_FILES" | wc -l) -gt 10 ] && echo "  ... and more")

$(date '+%Y-%m-%d %H:%M:%S')"

# Commit changes
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "⚠️  Push failed - you may need to authenticate"
    echo "   Run: git push origin main"
fi
