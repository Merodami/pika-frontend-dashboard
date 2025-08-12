#!/bin/bash

# Script to test Vercel build locally
# This simulates what Vercel does during deployment

echo "🚀 Starting Vercel build simulation..."
echo "================================"

# Clean previous builds
echo "📦 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules
rm -rf .vercel

# Install production dependencies only (like Vercel does)
echo "📦 Installing production dependencies..."
NODE_ENV=production npm ci --omit=dev

# Run the build
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix the errors above before deploying to Vercel."
    exit 1
fi

# Check for the specific file that Vercel looks for in route groups
echo "🔍 Checking for Vercel-specific build artifacts..."
if [ -f ".next/server/app/[locale]/(dashboard)/page_client-reference-manifest.js" ]; then
    echo "✅ Client reference manifest found for dashboard route group"
else
    echo "⚠️  Warning: Client reference manifest NOT found for dashboard route group"
    echo "   This may cause deployment issues on Vercel"
    
    # List what files ARE present
    echo "   Files in .next/server/app/[locale]/(dashboard)/:"
    ls -la ".next/server/app/[locale]/(dashboard)/" 2>/dev/null || echo "   Directory not found"
fi

# Try to run Vercel's actual build command if available
if command -v vercel &> /dev/null; then
    echo "🔨 Running Vercel CLI build..."
    vercel build --prod
    if [ $? -eq 0 ]; then
        echo "✅ Vercel CLI build successful!"
    else
        echo "❌ Vercel CLI build failed!"
        exit 1
    fi
else
    echo "ℹ️  Vercel CLI not installed. Install it with: npm i -g vercel"
    echo "   Without Vercel CLI, we can't fully simulate the deployment environment"
fi

echo "✅ Local build successful, but check warnings above for potential Vercel issues"