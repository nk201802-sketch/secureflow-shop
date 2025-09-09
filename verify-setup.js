// Verification Script for SecureFlow Shop Setup
// Run this with: node verify-setup.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read environment variables
const envPath = '.env';
let supabaseUrl, supabaseKey;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
  const keyMatch = envContent.match(/VITE_SUPABASE_PUBLISHABLE_KEY=(.+)/);
  
  supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
  supabaseKey = keyMatch ? keyMatch[1].trim() : null;
} else {
  console.error('❌ .env file not found!');
  process.exit(1);
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in .env file!');
  process.exit(1);
}

console.log('🔍 Verifying SecureFlow Shop Setup...\n');

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySetup() {
  const results = {
    connection: false,
    tables: {
      categories: false,
      products: false,
      profiles: false,
      reviews: false,
      orders: false,
      shipping_methods: false
    },
    data: {
      categories: 0,
      products: 0,
      reviews: 0,
      shipping_methods: 0
    },
    rls: {
      categories: false,
      products: false,
      profiles: false,
      reviews: false,
      orders: false,
      shipping_methods: false
    }
  };

  try {
    // Test connection
    console.log('1. Testing Supabase connection...');
    const { data, error } = await supabase.from('categories').select('count', { count: 'exact', head: true });
    if (!error) {
      results.connection = true;
      console.log('   ✅ Connection successful');
    } else {
      console.log('   ❌ Connection failed:', error.message);
      return results;
    }

    // Check tables exist and have data
    console.log('\n2. Checking database tables...');
    const tables = ['categories', 'products', 'profiles', 'reviews', 'orders', 'shipping_methods'];
    
    for (const table of tables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (!error) {
          results.tables[table] = true;
          results.data[table] = count || 0;
          console.log(`   ✅ ${table}: ${count || 0} records`);
        } else {
          console.log(`   ❌ ${table}: ${error.message}`);
        }
      } catch (err) {
        console.log(`   ❌ ${table}: Table not found or accessible`);
      }
    }

    // Check sample data
    console.log('\n3. Checking sample data...');
    
    // Categories
    const { data: categoriesData } = await supabase.from('categories').select('*').limit(1);
    if (categoriesData && categoriesData.length > 0) {
      console.log('   ✅ Categories have sample data');
    } else {
      console.log('   ⚠️  No sample categories found');
    }

    // Products
    const { data: productsData } = await supabase.from('products').select('*').limit(1);
    if (productsData && productsData.length > 0) {
      console.log('   ✅ Products have sample data');
    } else {
      console.log('   ⚠️  No sample products found');
    }

    // Shipping methods
    const { data: shippingData } = await supabase.from('shipping_methods').select('*').limit(1);
    if (shippingData && shippingData.length > 0) {
      console.log('   ✅ Shipping methods configured');
    } else {
      console.log('   ⚠️  No shipping methods found');
    }

    console.log('\n4. Setup Summary:');
    console.log('==================');
    console.log(`Database Connection: ${results.connection ? '✅' : '❌'}`);
    console.log(`Categories: ${results.data.categories} records`);
    console.log(`Products: ${results.data.products} records`);
    console.log(`Shipping Methods: ${results.data.shipping_methods} records`);
    console.log(`Reviews: ${results.data.reviews} records`);

    if (results.connection && results.data.categories > 0 && results.data.products > 0) {
      console.log('\n🎉 Setup verification successful!');
      console.log('You can now run: npm run dev');
    } else {
      console.log('\n⚠️  Setup incomplete. Please check:');
      if (!results.connection) console.log('- Supabase connection');
      if (results.data.categories === 0) console.log('- Run supabase-dummy-data.sql');
      if (results.data.products === 0) console.log('- Insert sample products');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Run verification
verifySetup().catch(console.error);