# SecureFlow Shop - Setup Instructions

## Supabase Database Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key

### 2. Update Environment Variables
Update the `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

### 3. Create Database Tables
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase-dummy-data.sql` to create tables and insert dummy data

### 4. Enable Authentication
1. In Supabase dashboard, go to Authentication > Settings
2. Enable email authentication
3. Optionally disable email confirmation for testing

### 5. Set up Row Level Security (RLS)
Run these policies in SQL Editor:

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_methods ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories, products, and shipping methods
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on shipping_methods" ON shipping_methods FOR SELECT USING (true);

-- Allow users to read their own profiles
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to manage their own reviews
CREATE POLICY "Users can read all reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Allow users to manage their own orders
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);
```

## Demo Accounts

The application includes demo account placeholders:

- **Admin Account**: admin@admin.com / admin123
- **User Account**: user@user.com / user123

**Note**: You need to create these accounts manually through the signup form or Supabase Auth dashboard.

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Features Included

- ✅ User Authentication (Sign up/Sign in/Sign out)
- ✅ Product Catalog with Categories
- ✅ Shopping Cart functionality
- ✅ User Profiles
- ✅ Product Reviews
- ✅ Order Management
- ✅ Responsive Design with Tailwind CSS
- ✅ Modern UI with shadcn/ui components

## Troubleshooting

### Login Issues
1. Check if Supabase URL and keys are correct in `.env`
2. Verify email confirmation is disabled in Supabase Auth settings
3. Check browser console for any errors

### Database Issues
1. Ensure all tables are created properly
2. Check RLS policies are applied
3. Verify dummy data is inserted

### Build Issues
1. Run `npm run lint` to check for code issues
2. Ensure all dependencies are installed
3. Check TypeScript errors in the console