# Environment Configuration Guide

This guide explains how to set up environment variables for the Coopvest Africa website.

## Quick Setup

### Automated Setup (Recommended)

Run the setup script to automatically create a `.env` file with development defaults:

```bash
bash setup-env.sh
```

This will:
1. Copy `.env.example` to `.env`
2. Fill in development defaults for Firebase and OAuth
3. Leave analytics optional (disabled by default)

### Manual Setup

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` and update the following variables with your actual values:

## Required Environment Variables

### Firebase Configuration
- `VITE_FIREBASE_API_KEY` - Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID (for analytics)

### App Configuration
- `VITE_APP_TITLE` - Application title (displayed in browser tab)
- `VITE_APP_LOGO` - Path to app logo (e.g., `/logo.png`)
- `VITE_APP_NAME` - Application name
- `VITE_APP_ENV` - Environment (development/production)

### OAuth Configuration
- `OAUTH_SERVER_URL` - OAuth server URL (default: `http://localhost:3001`)
- `VITE_APP_ID` - Application ID for OAuth
- `JWT_SECRET` - JWT secret key (⚠️ Change this in production!)

### API Configuration
- `VITE_API_URL` - Backend API URL (default: `http://localhost:8000/api`)
- `VITE_API_TIMEOUT` - API request timeout in milliseconds

### Optional Configuration
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint (leave empty to disable)
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID (leave empty to disable)

## Development vs Production

### Development
```env
VITE_APP_ENV=development
NODE_ENV=development
OAUTH_SERVER_URL=http://localhost:3001
VITE_API_URL=http://localhost:8000/api
```

### Production
```env
VITE_APP_ENV=production
NODE_ENV=production
OAUTH_SERVER_URL=https://your-oauth-server.com
VITE_API_URL=https://your-api-server.com/api
JWT_SECRET=<use-a-strong-random-key>
```

## Security Notes

⚠️ **Important:**
- Never commit `.env` files to version control
- `.env` is in `.gitignore` for security
- Always use strong, random values for `JWT_SECRET` in production
- Rotate secrets regularly
- Use environment-specific values for each deployment

## Troubleshooting

### "VITE_APP_LOGO is not defined" warning
- Ensure `VITE_APP_LOGO` is set in `.env`
- Default value: `/logo.png`

### "OAUTH_SERVER_URL is not configured" error
- Ensure `OAUTH_SERVER_URL` is set in `.env`
- Default for development: `http://localhost:3001`

### Analytics not loading
- This is normal if `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` are empty
- Analytics is optional and disabled by default

## Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Go to Project Settings
4. Under "Your apps", click on the web app
5. Copy the configuration values to your `.env` file

## Next Steps

After setting up `.env`:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3002`
