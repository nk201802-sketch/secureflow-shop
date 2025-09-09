import { createClient } from '@supabase/supabase-js';

// Use env if provided, otherwise fall back to project defaults found in src/integrations/supabase/client.ts
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://tgjtvfyswssmouqhrzkk.supabase.co';
// Prefer service role key if provided (bypasses RLS for seeding), otherwise fall back to anon key
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnanR2Znlzd3NzbW91cWhyemtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNjA0OTEsImV4cCI6MjA3MjkzNjQ5MX0.ucs6aKdD1rlX2K-jri7HB8Ey2jMeBOkVtHAwLPUYz68';
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

if (SUPABASE_SERVICE_ROLE_KEY) {
  console.log('Seeding with service role key (RLS bypass)');
} else {
  console.log('Seeding with anon key (requires INSERT policy on public.categories)');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function seed() {
  // Prefer stable slugs that align with product migrations where possible
  const items = [
    { name: 'CCTV Cameras', slug: 'cctv-cameras' },
    { name: 'DVR Systems', slug: 'dvr-systems' },
    { name: 'NVR Systems', slug: 'nvr-systems' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Video Door Phones', slug: 'video-door-phones' },
    { name: 'Biometric Attendance', slug: 'biometric-attendance' },
    { name: 'Alarm Systems', slug: 'alarm-systems' },
    { name: 'Network Switches', slug: 'network-switches' },
    { name: 'Cables & Connectors', slug: 'cables-connectors' },
    { name: 'Power Supplies', slug: 'power-supplies' },
  ];

  const rows = items.map(({ name, slug }) => ({
    name,
    slug: slug || slugify(name),
    description: `Sample description for ${name}.`,
    image_url: null,
  }));

  // Try upsert by slug to avoid duplicates if a unique constraint on slug exists
  let data, error;
  try {
    const res = await supabase
      .from('categories')
      .upsert(rows, { onConflict: 'slug', ignoreDuplicates: false })
      .select();
    data = res.data; error = res.error;
  } catch (e) {
    // Fallback to simple insert if upsert not supported
    const res = await supabase
      .from('categories')
      .insert(rows)
      .select();
    data = res.data; error = res.error;
  }

  if (error) {
    console.error('Failed to insert categories:', error.message);
    if (error.hint) console.error('Hint:', error.hint);
    if (error.details) console.error('Details:', error.details);
    process.exitCode = 1;
    return;
  }

  console.log(`Inserted ${data?.length || 0} categories:`);
  for (const row of data || []) {
    console.log(`- ${row.name} (${row.slug})`);
  }
}

seed().catch((e) => {
  console.error('Unexpected error while seeding categories:', e);
  process.exitCode = 1;
});
