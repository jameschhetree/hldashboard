#!/bin/bash

# Simple script to push to GitHub
# Run this after making changes, or let the auto-commit hook handle it

echo "📤 Pushing to GitHub..."

git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed!"
else
    echo "❌ Push failed"
    echo ""
    echo "You may need to authenticate. Options:"
    echo "1. Use SSH: git remote set-url origin git@github.com:jameschhetree/hldashboard.git"
    echo "2. Use personal access token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
fi
