#!/bin/bash

# Setup Vercel environment variables for Nirvana Homes
echo "🚀 Setting up Vercel environment variables..."

VERCEL_TOKEN="${VERCEL_TOKEN:-}"
PROJECT_ID="nauhomes"

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ VERCEL_TOKEN not set"
    echo "Get token from: https://vercel.com/account/tokens"
    echo "Then run: VERCEL_TOKEN=your_token ./setup-vercel.sh"
    exit 1
fi

# Function to add environment variable
add_env_var() {
    local key="$1"
    local value="$2"
    local type="$3"
    
    echo "Adding $key..."
    
    curl -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"key\": \"$key\",
            \"value\": \"$value\",
            \"type\": \"$type\",
            \"target\": [\"production\", \"preview\", \"development\"]
        }" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ $key"
    else
        echo "❌ $key (may already exist)"
    fi
}

# Add all environment variables
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "https://eqrgmyrnrdnnqphncsde.supabase.co" "plain"
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcmdteXJucmRubnFwaG5jc2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NjkzNjAsImV4cCI6MjA1MTI0NTM2MH0.rR7cXK8b1K5FnZTJpYi2nBQkHJGd9K6cPF8vNlM3qEo" "plain"
add_env_var "SUPABASE_SERVICE_ROLE_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcmdteXJucmRubnFwaG5jc2RlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY2OTM2MCwiZXhwIjoyMDUxMjQ1MzYwfQ.bYp9XvF2cHsQ3mLn7ZkR6tVgJ8uE5jK1oP4wN9aI2cX" "secret"
add_env_var "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" "nauhomes" "plain"
add_env_var "CLOUDINARY_API_KEY" "284759361847293" "plain"
add_env_var "CLOUDINARY_API_SECRET" "vX8nK2mP9sF4qL7tY1cR6zE3wB5jH0u" "secret"

echo ""
echo "🎉 Environment variables setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Redeploy project in Vercel dashboard"
echo "2. Setup database using MANUAL_DATABASE_SETUP.md"
echo "3. Test admin panel at https://nauhomes.vercel.app/admin"