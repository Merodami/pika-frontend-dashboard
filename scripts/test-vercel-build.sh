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

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Your app should deploy successfully on Vercel."
else
    echo "❌ Build failed! Fix the errors above before deploying to Vercel."
    exit 1
fi