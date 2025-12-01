#!/bin/bash
# Netlify Deploy Script for Windows

echo "🚀 WebDev Academy - Netlify Deploy Script"
echo "=========================================="

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "📦 Building project..."
    npm run build
fi

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📥 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "✅ Deployment complete!"
echo "Check your site at: https://app.netlify.com/sites"
