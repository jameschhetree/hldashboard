#!/bin/bash

# Install dependencies using local cache to avoid permission issues
echo "Installing dependencies..."

# Use a local npm cache in the project directory
export npm_config_cache="./.npm-cache"

# Install packages
npm install --cache ./.npm-cache

echo ""
echo "✅ Installation complete!"
echo ""
echo "If you still see errors, try:"
echo "  npm install --legacy-peer-deps"
echo ""
echo "Or fix npm permissions with:"
echo "  sudo chown -R \$(whoami) /usr/local/lib/node_modules"
