#!/bin/bash

# Production Deployment Script for Nirvana Homes Website
# This script helps deploy the database-enabled version

echo "🚀 Deploying Nirvana Homes to Production..."

# Check if environment variables are set
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with Supabase and Cloudinary credentials"
    echo "See SETUP_GUIDE.md for details"
    exit 1
fi

# Build the project to check for errors
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"

# Check if git repo is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Staging changes..."
    git add .
    
    echo "Enter commit message:"
    read commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="Deploy database integration and cloud storage"
    fi
    
    git commit -m "$commit_msg"
fi

# Push to GitHub (triggers Vercel deployment)
echo "🌐 Pushing to GitHub..."
git push

if [ $? -eq 0 ]; then
    echo "✅ Deployment triggered successfully!"
    echo ""
    echo "📊 Next steps:"
    echo "1. Check Vercel dashboard for deployment status"
    echo "2. Add environment variables in Vercel project settings"
    echo "3. Test admin panel at https://nauhomes.vercel.app/admin"
    echo "4. Verify image uploads and project creation work"
    echo ""
    echo "📖 For troubleshooting, see SETUP_GUIDE.md"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi