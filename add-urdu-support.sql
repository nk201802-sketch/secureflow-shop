-- Add Urdu Support to Existing Tables
-- Run this in Supabase SQL Editor

-- Add Urdu fields to categories table
ALTER TABLE categories 
ADD COLUMN name_urdu TEXT,
ADD COLUMN description_urdu TEXT;

-- Add Urdu fields to products table  
ALTER TABLE products
ADD COLUMN name_urdu TEXT,
ADD COLUMN short_description_urdu TEXT,
ADD COLUMN long_description_urdu TEXT,
ADD COLUMN features_urdu TEXT[];

-- Add Urdu fields to shipping methods
ALTER TABLE shipping_methods
ADD COLUMN name_urdu TEXT;

-- Update categories with Urdu translations
UPDATE categories SET 
  name_urdu = 'سیکیورٹی کیمرے',
  description_urdu = 'گھر اور کاروبار کے لیے اعلیٰ معیار کے سیکیورٹی کیمرے'
WHERE slug = 'security-cameras';

UPDATE categories SET 
  name_urdu = 'ڈی وی آر سسٹم',
  description_urdu = 'نگرانی کے نظام کے لیے ڈیجیٹل ویڈیو ریکارڈر'
WHERE slug = 'dvr-systems';

UPDATE categories SET 
  name_urdu = 'رسائی کنٹرول',
  description_urdu = 'دروازے کے تالے اور رسائی کنٹرول سسٹم'
WHERE slug = 'access-control';

UPDATE categories SET 
  name_urdu = 'الارم سسٹم',
  description_urdu = 'سیکیورٹی الارم اور نگرانی کے نظام'
WHERE slug = 'alarm-systems';

UPDATE categories SET 
  name_urdu = 'آئی پی کیمرے',
  description_urdu = 'جدید خصوصیات کے ساتھ نیٹ ورک آئی پی کیمرے'
WHERE slug = 'ip-cameras';

UPDATE categories SET 
  name_urdu = 'ویڈیو انٹرکام',
  description_urdu = 'ویڈیو ڈور فون اور انٹرکام سسٹم'
WHERE slug = 'video-intercoms';

UPDATE categories SET 
  name_urdu = 'سی سی ٹی وی لوازمات',
  description_urdu = 'کیبلز، ماؤنٹس، اور دیگر سی سی ٹی وی لوازمات'
WHERE slug = 'cctv-accessories';

UPDATE categories SET 
  name_urdu = 'وائرلیس سسٹم',
  description_urdu = 'وائرلیس سیکیورٹی اور نگرانی کے نظام'
WHERE slug = 'wireless-systems';

UPDATE categories SET 
  name_urdu = 'سمارٹ ہوم سیکیورٹی',
  description_urdu = 'آئی او ٹی اور سمارٹ ہوم سیکیورٹی حل'
WHERE slug = 'smart-home-security';

-- Update products with Urdu translations
UPDATE products SET 
  name_urdu = 'ایچ ڈی سیکیورٹی کیمرہ پرو',
  short_description_urdu = 'رات کی بینائی کے ساتھ پیشہ ورانہ ایچ ڈی سیکیورٹی کیمرہ',
  long_description_urdu = 'یہ اعلیٰ تعین کا سیکیورٹی کیمرہ جدید رات کی بینائی کی صلاحیات کے ساتھ کرسٹل صاف 1080p ویڈیو ریکارڈنگ فراہم کرتا ہے۔',
  features_urdu = ARRAY['1080p ایچ ڈی ریکارڈنگ', 'رات کی بینائی', 'حرکت کا پتہ لگانا', 'موسمی مزاحمت', 'موبائل ایپ']
WHERE slug = 'hd-security-camera-pro';

UPDATE products SET 
  name_urdu = '4K الٹرا سیکیورٹی کیمرہ',
  short_description_urdu = 'AI کی شناخت کے ساتھ 4K الٹرا ایچ ڈی کیمرہ',
  long_description_urdu = 'جدید ترین 4K سیکیورٹی کیمرہ جس میں AI سے چلنے والی شخص اور گاڑی کی شناخت، رنگین رات کی بینائی، اور کلاؤڈ اسٹوریج کی مطابقت ہے۔',
  features_urdu = ARRAY['4K الٹرا ایچ ڈی', 'AI شناخت', 'رنگین رات کی بینائی', 'کلاؤڈ اسٹوریج', 'دو طرفہ آڈیو']
WHERE slug = '4k-ultra-security-camera';

-- Update shipping methods with Urdu
UPDATE shipping_methods SET name_urdu = 'معیاری ڈیلیوری' WHERE name = 'Standard Shipping';
UPDATE shipping_methods SET name_urdu = 'تیز ڈیلیوری' WHERE name = 'Express Shipping';
UPDATE shipping_methods SET name_urdu = 'اگلے دن ڈیلیوری' WHERE name = 'Next Day Delivery';
UPDATE shipping_methods SET name_urdu = 'مفت ڈیلیوری (500$ سے زیادہ آرڈر)' WHERE name = 'Free Shipping (Orders $500+)';

-- Create a translations table for UI elements
CREATE TABLE IF NOT EXISTS translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  english TEXT NOT NULL,
  urdu TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common UI translations
INSERT INTO translations (key, english, urdu) VALUES
('welcome', 'Welcome', 'خوش آمدید'),
('login', 'Login', 'لاگ ان'),
('signup', 'Sign Up', 'سائن اپ'),
('logout', 'Logout', 'لاگ آؤٹ'),
('home', 'Home', 'ہوم'),
('shop', 'Shop', 'دکان'),
('cart', 'Cart', 'کارٹ'),
('checkout', 'Checkout', 'چیک آؤٹ'),
('search', 'Search', 'تلاش'),
('categories', 'Categories', 'کیٹگریز'),
('products', 'Products', 'پروڈکٹس'),
('price', 'Price', 'قیمت'),
('add_to_cart', 'Add to Cart', 'کارٹ میں شامل کریں'),
('buy_now', 'Buy Now', 'ابھی خریدیں'),
('contact', 'Contact', 'رابطہ'),
('about', 'About', 'ہمارے بارے میں'),
('reviews', 'Reviews', 'جائزے'),
('rating', 'Rating', 'ریٹنگ'),
('warranty', 'Warranty', 'وارنٹی'),
('delivery', 'Delivery', 'ڈیلیوری'),
('support', 'Support', 'سپورٹ'),
('quality', 'Quality', 'کوالٹی'),
('brand', 'Brand', 'برانڈ'),
('model', 'Model', 'ماڈل'),
('features', 'Features', 'خصوصیات'),
('specifications', 'Specifications', 'تفصیلات'),
('order_now', 'Order Now', 'ابھی آرڈر کریں'),
('free_shipping', 'Free Shipping', 'مفت ڈیلیوری'),
('fast_delivery', 'Fast Delivery', 'تیز ڈیلیوری'),
('secure_payment', 'Secure Payment', 'محفوظ ادائیگی'),
('customer_support', '24/7 Customer Support', '24/7 کسٹمر سپورٹ');

-- Enable RLS on translations table
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to translations
CREATE POLICY "Allow public read access on translations" ON translations FOR SELECT USING (true);-- Add
 Urdu translations for new products
UPDATE products SET 
  name_urdu = 'پیشہ ورانہ آئی پی کیمرہ',
  short_description_urdu = 'PoE اور کلاؤڈ اسٹوریج کے ساتھ اعلیٰ درجے کا آئی پی کیمرہ',
  long_description_urdu = 'پیشہ ورانہ درجے کا آئی پی کیمرہ جس میں پاور اوور ایتھرنیٹ، کلاؤڈ اسٹوریج انٹیگریشن، اور جدید تجزیات شامل ہیں۔',
  features_urdu = ARRAY['4MP ریزولیوشن', 'PoE سپورٹ', 'کلاؤڈ اسٹوریج', 'تجزیات', 'موسمی مزاحمت']
WHERE slug = 'professional-ip-camera';

UPDATE products SET 
  name_urdu = 'PTZ آئی پی کیمرہ',
  short_description_urdu = 'آٹو ٹریکنگ کے ساتھ پین-ٹلٹ-زوم آئی پی کیمرہ',
  long_description_urdu = 'جدید PTZ آئی پی کیمرہ جس میں آٹو ٹریکنگ، پری سیٹ پوزیشنز، اور ریموٹ کنٹرول کی صلاحیات ہیں۔',
  features_urdu = ARRAY['PTZ کنٹرول', 'آٹو ٹریکنگ', 'پری سیٹ پوزیشنز', 'ریموٹ کنٹرول', '20x آپٹیکل زوم']
WHERE slug = 'ptz-ip-camera';

UPDATE products SET 
  name_urdu = 'سمارٹ ویڈیو ڈور بیل',
  short_description_urdu = 'دو طرفہ آڈیو کے ساتھ WiFi ویڈیو ڈور بیل',
  long_description_urdu = 'سمارٹ ویڈیو ڈور بیل جس میں HD ویڈیو، دو طرفہ آڈیو، موشن ڈیٹیکشن، اور سمارٹ فون نوٹیفیکیشن شامل ہے۔',
  features_urdu = ARRAY['HD ویڈیو', 'دو طرفہ آڈیو', 'موشن ڈیٹیکشن', 'WiFi', 'موبائل ایپ']
WHERE slug = 'smart-video-doorbell';

UPDATE products SET 
  name_urdu = 'ملٹی یونٹ انٹرکام سسٹم',
  short_description_urdu = 'اپارٹمنٹس اور دفاتر کے لیے مکمل انٹرکام سسٹم',
  long_description_urdu = 'پیشہ ورانہ ملٹی یونٹ انٹرکام سسٹم جس میں ویڈیو کالنگ، ڈور ریلیز، اور ڈائرکٹری کی خصوصیات ہیں۔',
  features_urdu = ARRAY['50 یونٹس سپورٹ', 'ویڈیو کالنگ', 'ڈور ریلیز', 'ڈائرکٹری', 'وینڈل مزاحم']
WHERE slug = 'multi-unit-intercom';

UPDATE products SET 
  name_urdu = 'پیشہ ورانہ کیبل کٹ',
  short_description_urdu = 'مکمل سی سی ٹی وی کیبل اور کنیکٹر کٹ',
  long_description_urdu = 'سی سی ٹی وی انسٹالیشن اور دیکھ بھال کے لیے پیشہ ورانہ درجے کی کیبلز، کنیکٹرز، اور لوازمات۔',
  features_urdu = ARRAY['100m کیبل', 'BNC کنیکٹرز', 'پاور اڈاپٹرز', 'کیبل ٹیسٹر', 'انسٹالیشن ٹولز']
WHERE slug = 'professional-cable-kit';

UPDATE products SET 
  name_urdu = 'کیمرہ ماؤنٹ اور بریکٹ سیٹ',
  short_description_urdu = 'یونیورسل کیمرہ ماؤنٹنگ بریکٹس اور ہارڈ ویئر',
  long_description_urdu = 'مختلف قسم کے کیمروں کے لیے موزوں بھاری ڈیوٹی ماؤنٹنگ بریکٹس جو ایڈجسٹ ایبل اینگلز اور موسمی مزاحمت کے ساتھ آتے ہیں۔',
  features_urdu = ARRAY['یونیورسل فٹ', 'ایڈجسٹ ایبل اینگل', 'موسمی مزاحمت', 'بھاری ڈیوٹی', 'آسان انسٹالیشن']
WHERE slug = 'camera-mount-bracket-set';

UPDATE products SET 
  name_urdu = 'مکمل وائرلیس کٹ',
  short_description_urdu = '8-کیمرہ وائرلیس نگرانی سسٹم',
  long_description_urdu = 'مکمل وائرلیس نگرانی سسٹم جس میں 8 کیمرے، وائرلیس NVR، اور ریموٹ مانیٹرنگ کے لیے موبائل ایپ شامل ہے۔',
  features_urdu = ARRAY['8 وائرلیس کیمرے', 'وائرلیس NVR', 'موبائل ایپ', 'رات کی بینائی', 'موسمی مزاحمت']
WHERE slug = 'complete-wireless-kit';

UPDATE products SET 
  name_urdu = 'سمارٹ سیکیورٹی ہب',
  short_description_urdu = 'سمارٹ ہوم سیکیورٹی ڈیوائسز کے لیے مرکزی ہب',
  long_description_urdu = 'سمارٹ سیکیورٹی ہب جو AI سے چلنے والی آٹومیشن کے ساتھ مختلف IoT سیکیورٹی ڈیوائسز کو جوڑتا اور منظم کرتا ہے۔',
  features_urdu = ARRAY['IoT انٹیگریشن', 'AI آٹومیشن', 'وائس کنٹرول', 'موبائل ایپ', 'کلاؤڈ بیک اپ']
WHERE slug = 'smart-security-hub';