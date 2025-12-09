# Quick Setup - Get Started in 5 Minutes

## ⚡ Fast Track Setup

### Step 1: Install Firebase SDK (1 minute)
```bash
cd coopvest_africa_website
npm install firebase
```

### Step 2: Verify Configuration (1 minute)
```bash
# Check .env file has all credentials
cat .env | grep VITE_FIREBASE

# Should show 7 variables
```

### Step 3: Start Development Server (1 minute)
```bash
npm run dev
```

### Step 4: Test in Browser (1 minute)
1. Open http://localhost:5173
2. Open DevTools (F12)
3. Check Console tab
4. Should see no Firebase errors

### Step 5: Create Test User (1 minute)
1. Go to https://console.firebase.google.com
2. Select project: `coopvest-africa-46a86`
3. Go to Authentication → Users
4. Click "Add user"
5. Email: `test@coopvest.com`
6. Password: `Test123!@#`
7. Click "Add user"

---

## ✅ Verification Checklist

- [ ] Firebase SDK installed: `npm list firebase`
- [ ] `.env` file exists with 7 variables
- [ ] Dev server running: `npm run dev`
- [ ] No console errors in browser
- [ ] Test user created in Firebase Console
- [ ] Can see user in Firebase Console

---

## 🚀 You're Ready!

Your Firebase authentication is now ready to use. The following are already configured:

✅ Firebase initialization
✅ Auth context provider
✅ Protected routes
✅ API client with token injection
✅ User service

---

## 📝 What's Next?

1. **Create Login Page** - Use `useAuth()` hook
2. **Create Signup Page** - Use `useAuthForm()` hook
3. **Create Profile Page** - Use `userService`
4. **Test Authentication Flow** - Login/logout
5. **Deploy to Production** - Build and deploy

---

## 💡 Quick Code Examples

### Use Auth in Component
```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Make API Call
```typescript
import { api } from '@/config/axios';

// Token automatically included!
const profile = await api.get('/auth/profile');
```

### Protect Routes
```typescript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

---

## 🔗 Important Links

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Your Project](https://console.firebase.google.com/project/coopvest-africa-46a86)

---

## ⚠️ Important

**DO NOT COMMIT `.env` FILE**

The `.env` file contains sensitive credentials. It's already in `.gitignore`, so it won't be committed. Keep it safe!

---

**Status:** ✅ Ready to Use
**Time to Setup:** ~5 minutes
**Next Step:** Create login page
