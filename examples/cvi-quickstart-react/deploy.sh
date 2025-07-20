#!/bin/bash

# Debt.com Advocate Interface - Quick Deploy Script
echo "🚀 Deploying Debt.com Advocate Interface to debt.agent.chappy.ai"
echo "=================================================="

# Build the application
echo "📦 Building application for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi

# Show deployment options
echo ""
echo "🌐 Deployment Options:"
echo "1. Netlify: Drag & drop the 'dist' folder to netlify.com"
echo "2. Vercel: Run 'cd dist && npx vercel --prod'"
echo "3. Traditional hosting: Upload 'dist' contents to your web root"
echo "4. GitHub Pages: Run 'git subtree push --prefix dist origin gh-pages'"
echo ""
echo "📁 Your built files are ready in: $(pwd)/dist/"
echo "📖 See deployment-guide.md for detailed instructions"
echo ""
echo "🎯 Target domain: debt.agent.chappy.ai"
echo "✅ All files include necessary configuration for your subdomain"

# List built files
echo ""
echo "📋 Built files:"
ls -la dist/

echo ""
echo "🎉 Ready to deploy!"
