#!/bin/bash

# Coopvest Africa Website - Environment Setup Script
# This script creates a .env file from .env.example with development defaults

set -e

ENV_FILE=".env"
ENV_EXAMPLE=".env.example"

if [ ! -f "$ENV_EXAMPLE" ]; then
    echo "❌ Error: $ENV_EXAMPLE not found!"
    exit 1
fi

if [ -f "$ENV_FILE" ]; then
    echo "⚠️  $ENV_FILE already exists. Skipping creation."
    exit 0
fi

echo "📝 Creating $ENV_FILE from $ENV_EXAMPLE..."

# Copy the example file
cp "$ENV_EXAMPLE" "$ENV_FILE"

# Set development defaults
sed -i 's|your_firebase_api_key_here|AIzaSyDemoKey123456789|g' "$ENV_FILE"
sed -i 's|your_project.firebaseapp.com|coopvest-demo.firebaseapp.com|g' "$ENV_FILE"
sed -i 's|your_project_id|coopvest-demo|g' "$ENV_FILE"
sed -i 's|your_project.appspot.com|coopvest-demo.appspot.com|g' "$ENV_FILE"
sed -i 's|your_messaging_sender_id|123456789|g' "$ENV_FILE"
sed -i 's|your_app_id|1:123456789:web:abcdef123456|g' "$ENV_FILE"
sed -i 's|your_measurement_id|G-DEMO123456|g' "$ENV_FILE"
sed -i 's|your_app_id_here|coopvest-web-app|g' "$ENV_FILE"
sed -i 's|your_jwt_secret_key_here|your-development-jwt-secret-key-change-in-production|g' "$ENV_FILE"
sed -i 's|your_owner_open_id_here|demo-owner-id|g' "$ENV_FILE"
sed -i 's|https://analytics.example.com||g' "$ENV_FILE"
sed -i 's|your_website_id_here||g' "$ENV_FILE"
sed -i 's|https://forge.example.com||g' "$ENV_FILE"
sed -i 's|your_forge_api_key_here||g' "$ENV_FILE"

echo "✅ $ENV_FILE created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update Firebase credentials in $ENV_FILE with your actual Firebase project details"
echo "2. Update OAUTH_SERVER_URL if running on a different port"
echo "3. Update JWT_SECRET with a secure key for production"
echo "4. Run: npm install"
echo "5. Run: npm run dev"
