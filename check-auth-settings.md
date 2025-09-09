# Authentication Settings Check Karne Ka Tarika

## Supabase Authentication Settings Verify Karein

### 1. Email Confirmation Disable Karein
1. Supabase Dashboard > Authentication > Settings
2. "Enable email confirmations" ko **UNCHECK** karein
3. "Enable email change confirmations" ko bhi **UNCHECK** karein
4. Save karein

### 2. User Management Settings
1. "Enable manual linking" ko check kar sakte hain
2. "Enable phone confirmations" ko uncheck rakhein
3. "Enable phone change confirmations" ko uncheck rakhein

### 3. Security Settings
1. "Enable captcha protection" ko disable kar sakte hain (testing ke liye)
2. "Enable advanced security features" optional hai

### 4. URL Configuration
1. Site URL: `http://localhost:5173`
2. Redirect URLs: `http://localhost:5173/**`

## Common Issues & Solutions

### Issue 1: "Invalid login credentials"
**Solution:**
- Users create nahi hue hain
- Application se signup karein ya Supabase dashboard se manually add karein

### Issue 2: "Email not confirmed" 
**Solution:**
- Email confirmation disable karein settings mein
- Ya phir user ko manually confirm karein dashboard se

### Issue 3: "User not found"
**Solution:**
- Supabase Authentication > Users check karein
- Email address exactly same hai ya nahi verify karein

### Issue 4: Connection errors
**Solution:**
- .env file mein credentials check karein
- Supabase project active hai ya nahi verify karein
- Network connection check karein

## Quick Test Commands

Browser console mein ye commands try kar sakte hain:

```javascript
// Check if Supabase is connected
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

// Test connection
import { supabase } from './src/integrations/supabase/client';
supabase.from('categories').select('count').then(console.log);

// Check current user
supabase.auth.getUser().then(console.log);
```

## Step-by-Step Login Process

1. **Application Start Karein**
   ```bash
   npm run dev
   ```

2. **Browser Console Open Karein** (F12)

3. **Signup Try Karein** (recommended)
   - New account create karein application se
   - Email confirmation skip ho jayega agar disabled hai

4. **Login Try Karein**
   - Created account se login karein
   - Console mein errors check karein

5. **Verify Success**
   - User dashboard accessible hona chahiye
   - Header mein user menu show hona chahiye