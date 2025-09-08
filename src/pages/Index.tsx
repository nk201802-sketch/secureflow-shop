import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { Search, Shield, Truck, HeadphonesIcon, Award, Users } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  price: number;
  currency: string;
  brand: string;
  images: string[];
  rating: number;
  reviews_count: number;
  features: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false })
          .limit(8);

        if (productsError) throw productsError;

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;

        setProducts(productsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Professional CCTV & Security Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Secure your premises with our high-quality surveillance systems. Trusted by businesses across Pakistan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search cameras, DVR, NVR..." 
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            <Button size="lg" className="px-8">
              Search Products
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              1-5 Year Warranty
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Truck className="h-4 w-4 mr-2" />
              Free Delivery
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              24/7 Support
            </Badge>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/shop">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All products come with manufacturer warranty and quality assurance from trusted brands.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Expert Support</h3>
              <p className="text-muted-foreground">
                Our technical team provides installation guidance and ongoing support for all systems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick delivery across Pakistan with secure packaging and tracking available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8" />
                <span className="text-xl font-bold">CCTV Security Store</span>
              </div>
              <p className="text-primary-foreground/80">
                Your trusted partner for professional security solutions in Pakistan.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/shop" className="hover:text-primary-foreground">Shop</Link></li>
                <li><Link to="/about" className="hover:text-primary-foreground">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary-foreground">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-primary-foreground">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link to={`/shop?category=${category.slug}`} className="hover:text-primary-foreground">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📞 +92-300-1234567</p>
                <p>📧 info@cctvstore.pk</p>
                <p>📍 Lahore, Pakistan</p>
                <p>💬 WhatsApp Support</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 CCTV Security Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
