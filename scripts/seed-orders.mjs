import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://tgjtvfyswssmouqhrzkk.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

if (SUPABASE_SERVICE_ROLE_KEY) {
  console.log('Seeding orders with service role key (RLS bypass)');
} else {
  console.log('Seeding orders with anon key (requires INSERT policy on public.orders)');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function price(n) { return Number(n); }

async function seed() {
  const rows = [
    {
      order_number: 'ORD-1001',
      status: 'confirmed',
      total_amount: price(25999),
      currency: 'PKR',
      payment_method: 'cod',
      payment_status: 'paid',
      shipping_address: { name: 'Ali Khan', phone: '0300-0000000', city: 'Karachi', address: 'Street 1' },
      billing_address: { name: 'Ali Khan', phone: '0300-0000000', city: 'Karachi', address: 'Street 1' },
      items: [ { sku: '16ch-dvr-pro', qty: 1, price: 25999 } ],
      notes: 'Deliver in office hours',
      user_id: null,
    },
    {
      order_number: 'ORD-1002',
      status: 'shipped',
      total_amount: price(18999),
      currency: 'PKR',
      payment_method: 'card',
      payment_status: 'paid',
      shipping_address: { name: 'Sara Ahmed', phone: '0311-1111111', city: 'Lahore', address: 'Model Town' },
      billing_address: { name: 'Sara Ahmed', phone: '0311-1111111', city: 'Lahore', address: 'Model Town' },
      items: [ { sku: '8mp-dome-d200', qty: 1, price: 18999 } ],
      notes: null,
      user_id: null,
    },
    {
      order_number: 'ORD-1003',
      status: 'processing',
      total_amount: price(12999 + 3999),
      currency: 'PKR',
      payment_method: 'cod',
      payment_status: 'pending',
      shipping_address: { name: 'Imran', phone: '0322-2222222', city: 'Islamabad', address: 'F-7' },
      billing_address: { name: 'Imran', phone: '0322-2222222', city: 'Islamabad', address: 'F-7' },
      items: [ { sku: '4mp-bullet-x100', qty: 1, price: 12999 }, { sku: 'poe-injector-60w', qty: 1, price: 3999 } ],
      notes: 'Call before delivery',
      user_id: null,
    },
    {
      order_number: 'ORD-1004',
      status: 'delivered',
      total_amount: price(14999),
      currency: 'PKR',
      payment_method: 'card',
      payment_status: 'paid',
      shipping_address: { name: 'Hassan', phone: '0333-3333333', city: 'Multan', address: 'Gulgasht' },
      billing_address: { name: 'Hassan', phone: '0333-3333333', city: 'Multan', address: 'Gulgasht' },
      items: [ { sku: 'poe-switch-8p', qty: 1, price: 14999 } ],
      notes: null,
      user_id: null,
    },
    {
      order_number: 'ORD-1005',
      status: 'pending',
      total_amount: price(8999),
      currency: 'PKR',
      payment_method: 'cod',
      payment_status: 'pending',
      shipping_address: { name: 'Zain', phone: '0344-4444444', city: 'Peshawar', address: 'University Rd' },
      billing_address: { name: 'Zain', phone: '0344-4444444', city: 'Peshawar', address: 'University Rd' },
      items: [ { sku: 'cat6-cable-305m', qty: 1, price: 8999 } ],
      notes: null,
      user_id: null,
    },
  ];

  let data, error;
  try {
    const res = await supabase.from('orders').upsert(rows, { onConflict: 'order_number', ignoreDuplicates: false }).select();
    data = res.data; error = res.error;
  } catch (e) {
    const res = await supabase.from('orders').insert(rows).select();
    data = res.data; error = res.error;
  }

  if (error) {
    console.error('Failed to insert orders:', error.message);
    if (error.details) console.error('Details:', error.details);
    process.exitCode = 1;
    return;
  }

  console.log(`Inserted/updated ${data?.length || 0} orders`);
}

seed().catch((e) => { console.error('Unexpected error:', e); process.exitCode = 1; });
