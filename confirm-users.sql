-- Manual User Confirmation Script
-- Run this in Supabase SQL Editor to confirm existing users

-- Confirm all existing users
UPDATE auth.users 
SET 
  email_confirmed_at = NOW(),
  phone_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Specifically confirm demo users
UPDATE auth.users 
SET 
  email_confirmed_at = NOW(),
  phone_confirmed_at = NOW()
WHERE email IN ('admin@admin.com', 'user@user.com');

-- Check if users are confirmed
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  updated_at
FROM auth.users 
WHERE email IN ('admin@admin.com', 'user@user.com');

-- If no users exist, you can create them manually:
-- (Only run this if users don't exist)

/*
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  phone_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
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
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Admin", "last_name": "User", "role": "admin"}',
  false,
  '',
  '',
  '',
  ''
);

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  phone_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
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
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Demo", "last_name": "User", "role": "client"}',
  false,
  '',
  '',
  '',
  ''
);
*/