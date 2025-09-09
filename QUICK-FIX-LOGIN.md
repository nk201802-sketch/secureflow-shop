# Quick Login Fix Guide

## "Invalid login credentials" Error Fix

### Step 1: Demo Users Create Karein

**Sabse Aasan Tarika:**
1. Application run karein: `npm run dev`
2. http://localhost:5173 pe jayein
3. "Sign In" button click karein
4. "Sign Up" tab pe switch karein
5. Ye form fill karein:

```
First Name: Admin
Last Name: User
Email: admin@admin.com
Password: admin123
```

6. "Create Account" click karein
7. Success message ke baad "Sign In" tab pe jayein
8. Login try karein

### Step 2: Supabase Settings Check Karein

1. Supabase Dashboard > Authentication > Settings
2. **"Enable email confirmations" ko UNCHECK karein**
3. Save karein

### Step 3: Manual User Creation (Alternative)

Agar signup working nahi hai:

1. Supabase Dashboard > Authentication > Users
2. "Add User" click karein
3. Details fill karein:
   - Email: admin@admin.com
   - Password: admin123
   - Email Confirm: ✅ (check kar dein)
4. "Create User" click karein

### Step 4: Connection Test

Browser console mein (F12):
```javascript
// Test Supabase connection
fetch('https://tgjtvfyswssmouqhrzkk.supabase.co/rest/v1/categories?select=count', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnanR2Znlzd3NzbW91cWhyemtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNjA0OTEsImV4cCI6MjA3MjkzNjQ5MX0.ucs6aKdD1rlX2K-jri7HB8Ey2jMeBOkVtHAwLPUYz68'
  }
}).then(r => r.json()).then(console.log);
```

## Common Issues & Solutions

### Issue: "User already registered"
**Solution:** Sign In tab use karein, signup nahi

### Issue: "Email not confirmed" 
**Solution:** 
- Supabase Settings mein email confirmation disable karein
- Ya user ko manually confirm karein dashboard se

### Issue: Application load nahi ho raha
**Solution:**
```bash
npm install
npm run dev
```

### Issue: Database connection error
**Solution:**
- .env file check karein
- Supabase project active hai ya nahi verify karein

## Success Indicators

✅ **Login Successful Hone Par:**
- Homepage pe redirect ho jayega
- Header mein user icon show hoga
- Console mein "Sign in successful" message

✅ **Signup Successful Hone Par:**
- "Account Created Successfully!" toast message
- Automatically Sign In tab pe switch ho jayega
- 2 seconds baad login kar sakte hain

## Emergency Backup Plan

Agar kuch bhi kaam nahi kar raha:

1. **Fresh Supabase Project:**
   - Naya Supabase project banayein
   - .env update karein
   - SQL scripts phir se run karein

2. **Local Development:**
   - Authentication temporarily disable kar sakte hain
   - Direct homepage access kar sakte hain

3. **Contact Support:**
   - Browser console screenshot
   - Supabase dashboard screenshot
   - Error messages copy karein

**Remember:** Sabse pehle signup karein, phir login try karein! 🚀