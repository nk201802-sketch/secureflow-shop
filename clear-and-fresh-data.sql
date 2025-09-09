-- Clear existing data and add fresh categories/products
-- Run this in Supabase SQL Editor

-- First, clear existing data (in correct order due to foreign keys)
DELETE FROM reviews;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM shipping_methods;

-- Reset sequences if needed
-- ALTER SEQUENCE categories_id_seq RESTART WITH 1;

-- Now insert fresh categories with our IDs
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('cat-1', 'Security Cameras', 'security-cameras', 'High-quality security cameras for home and business', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'),
('cat-2', 'DVR Systems', 'dvr-systems', 'Digital Video Recorders for surveillance systems', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'),
('cat-3', 'Access Control', 'access-control', 'Door locks and access control systems', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'),
('cat-4', 'Alarm Systems', 'alarm-systems', 'Security alarm and monitoring systems', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'),
('cat-5', 'IP Cameras', 'ip-cameras', 'Network IP cameras with advanced features', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'),
('cat-6', 'Video Intercoms', 'video-intercoms', 'Video door phones and intercom systems', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'),
('cat-7', 'CCTV Accessories', 'cctv-accessories', 'Cables, mounts, and other CCTV accessories', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500'),
('cat-8', 'Wireless Systems', 'wireless-systems', 'Wireless security and surveillance systems', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'),
('cat-9', 'Smart Home Security', 'smart-home-security', 'IoT and smart home security solutions', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500');

-- Insert products (all 15 products)
INSERT INTO products (
  id, name, slug, price, currency, short_description, long_description, 
  brand, model, category_id, images, features, stock, rating, reviews_count,
  resolution, fps, ir_range, lens, power, warranty_months, is_active
) VALUES
-- Security Cameras
('prod-1', 'HD Security Camera Pro', 'hd-security-camera-pro', 299.99, 'USD',
 'Professional HD security camera with night vision',
 'This high-definition security camera offers crystal clear 1080p video recording with advanced night vision capabilities. Perfect for both indoor and outdoor surveillance.',
 'SecureTech', 'ST-HD-PRO-1080', 'cat-1',
 ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'],
 ARRAY['1080p HD Recording', 'Night Vision', 'Motion Detection', 'Weather Resistant', 'Mobile App'],
 50, 4.5, 128, '1920x1080', '30fps', '30m', 'Fixed 3.6mm', '12V DC', 24, true),

('prod-2', '4K Ultra Security Camera', '4k-ultra-security-camera', 599.99, 'USD',
 '4K Ultra HD camera with AI detection',
 'State-of-the-art 4K security camera featuring AI-powered person and vehicle detection, color night vision, and cloud storage compatibility.',
 'UltraVision', 'UV-4K-AI-2024', 'cat-1',
 ARRAY['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500', 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'],
 ARRAY['4K Ultra HD', 'AI Detection', 'Color Night Vision', 'Cloud Storage', 'Two-Way Audio'],
 25, 4.8, 89, '3840x2160', '25fps', '50m', 'Varifocal 2.8-12mm', 'PoE', 36, true),

('prod-3', 'Wireless Security Camera', 'wireless-security-camera', 199.99, 'USD',
 'Easy-to-install wireless security camera',
 'Battery-powered wireless security camera with solar panel compatibility. Easy installation without wiring required.',
 'WireFree', 'WF-SOLAR-CAM', 'cat-1',
 ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
 ARRAY['Wireless', 'Battery Powered', 'Solar Compatible', 'PIR Motion', 'Mobile Alerts'],
 75, 4.2, 156, '1920x1080', '15fps', '10m', 'Fixed 2.8mm', 'Battery/Solar', 12, true),

-- DVR Systems
('prod-4', '8-Channel DVR System', '8-channel-dvr-system', 899.99, 'USD',
 'Complete 8-channel DVR surveillance system',
 'Professional 8-channel DVR system with 2TB storage, remote viewing capabilities, and support for up to 8 cameras.',
 'RecordMax', 'RM-8CH-2TB', 'cat-2',
 ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'],
 ARRAY['8 Channels', '2TB Storage', 'Remote Viewing', 'Motion Recording', 'HDMI Output'],
 15, 4.6, 67, '1080p', '30fps', 'N/A', 'N/A', '12V DC', 24, true),

('prod-5', '16-Channel NVR System', '16-channel-nvr-system', 1299.99, 'USD',
 'Advanced 16-channel NVR with 4K support',
 'High-end Network Video Recorder supporting up to 16 IP cameras with 4K recording capability and 4TB storage.',
 'NetRecord', 'NR-16CH-4TB-4K', 'cat-2',
 ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'],
 ARRAY['16 Channels', '4TB Storage', '4K Support', 'PoE Ports', 'Cloud Backup'],
 8, 4.7, 34, '4K', '30fps', 'N/A', 'N/A', 'AC Power', 36, true),

-- Access Control
('prod-6', 'Smart Door Lock Pro', 'smart-door-lock-pro', 399.99, 'USD',
 'Keyless smart door lock with biometric access',
 'Advanced smart door lock featuring fingerprint recognition, keypad entry, and smartphone app control.',
 'SmartLock', 'SL-BIO-PRO', 'cat-3',
 ARRAY['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'],
 ARRAY['Fingerprint Scanner', 'Keypad Entry', 'App Control', 'Auto Lock', 'Battery Backup'],
 30, 4.4, 92, 'N/A', 'N/A', 'N/A', 'N/A', '4x AA Batteries', 12, true),

-- Alarm Systems
('prod-7', 'Wireless Alarm System', 'wireless-alarm-system', 699.99, 'USD',
 'Complete wireless home security alarm system',
 'Comprehensive wireless alarm system with door/window sensors, motion detectors, and 24/7 monitoring capability.',
 'AlarmTech', 'AT-WIRELESS-HOME', 'cat-4',
 ARRAY['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'],
 ARRAY['Wireless Sensors', 'Motion Detectors', '24/7 Monitoring', 'Mobile Alerts', 'Backup Battery'],
 20, 4.3, 78, 'N/A', 'N/A', 'N/A', 'N/A', 'AC/Battery', 24, true),

-- IP Cameras
('prod-8', 'Professional IP Camera', 'professional-ip-camera', 449.99, 'USD',
 'High-end IP camera with PoE and cloud storage',
 'Professional grade IP camera with Power over Ethernet, cloud storage integration, and advanced analytics.',
 'NetVision', 'NV-IP-PRO-4MP', 'cat-5',
 ARRAY['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'],
 ARRAY['4MP Resolution', 'PoE Support', 'Cloud Storage', 'Analytics', 'Weatherproof'],
 35, 4.6, 112, '2560x1440', '30fps', '40m', 'Varifocal 2.8-12mm', 'PoE', 36, true),

('prod-9', 'PTZ IP Camera', 'ptz-ip-camera', 899.99, 'USD',
 'Pan-Tilt-Zoom IP camera with auto tracking',
 'Advanced PTZ IP camera with auto tracking, preset positions, and remote control capabilities.',
 'PTZMaster', 'PTZ-AUTO-TRACK', 'cat-5',
 ARRAY['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'],
 ARRAY['PTZ Control', 'Auto Tracking', 'Preset Positions', 'Remote Control', '20x Optical Zoom'],
 12, 4.8, 67, '1920x1080', '25fps', '100m', '4.7-94mm', 'PoE+', 24, true),

-- Video Intercoms
('prod-10', 'Smart Video Doorbell', 'smart-video-doorbell', 249.99, 'USD',
 'WiFi video doorbell with two-way audio',
 'Smart video doorbell with HD video, two-way audio, motion detection, and smartphone notifications.',
 'SmartBell', 'SB-WIFI-HD', 'cat-6',
 ARRAY['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'],
 ARRAY['HD Video', 'Two-Way Audio', 'Motion Detection', 'WiFi', 'Mobile App'],
 60, 4.4, 203, '1920x1080', '15fps', '5m', 'Fixed 2.8mm', 'Battery/Wired', 12, true),

('prod-11', 'Multi-Unit Intercom System', 'multi-unit-intercom', 1299.99, 'USD',
 'Complete intercom system for apartments and offices',
 'Professional multi-unit intercom system with video calling, door release, and directory features.',
 'IntercomPro', 'IC-MULTI-50', 'cat-6',
 ARRAY['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'],
 ARRAY['50 Units Support', 'Video Calling', 'Door Release', 'Directory', 'Vandal Resistant'],
 8, 4.7, 34, '800x600', '15fps', 'N/A', 'Fixed 3.6mm', 'AC Power', 36, true),

-- CCTV Accessories
('prod-12', 'Professional Cable Kit', 'professional-cable-kit', 89.99, 'USD',
 'Complete CCTV cable and connector kit',
 'Professional grade cables, connectors, and accessories for CCTV installation and maintenance.',
 'CableMax', 'CM-PRO-KIT-100', 'cat-7',
 ARRAY['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500'],
 ARRAY['100m Cable', 'BNC Connectors', 'Power Adapters', 'Cable Tester', 'Installation Tools'],
 100, 4.2, 156, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 12, true),

('prod-13', 'Camera Mount & Bracket Set', 'camera-mount-bracket-set', 45.99, 'USD',
 'Universal camera mounting brackets and hardware',
 'Heavy-duty mounting brackets suitable for various camera types with adjustable angles and weatherproof design.',
 'MountTech', 'MT-UNIVERSAL-SET', 'cat-7',
 ARRAY['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500'],
 ARRAY['Universal Fit', 'Adjustable Angle', 'Weatherproof', 'Heavy Duty', 'Easy Installation'],
 200, 4.1, 89, 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 6, true),

-- Wireless Systems
('prod-14', 'Complete Wireless Kit', 'complete-wireless-kit', 1599.99, 'USD',
 '8-camera wireless surveillance system',
 'Complete wireless surveillance system with 8 cameras, wireless NVR, and mobile app for remote monitoring.',
 'WirelessPro', 'WP-8CAM-KIT', 'cat-8',
 ARRAY['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'],
 ARRAY['8 Wireless Cameras', 'Wireless NVR', 'Mobile App', 'Night Vision', 'Weather Resistant'],
 15, 4.5, 78, '1920x1080', '25fps', '30m', 'Fixed 3.6mm', 'Battery/Solar', 24, true),

-- Smart Home Security
('prod-15', 'Smart Security Hub', 'smart-security-hub', 399.99, 'USD',
 'Central hub for smart home security devices',
 'Smart security hub that connects and manages various IoT security devices with AI-powered automation.',
 'SmartGuard', 'SG-HUB-AI', 'cat-9',
 ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
 ARRAY['IoT Integration', 'AI Automation', 'Voice Control', 'Mobile App', 'Cloud Backup'],
 40, 4.6, 145, 'N/A', 'N/A', 'N/A', 'N/A', 'AC Power', 24, true);

-- Insert shipping methods
INSERT INTO shipping_methods (id, name, cost, estimated_days, is_active) VALUES
('ship-1', 'Standard Shipping', 9.99, 5, true),
('ship-2', 'Express Shipping', 19.99, 2, true),
('ship-3', 'Next Day Delivery', 39.99, 1, true),
('ship-4', 'Free Shipping (Orders $500+)', 0.00, 7, true);

-- Verify the data
SELECT 'Categories Count' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Products Count' as table_name, COUNT(*) as count FROM products
UNION ALL
SELECT 'Shipping Methods Count' as table_name, COUNT(*) as count FROM shipping_methods;