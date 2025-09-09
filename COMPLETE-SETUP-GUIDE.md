# SecureFlow Shop - Complete Setup Guide (Roman Urdu)

## Step 1: Supabase Project Setup

### 1.1 Supabase Account Banayein
1. [supabase.com](https://supabase.com) pe jayein
2. "Start your project" pe click karein
3. GitHub se sign up karein
4. New project banayein:
   - Project name: `secureflow-shop`
   - Database password: Strong password rakhein
   - Region: Singapore (closest to Pakistan)

### 1.2 Project Credentials Copy Karein
1. Supabase dashboard mein Settings > API pe jayein
2. Ye values copy karein:
   - Project URL
   - Project ID  
   - anon/public key

## Step 2: Environment Variables Update Karein

`.env` file mein apne credentials dalein:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
VITE_SUPABASE_PROJECT_ID=your-project-id
```

## Step 3: Database Tables Banayein

### 3.1 SQL Editor Open Karein
1. Supabase dashboard mein SQL Editor pe jayein
2. New query banayein

### 3.2 Tables Create Karein
`supabase-dummy-data.sql` file ka content copy kar ke SQL Editor mein paste karein aur run karein.

### 3.3 Row Level Security (RLS) Setup Karein
Ye SQL commands run karein:

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_methods ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on shipping_methods" ON shipping_methods FOR SELECT USING (true);

-- User profile policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Review policies
CREATE POLICY "Users can read all reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Order policies
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);
```

## Step 4: Authentication Setup

### 4.1 Email Authentication Enable Karein
1. Authentication > Settings pe jayein
2. "Enable email confirmations" ko **DISABLE** kar dein (testing ke liye)
3. "Enable email change confirmations" ko bhi disable kar dein

### 4.2 Demo Users Banayein
Application run kar ke ye accounts manually create karein:

**Admin Account:**
- Email: admin@admin.com
- Password: admin123
- First Name: Admin
- Last Name: User

**Demo User Account:**
- Email: user@user.com  
- Password: user123
- First Name: Demo
- Last Name: User

## Step 5: Application Run Karein

### 5.1 Dependencies Install Karein
```bash
cd secureflow-shop
npm install
```

### 5.2 Development Server Start Karein
```bash
npm run dev
```

### 5.3 Browser Mein Open Karein
http://localhost:5173 pe jayein

## Step 6: Testing Karein

### 6.1 Login Test Karein
1. "Sign In" button pe click karein
2. Demo credentials use karein:
   - admin@admin.com / admin123
   - user@user.com / user123

### 6.2 Features Test Karein
- ✅ Homepage products load ho rahe hain
- ✅ Categories show ho rahe hain  
- ✅ Login/Logout working hai
- ✅ User dashboard accessible hai
- ✅ Product cards properly display ho rahe hain

## Troubleshooting

### Login Nahi Ho Raha?
1. Browser console check karein (F12 press karein)
2. Supabase credentials verify karein
3. Email confirmation disable hai ya nahi check karein
4. Network tab mein API calls check karein

### Products Load Nahi Ho Rahe?
1. SQL Editor mein `SELECT * FROM products;` run karein
2. RLS policies properly set hain ya nahi check karein
3. Console mein errors check karein

### Database Connection Issues?
1. Supabase project active hai ya nahi check karein
2. API keys correct hain ya nahi verify karein
3. Environment variables properly set hain ya nahi check karein

## Features Available

### ✅ Completed Features:
- User Authentication (Sign up/Sign in/Sign out)
- Product Catalog with Categories
- Responsive Design
- Modern UI with shadcn/ui
- Database Integration
- User Profiles
- Product Reviews System
- Order Management Structure

### 🚧 Features to Implement:
- Shopping Cart Functionality
- Checkout Process
- Payment Integration
- Admin Dashboard
- Inventory Management
- Order Tracking

## Next Steps

1. **Shopping Cart**: Add cart functionality
2. **Product Details**: Create individual product pages
3. **Admin Panel**: Build admin dashboard
4. **Payment**: Integrate payment gateway
5. **Deployment**: Deploy to Vercel/Netlify

## Support

Agar koi issue ho to:
1. Console errors check karein
2. Supabase logs dekhen
3. Network requests verify karein
4. Database data confirm karein

**Happy Coding! 🚀**