import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://tgjtvfyswssmouqhrzkk.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

if (SUPABASE_SERVICE_ROLE_KEY) {
  console.log('Seeding products with service role key (RLS bypass)');
} else {
  console.log('Seeding products with anon key (requires INSERT policy on public.products)');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getCategoryIdBySlug(slug) {
  const { data, error } = await supabase.from('categories').select('id').eq('slug', slug).single();
  if (error) {
    console.warn(`Warning: could not resolve category slug '${slug}':`, error.message);
    return null;
  }
  return data?.id || null;
}

function price(n) { return Number(n); }

async function seed() {
  const catSlugs = ['cctv-cameras','dvr-systems','nvr-systems','accessories','network-switches'];
  const catMap = {};
  for (const slug of catSlugs) {
    catMap[slug] = await getCategoryIdBySlug(slug);
  }

  const rows = [
    {
      name: '4MP Bullet CCTV Camera X100', slug: '4mp-bullet-x100', price: price(12999),
      short_description: '4MP resolution, night vision 30m, IP66',
      long_description: 'Professional 4MP bullet camera with PoE and night vision.',
      brand: 'SecuraTech', model: 'X100',
      category_id: catMap['cctv-cameras'],
      images: ['/images/x100-1.jpg'], resolution: '4MP (2560×1440)', fps: '30fps', lens: '3.6mm', ir_range: '30m',
      warranty_months: 12, features: ['IP66','PoE','Night vision'], is_active: true
    },
    {
      name: '8MP Dome Security Camera D200', slug: '8mp-dome-d200', price: price(18999),
      short_description: '8MP Ultra HD, vandal-proof dome',
      long_description: 'Premium 8MP dome with smart detection.',
      brand: 'SecuraTech', model: 'D200',
      category_id: catMap['cctv-cameras'],
      images: ['/images/d200-1.jpg'], resolution: '8MP (3840×2160)', fps: '25fps', lens: '2.8mm', ir_range: '25m',
      warranty_months: 24, features: ['Vandal-proof','Smart detection'], is_active: true
    },
    {
      name: '16 Channel DVR System Pro', slug: '16ch-dvr-pro', price: price(25999),
      short_description: '16 channel recording, H.265',
      long_description: 'Professional 16-channel DVR system.',
      brand: 'RecordMax', model: 'DVR-16PRO',
      category_id: catMap['dvr-systems'],
      images: ['/images/dvr16-1.jpg'], resolution: 'Up to 8MP per channel', fps: '30fps',
      warranty_months: 36, features: ['H.265','Remote access'], is_active: true
    },
    {
      name: '32 Channel NVR Ultra', slug: '32ch-nvr-ultra', price: price(45999),
      short_description: '32 channel IP recording, AI analytics',
      long_description: 'Enterprise-grade 32-channel NVR with AI analytics.',
      brand: 'NetSecure', model: 'NVR-32U',
      category_id: catMap['nvr-systems'],
      images: ['/images/nvr32-1.jpg'], resolution: 'Up to 12MP per channel', fps: '30fps',
      warranty_months: 60, features: ['AI analytics','Cloud backup'], is_active: true
    },
    {
      name: 'CCTV Cable Cat6 305m Roll', slug: 'cat6-cable-305m', price: price(8999),
      short_description: 'Cat6 UTP cable for IP cameras',
      long_description: 'Premium Cat6 UTP cable for CCTV installations.',
      brand: 'CableTech', model: 'CAT6-305',
      category_id: catMap['accessories'],
      images: ['/images/cat6-1.jpg'],
      warranty_months: 12, features: ['Weather resistant','High quality copper'], is_active: true
    },
    {
      name: 'POE Network Switch 8-Port', slug: 'poe-switch-8p', price: price(14999),
      short_description: '8-Port PoE switch for IP cameras',
      long_description: 'Reliable 8-port PoE switch ideal for CCTV networks.',
      brand: 'NetLink', model: 'POE-8P',
      category_id: catMap['network-switches'],
      images: ['/images/poe8p-1.jpg'],
      warranty_months: 24, features: ['PoE','Gigabit'], is_active: true
    },
    {
      name: 'POE Injector 60W', slug: 'poe-injector-60w', price: price(3999),
      short_description: 'Single port 60W PoE injector',
      long_description: 'High power injector for PTZ cameras.',
      brand: 'PowerNet', model: 'PN-60',
      category_id: catMap['accessories'],
      images: ['/images/poeinj-1.jpg'],
      warranty_months: 12, features: ['60W','IEEE 802.3at'], is_active: true
    },
    {
      name: 'PTZ Camera 20x Zoom', slug: 'ptz-20x', price: price(79999),
      short_description: 'PTZ camera with 20x optical zoom',
      long_description: 'Fast PTZ camera with advanced tracking.',
      brand: 'VisionPro', model: 'PTZ-20X',
      category_id: catMap['cctv-cameras'],
      images: ['/images/ptz-20x.jpg'],
      warranty_months: 24, features: ['20x Zoom','Auto tracking'], is_active: true
    }
  ];

  // Try upsert by slug
  let data, error;
  try {
    const res = await supabase.from('products').upsert(rows, { onConflict: 'slug', ignoreDuplicates: false }).select();
    data = res.data; error = res.error;
  } catch (e) {
    const res = await supabase.from('products').insert(rows).select();
    data = res.data; error = res.error;
  }

  if (error) {
    console.error('Failed to insert products:', error.message);
    if (error.details) console.error('Details:', error.details);
    process.exitCode = 1;
    return;
  }

  console.log(`Inserted/updated ${data?.length || 0} products`);
}

seed().catch((e) => { console.error('Unexpected error:', e); process.exitCode = 1; });
