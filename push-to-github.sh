#!/bin/bash

# Push script with better error handling

echo "📤 Attempting to push to GitHub..."
echo ""

# Try to push with verbose output
GIT_TERMINAL_PROMPT=1 git push -f origin main 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Check: https://github.com/jameschhetree/hldashboard"
elif [ $EXIT_CODE -eq 128 ]; then
    echo ""
    echo "❌ Authentication failed"
    echo ""
    echo "You need to authenticate with GitHub. Options:"
    echo ""
    echo "Option 1: Use Personal Access Token"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Generate new token (classic) with 'repo' scope"
    echo "  3. Copy the token"
    echo "  4. When prompted for password, paste the token"
    echo ""
    echo "Option 2: Use GitHub CLI (if installed)"
    echo "  Run: gh auth login"
    echo ""
    echo "Option 3: Switch to SSH"
    echo "  Run: ./setup-ssh.sh"
else
    echo ""
    echo "❌ Push failed with exit code: $EXIT_CODE"
fi
