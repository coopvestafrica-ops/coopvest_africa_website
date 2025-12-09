# Firebase Setup Guide for Coopvest Africa Web App

## 📋 Prerequisites

- Firebase project created (https://console.firebase.google.com)
- Node.js 16+ installed
- npm or yarn package manager

---

## 🚀 Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
1. Visit https://console.firebase.google.com
2. Click "Create a project"
3. Enter project name: `coopvest-africa`
4. Accept terms and create project

### 1.2 Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable these sign-in methods:
   - ✅ Email/Password
   - ✅ Google
   - ✅ Phone (optional)

### 1.3 Create Web App
1. In Firebase Console, click **Project Settings** (gear icon)
2. Go to **Your apps** section
3. Click **Add app** → **Web**
4. Register app as `coopvest-africa-web`
5. Copy the Firebase config (you'll need this)

---

## 🔑 Step 2: Get Firebase Credentials

### 2.1 Copy Firebase Config
After creating the web app, you'll see a config object like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "coopvest-africa.firebaseapp.com",
  projectId: "coopvest-africa",
  storageBucket: "coopvest-africa.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
  measurementId: "G-ABC123DEF"
};
```

---

## 📝 Step 3: Configure Environment Variables

### 3.1 Create .env file
```bash
cd coopvest_africa_website
cp .env.example .env
```

### 3.2 Fill in Firebase credentials
Edit `.env` and add your Firebase config:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=coopvest-africa.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=coopvest-africa
VITE_FIREBASE_STORAGE_BUCKET=coopvest-africa.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123DEF

# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Coopvest Africa
VITE_APP_ENV=development
```

### 3.3 Add to .gitignore
Make sure `.env` is in `.gitignore` (it should be):

```bash
# .gitignore
.env
.env.local
.env.*.local
```

---

## 📦 Step 4: Install Dependencies

### 4.1 Install Firebase SDK
```bash
cd coopvest_africa_website
npm install firebase
```

### 4.2 Verify installation
```bash
npm list firebase
```

---

## ✅ Step 5: Verify Setup

### 5.1 Check Firebase config file
```bash
cat client/src/config/firebase.ts
```

Should show your Firebase initialization code.

### 5.2 Check Auth Context
```bash
cat client/src/context/AuthContext.tsx
```

Should show the authentication context provider.

### 5.3 Test in development
```bash
npm run dev
```

Visit http://localhost:5173 and check browser console for any Firebase errors.

---

## 🔐 Step 6: Configure CORS (Backend)

Your Laravel backend needs to accept requests from your web app.

### 6.1 Update Laravel CORS config
Edit `coopvest_africa_backend/config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:5173',      // Development
    'http://localhost:3000',      // Alternative dev port
    'https://coopvest.com',       // Production
    'https://app.coopvest.com',   // Production app
],

'allowed_methods' => ['*'],

'allowed_headers' => ['*'],

'exposed_headers' => ['Authorization'],

'max_age' => 0,

'supports_credentials' => true,
```

### 6.2 Restart Laravel server
```bash
php artisan serve
```

---

## 🧪 Step 7: Test Authentication Flow

### 7.1 Create test user in Firebase
1. Go to Firebase Console → Authentication
2. Click **Users** tab
3. Click **Add user**
4. Enter test email: `test@coopvest.com`
5. Enter test password: `Test123!@#`
6. Click **Add user**

### 7.2 Test login
1. Start your web app: `npm run dev`
2. Go to login page
3. Enter test credentials
4. Should successfully log in

### 7.3 Check backend sync
1. Open browser DevTools → Network tab
2. Look for POST request to `/api/auth/sync-user`
3. Should return 200 status with user data

---

## 🚀 Step 8: Deploy to Production

### 8.1 Build for production
```bash
npm run build
```

### 8.2 Update Firebase config for production
1. Go to Firebase Console → Project Settings
2. Add production web app if not exists
3. Get production Firebase config
4. Create `.env.production`:

```env
VITE_FIREBASE_API_KEY=your_production_key
VITE_FIREBASE_AUTH_DOMAIN=coopvest-africa.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=coopvest-africa
VITE_FIREBASE_STORAGE_BUCKET=coopvest-africa.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123DEF

VITE_API_URL=https://api.coopvest.com/api
VITE_API_TIMEOUT=10000

VITE_APP_NAME=Coopvest Africa
VITE_APP_ENV=production
```

### 8.3 Deploy to hosting
```bash
# Using Firebase Hosting
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🐛 Troubleshooting

### Issue: "Firebase configuration is missing"
**Solution:** Check that all environment variables are set in `.env`

```bash
# Verify variables are loaded
grep VITE_FIREBASE .env
```

### Issue: "CORS error when calling backend"
**Solution:** Update Laravel CORS config and restart server

```bash
php artisan config:clear
php artisan serve
```

### Issue: "Token verification failed on backend"
**Solution:** Ensure Firebase credentials are properly configured in Laravel

```bash
# Check Laravel Firebase config
cat coopvest_africa_backend/.env | grep FIREBASE
```

### Issue: "Google login not working"
**Solution:** Add authorized domains in Firebase Console

1. Go to Firebase Console → Authentication → Settings
2. Add your domain to "Authorized domains"
3. For development: `localhost:5173`
4. For production: `coopvest.com`

### Issue: "User not syncing to backend"
**Solution:** Check network tab in DevTools

1. Open DevTools → Network tab
2. Look for POST to `/api/auth/sync-user`
3. Check response for errors
4. Verify backend is running and accessible

---

## 📚 File Structure

```
coopvest_africa_website/
├── .env                          # Environment variables (DO NOT COMMIT)
├── .env.example                  # Example env file
├── client/
│   └── src/
│       ├── config/
│       │   ├── firebase.ts       # Firebase initialization
│       │   └── axios.ts          # Axios with auth interceptor
│       ├── context/
│       │   └── AuthContext.tsx   # Auth provider & hooks
│       ├── components/
│       │   └── ProtectedRoute.tsx # Route protection
│       ├── hooks/
│       │   └── useAuthForm.ts    # Auth form hook
│       ├── services/
│       │   └── userService.ts    # User API calls
│       └── App.tsx               # Main app component
└── server/
    └── _core/
        └── index.ts              # Backend server
```

---

## ✨ Next Steps

1. ✅ Firebase configuration complete
2. 📝 Create login/signup pages
3. 🔐 Implement protected routes
4. 👤 Create user profile page
5. 🚀 Deploy to production

---

## 📞 Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com)

---

**Last Updated:** December 9, 2025
**Status:** Ready for Implementation
