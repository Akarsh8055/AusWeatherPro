#!/bin/bash

echo "🚀 Netlify Deployment Helper"
echo "================================"

# Check if source directories exist
if [ ! -d "client" ]; then
    echo "❌ Missing 'client' directory"
    echo "   This should contain your React frontend code"
fi

if [ ! -d "server" ]; then
    echo "❌ Missing 'server' directory"
    echo "   This should contain your Express backend code"
fi

if [ ! -d "netlify/functions" ]; then
    echo "❌ Missing 'netlify/functions' directory"
    echo "   This should contain your serverless functions"
fi

if [ ! -d "shared" ]; then
    echo "❌ Missing 'shared' directory"
    echo "   This should contain shared types and schemas"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Attempting to build..."
if npm run build; then
    echo "✅ Build successful!"
    echo ""
    echo "🌍 Your app is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Drag and drop the 'dist/public' folder"
    echo "3. Or connect your GitHub repository for automatic deployments"
    echo ""
    echo "Your build output is in: dist/public/"
    ls -la dist/public/ 2>/dev/null || echo "Build directory created but empty"
else
    echo "❌ Build failed!"
    echo ""
    echo "To fix this, you need to:"
    echo "1. Create the missing source directories"
    echo "2. Add your React app code to the 'client' directory"
    echo "3. Add your Express server code to the 'server' directory"
    echo "4. Add Netlify Functions to 'netlify/functions' directory"
    echo ""
    echo "Run this script again after adding your source code."
fi

echo ""
echo "📋 Netlify Configuration Summary:"
echo "   Build command: npm run build"
echo "   Publish directory: dist/public"
echo "   Functions directory: netlify/functions"
echo "   Node version: 20"