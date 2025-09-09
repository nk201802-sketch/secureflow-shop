import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Translation {
  key: string;
  english: string;
  urdu: string;
}

interface LanguageContextType {
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  t: (key: string) => string;
  translations: Translation[];
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Default translations (fallback)
const defaultTranslations: Record<string, { en: string; ur: string }> = {
  welcome: { en: 'Welcome', ur: 'خوش آمدید' },
  login: { en: 'Login', ur: 'لاگ ان' },
  signup: { en: 'Sign Up', ur: 'سائن اپ' },
  logout: { en: 'Logout', ur: 'لاگ آؤٹ' },
  home: { en: 'Home', ur: 'ہوم' },
  shop: { en: 'Shop', ur: 'دکان' },
  cart: { en: 'Cart', ur: 'کارٹ' },
  search: { en: 'Search', ur: 'تلاش' },
  categories: { en: 'Categories', ur: 'کیٹگریز' },
  products: { en: 'Products', ur: 'پروڈکٹس' },
  price: { en: 'Price', ur: 'قیمت' },
  add_to_cart: { en: 'Add to Cart', ur: 'کارٹ میں شامل کریں' },
  buy_now: { en: 'Buy Now', ur: 'ابھی خریدیں' },
  contact: { en: 'Contact', ur: 'رابطہ' },
  about: { en: 'About', ur: 'ہمارے بارے میں' },
  reviews: { en: 'Reviews', ur: 'جائزے' },
  rating: { en: 'Rating', ur: 'ریٹنگ' },
  warranty: { en: 'Warranty', ur: 'وارنٹی' },
  delivery: { en: 'Delivery', ur: 'ڈیلیوری' },
  support: { en: 'Support', ur: 'سپورٹ' },
  quality: { en: 'Quality', ur: 'کوالٹی' },
  brand: { en: 'Brand', ur: 'برانڈ' },
  features: { en: 'Features', ur: 'خصوصیات' },
  order_now: { en: 'Order Now', ur: 'ابھی آرڈر کریں' },
  free_shipping: { en: 'Free Shipping', ur: 'مفت ڈیلیوری' },
  fast_delivery: { en: 'Fast Delivery', ur: 'تیز ڈیلیوری' },
  secure_payment: { en: 'Secure Payment', ur: 'محفوظ ادائیگی' },
  customer_support: { en: '24/7 Customer Support', ur: '24/7 کسٹمر سپورٹ' },
  
  // Auth related
  email: { en: 'Email', ur: 'ای میل' },
  password: { en: 'Password', ur: 'پاس ورڈ' },
  first_name: { en: 'First Name', ur: 'پہلا نام' },
  last_name: { en: 'Last Name', ur: 'آخری نام' },
  sign_in: { en: 'Sign In', ur: 'سائن ان' },
  create_account: { en: 'Create Account', ur: 'اکاؤنٹ بنائیں' },
  
  // Product related
  security_cameras: { en: 'Security Cameras', ur: 'سیکیورٹی کیمرے' },
  dvr_systems: { en: 'DVR Systems', ur: 'ڈی وی آر سسٹم' },
  access_control: { en: 'Access Control', ur: 'رسائی کنٹرول' },
  alarm_systems: { en: 'Alarm Systems', ur: 'الارم سسٹم' },
  
  // Common phrases
  professional_security: { en: 'Professional CCTV & Security Solutions', ur: 'پیشہ ورانہ سی سی ٹی وی اور سیکیورٹی حل' },
  trusted_partner: { en: 'Your trusted partner for professional security solutions', ur: 'پیشہ ورانہ سیکیورٹی حل کے لیے آپ کا قابل اعتماد ساتھی' },
  shop_by_category: { en: 'Shop by Category', ur: 'کیٹگری کے ذریعے خریداری' },
  featured_products: { en: 'Featured Products', ur: 'نمایاں پروڈکٹس' },
  why_choose_us: { en: 'Why Choose Us?', ur: 'ہمیں کیوں منتخب کریں؟' },
  quality_guaranteed: { en: 'Quality Guaranteed', ur: 'کوالٹی کی ضمانت' },
  expert_support: { en: 'Expert Support', ur: 'ماہر سپورٹ' }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ur';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Load translations from database
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*');

      if (error) {
        console.error('Error loading translations:', error);
      } else {
        setTranslations(data || []);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetLanguage = (lang: 'en' | 'ur') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction for Urdu
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
  };

  const t = (key: string): string => {
    // First try to get from database translations
    const dbTranslation = translations.find(t => t.key === key);
    if (dbTranslation) {
      return language === 'ur' ? dbTranslation.urdu : dbTranslation.english;
    }

    // Fallback to default translations
    const defaultTranslation = defaultTranslations[key];
    if (defaultTranslation) {
      return language === 'ur' ? defaultTranslation.ur : defaultTranslation.en;
    }

    // Return key if no translation found
    return key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    translations,
    loading
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};