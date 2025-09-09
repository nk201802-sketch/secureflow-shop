# Demo Users Create Karne Ka Tarika

## Method 1: Application Se Signup Karein (Easiest)

1. Application run karein: `npm run dev`
2. Browser mein http://localhost:5173 pe jayein
3. "Sign In" button pe click karein
4. "Sign Up" tab pe switch karein
5. Ye accounts create karein:

**Admin Account:**
- First Name: Admin
- Last Name: User  
- Email: admin@admin.com
- Password: admin123

**Demo User Account:**
- First Name: Demo
- Last Name: User
- Email: user@user.com
- Password: user123

## Method 2: Supabase Dashboard Se Create Karein

1. Supabase dashboard mein jayein
2. Authentication > Users pe click karein
3. "Add User" button pe click karein
4. Manual user add karein:
   - Email: admin@admin.com
   - Password: admin123
   - Email Confirm: true (check kar dein)
   
5. Dusra user bhi same tarike se add karein

## Method 3: SQL Se User Create Karein

Supabase SQL Editor mein ye command run karein:

```sql
-- Insert into auth.users (this creates the authentication record)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated', 
  'admin@admin.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Repeat for user@user.com
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'user@user.com', 
  crypt('user123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

**Note:** Method 3 complex hai, Method 1 use karein (application se signup)

## Verification

Users create karne ke baad:
1. Application mein login try karein
2. admin@admin.com / admin123
3. user@user.com / user123

Agar phir bhi issue ho to:
1. Browser console check karein (F12)
2. Supabase Authentication > Users mein verify karein ke users create hue hain
3. Email confirmation disable hai ya nahi check karein