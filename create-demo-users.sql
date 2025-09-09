-- Create Demo Users Script
-- Run this in Supabase SQL Editor after setting up authentication

-- Note: In Supabase, users are typically created through the auth.users table
-- This script creates the profile entries for demo users
-- You'll need to create the actual auth users through the signup form or Supabase dashboard

-- First, let's create some sample user profiles
-- (These will be linked to auth.users when demo accounts are created)

-- Insert sample profiles (you'll need to update user_id with actual auth.uid() values)
-- For now, we'll use placeholder UUIDs that you can update later

INSERT INTO profiles (id, user_id, first_name, last_name, role, phone) VALUES
('profile-admin', '00000000-0000-0000-0000-000000000001', 'Admin', 'User', 'admin', '+1234567890'),
('profile-user', '00000000-0000-0000-0000-000000000002', 'Demo', 'User', 'client', '+1234567891');

-- Insert some sample reviews (update user_id with actual values later)
INSERT INTO reviews (id, product_id, user_id, rating, comment) VALUES
('review-1', 'prod-1', '00000000-0000-0000-0000-000000000002', 5, 'Excellent camera quality! Very clear image and easy to install.'),
('review-2', 'prod-1', '00000000-0000-0000-0000-000000000001', 4, 'Good product, works as expected. Night vision is impressive.'),
('review-3', 'prod-2', '00000000-0000-0000-0000-000000000002', 5, 'Amazing 4K quality! The AI detection feature is very accurate.'),
('review-4', 'prod-3', '00000000-0000-0000-0000-000000000002', 4, 'Great wireless camera, battery life is good. Solar panel works well.'),
('review-5', 'prod-4', '00000000-0000-0000-0000-000000000001', 5, 'Perfect DVR system for my business. Easy to set up and reliable.'),
('review-6', 'prod-6', '00000000-0000-0000-0000-000000000002', 4, 'Smart lock works great. Fingerprint recognition is fast and accurate.');

-- Insert a sample order (update user_id with actual values later)
INSERT INTO orders (
  id, user_id, order_number, items, total_amount, currency, 
  shipping_address, billing_address, status, payment_status, payment_method
) VALUES (
  'order-demo-1', 
  '00000000-0000-0000-0000-000000000002',
  'ORD-2024-001',
  '[
    {
      "id": "prod-1",
      "name": "HD Security Camera Pro",
      "price": 299.99,
      "quantity": 2,
      "total": 599.98
    },
    {
      "id": "prod-6",
      "name": "Smart Door Lock Pro", 
      "price": 399.99,
      "quantity": 1,
      "total": 399.99
    }
  ]'::json,
  999.97,
  'USD',
  '{
    "name": "Demo User",
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }'::json,
  '{
    "name": "Demo User",
    "address": "123 Main Street", 
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }'::json,
  'delivered',
  'paid',
  'credit_card'
);

-- Instructions for creating actual auth users:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" and create:
--    - Email: admin@admin.com, Password: admin123
--    - Email: user@user.com, Password: user123
-- 3. Copy the user IDs and update the user_id fields in profiles, reviews, and orders tables
-- 4. Or use the signup form in the application to create these accounts

-- Alternative: Use Supabase Auth API to create users programmatically
-- (This would need to be done from your application or a separate script)