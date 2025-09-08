-- Insert dummy products
INSERT INTO public.products (name, slug, short_description, long_description, price, brand, model, category_id, images, resolution, fps, lens, ir_range, warranty_months, features, seo_title, seo_description, rating, reviews_count, is_active) 
SELECT 
  '4MP Bullet CCTV Camera X100',
  '4mp-bullet-x100',
  '4MP resolution, night vision 30m, weatherproof IP66 rating',
  'Professional grade 4MP bullet camera with advanced night vision technology. Features PoE support, motion detection, and remote viewing capabilities. Perfect for corporate security installations.',
  12999,
  'SecuraTech',
  'X100',
  (SELECT id FROM public.categories WHERE slug = 'cctv-cameras' LIMIT 1),
  ARRAY['/images/x100-1.jpg', '/images/x100-2.jpg'],
  '4MP (2560×1440)',
  '30fps',
  '3.6mm',
  '30m',
  12,
  ARRAY['IP66 weatherproof', 'Motion detection', 'Remote view', 'PoE support', 'Night vision'],
  'Buy 4MP Bullet CCTV Camera X100 Online - Best Price in Pakistan',
  'Shop 4MP Bullet CCTV Camera X100 with 30m night vision, IP66 weatherproof rating and 1 year warranty. Free delivery available.',
  4.5,
  12,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = '4mp-bullet-x100');

INSERT INTO public.products (name, slug, short_description, long_description, price, brand, model, category_id, images, resolution, fps, lens, ir_range, warranty_months, features, seo_title, seo_description, rating, reviews_count, is_active) 
SELECT 
  '8MP Dome Security Camera D200',
  '8mp-dome-d200',
  '8MP Ultra HD, vandal-proof dome design, smart detection',
  'Premium 8MP dome camera with vandal-proof housing and intelligent video analytics. Ideal for indoor and covered outdoor installations. Features smart motion detection and facial recognition.',
  18999,
  'SecuraTech',
  'D200',
  (SELECT id FROM public.categories WHERE slug = 'cctv-cameras' LIMIT 1),
  ARRAY['/images/d200-1.jpg', '/images/d200-2.jpg'],
  '8MP (3840×2160)',
  '25fps',
  '2.8mm',
  '25m',
  24,
  ARRAY['Vandal-proof', 'Smart detection', 'Facial recognition', '8MP Ultra HD', 'Wide angle lens'],
  'Buy 8MP Dome Security Camera D200 - Ultra HD CCTV',
  'Premium 8MP dome security camera with smart detection and vandal-proof design. 2 year warranty and free installation guide.',
  4.8,
  25,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = '8mp-dome-d200');

INSERT INTO public.products (name, slug, short_description, long_description, price, brand, model, category_id, images, resolution, fps, lens, ir_range, warranty_months, features, seo_title, seo_description, rating, reviews_count, is_active) 
SELECT 
  '16 Channel DVR System Pro',
  '16ch-dvr-pro',
  '16 channel recording, H.265 compression, remote access',
  'Professional 16-channel DVR system with advanced H.265 compression technology. Supports up to 16 analog cameras with remote viewing via mobile app and web browser.',
  25999,
  'RecordMax',
  'DVR-16PRO',
  (SELECT id FROM public.categories WHERE slug = 'dvr-systems' LIMIT 1),
  ARRAY['/images/dvr16-1.jpg', '/images/dvr16-2.jpg'],
  'Up to 8MP per channel',
  '30fps per channel',
  'N/A',
  'N/A',
  36,
  ARRAY['16 channel recording', 'H.265 compression', 'Remote access', 'Mobile app', '2TB HDD included'],
  '16 Channel DVR System Pro - Best CCTV Recording Solution',
  'Professional 16 channel DVR with H.265 compression and remote access. Includes 2TB HDD and mobile app. 3 year warranty.',
  4.6,
  18,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = '16ch-dvr-pro');

INSERT INTO public.products (name, slug, short_description, long_description, price, brand, model, category_id, images, resolution, fps, lens, ir_range, warranty_months, features, seo_title, seo_description, rating, reviews_count, is_active) 
SELECT 
  '32 Channel NVR Ultra',
  '32ch-nvr-ultra',
  '32 channel IP recording, cloud backup, AI analytics',
  'Enterprise-grade 32-channel NVR with AI-powered video analytics and cloud backup capabilities. Perfect for large-scale security installations with advanced management features.',
  45999,
  'NetSecure',
  'NVR-32U',
  (SELECT id FROM public.categories WHERE slug = 'nvr-systems' LIMIT 1),
  ARRAY['/images/nvr32-1.jpg', '/images/nvr32-2.jpg'],
  'Up to 12MP per channel',
  '30fps per channel',
  'N/A',
  'N/A',
  60,
  ARRAY['32 channel IP recording', 'AI analytics', 'Cloud backup', 'Enterprise grade', '4TB HDD included'],
  '32 Channel NVR Ultra - Enterprise CCTV Solution',
  'Enterprise 32 channel NVR with AI analytics and cloud backup. Perfect for large installations. 5 year warranty included.',
  4.9,
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = '32ch-nvr-ultra');

INSERT INTO public.products (name, slug, short_description, long_description, price, brand, model, category_id, images, resolution, fps, lens, ir_range, warranty_months, features, seo_title, seo_description, rating, reviews_count, is_active) 
SELECT 
  'CCTV Cable Cat6 305m Roll',
  'cat6-cable-305m',
  'High-quality Cat6 UTP cable for IP cameras, 305m roll',
  'Premium Cat6 UTP cable specifically designed for IP camera installations. 305-meter roll provides excellent signal quality and durability for outdoor and indoor use.',
  8999,
  'CableTech',
  'CAT6-305',
  (SELECT id FROM public.categories WHERE slug = 'accessories' LIMIT 1),
  ARRAY['/images/cat6-1.jpg', '/images/cat6-2.jpg'],
  'N/A',
  'N/A',
  'N/A',
  'N/A',
  12,
  ARRAY['305m roll', 'Cat6 UTP', 'Weather resistant', 'High quality copper', 'RJ45 compatible'],
  'Buy CCTV Cat6 Cable 305m Roll - Best Price for IP Cameras',
  'Premium Cat6 UTP cable for CCTV installations. 305m roll with weather-resistant jacket. Best for IP camera setups.',
  4.4,
  35,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'cat6-cable-305m');