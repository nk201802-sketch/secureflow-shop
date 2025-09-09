import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Star, ZoomIn, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  price: number;
  currency: string | null;
  brand: string | null;
  model: string | null;
  images: string[] | null;
  features: string[] | null;
  parameters: any | null;
  downloads: any | null;
  rating: number | null;
  reviews_count: number | null;
  colors: string[] | null;
  sizes: string[] | null;
  category_id: string | null;
  related_ids: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
};

const useProduct = (slug: string | undefined) => {
  return useQuery<Product | null>({
    enabled: !!slug,
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug!)
        .limit(1)
        .single();
      if (error) throw new Error(error.message);
      return data as Product;
    },
  });
};

const useRelated = (product: Product | null | undefined) => {
  return useQuery({
    enabled: !!product,
    queryKey: ['related', product?.id],
    queryFn: async () => {
      let q = supabase
        .from('products')
        .select('id,name,slug,short_description,price,currency,brand,images,rating,reviews_count,features')
        .neq('id', product!.id)
        .limit(6);

      if (product?.related_ids && product.related_ids.length) {
        q = q.in('id', product.related_ids);
      } else if (product?.category_id) {
        q = q.eq('category_id', product.category_id);
      }

      const { data, error } = await q;
      if (error) throw new Error(error.message);
      return data || [];
    },
  });
};

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useProduct(slug);
  const { data: related = [] } = useRelated(product);

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string>('');
  const [size, setSize] = React.useState<string>('');

  React.useEffect(() => {
    if (product?.seo_title) document.title = product.seo_title;
    if (product?.seo_description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', product.seo_description || '');
    }
  }, [product?.seo_title, product?.seo_description]);

  const formatPrice = (price: number, currency: string | null) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: currency === 'PKR' || !currency ? 'PKR' : 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const whatsappHref = (p: Product) => {
    const msg = encodeURIComponent(`Assalam o Alaikum! Mujhe product ke bare me maloomat chahiye:\n\n${p.name} - ${formatPrice(p.price, p.currency)}\nLink: ${window.location.origin}/product/${p.slug}`);
    return `https://wa.me/?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        )}

        {error && (
          <div className="text-destructive">Product load nahi ho saka: {(error as Error).message}</div>
        )}

        {!isLoading && !error && product && (
          <>
            {/* Section 1: Quick Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery Left */}
              <div>
                <Card>
                  <CardContent className="p-0 relative">
                    <img
                      src={(product.images && product.images[0]) || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-80 object-cover rounded-lg"
                      onClick={() => setPreviewUrl((product.images && product.images[0]) || '/placeholder.svg')}
                    />
                    <Button variant="secondary" size="icon" className="absolute bottom-3 right-3" onClick={() => setPreviewUrl((product.images && product.images[0]) || '/placeholder.svg')}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                {product.images && product.images.length > 1 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {product.images.slice(0, 5).map((src, i) => (
                      <button key={i} className="border rounded overflow-hidden" onClick={() => setPreviewUrl(src)}>
                        <img src={src} alt={`thumb-${i}`} className="h-16 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Right */}
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{product.brand || 'Brand'}</Badge>
                  <div className="text-sm text-muted-foreground">Model: {product.model || '-'}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">{product.rating || 4.5}</span>
                    <span className="ml-2">({product.reviews_count || 0} reviews)</span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-primary mb-4">
                  {formatPrice(product.price, product.currency)}
                </div>

                {product.short_description && (
                  <p className="text-muted-foreground mb-4">{product.short_description}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Color</div>
                    <Select value={color} onValueChange={setColor}>
                      <SelectTrigger>
                        <SelectValue placeholder={product.colors && product.colors[0] ? product.colors[0] : 'Select color'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(product.colors || []).map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Size</div>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue placeholder={product.sizes && product.sizes[0] ? product.sizes[0] : 'Select size'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(product.sizes || []).map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button size="lg">Order Now</Button>
                  <a href={whatsappHref(product)} target="_blank" rel="noreferrer">
                    <Button size="lg" variant="outline"><Phone className="h-4 w-4 mr-2" /> WhatsApp</Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Section 2: Tabs */}
            <div className="mt-8">
              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">Long Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="downloads">Downloads</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  {product.long_description ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-muted-foreground">{product.long_description}</p>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">No description available.</div>
                  )}
                </TabsContent>
                <TabsContent value="features">
                  {product.features && product.features.length ? (
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {product.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted-foreground">No features listed.</div>
                  )}
                </TabsContent>
                <TabsContent value="parameters">
                  {product.parameters ? (
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">{JSON.stringify(product.parameters, null, 2)}</pre>
                  ) : (
                    <div className="text-muted-foreground">No parameters provided.</div>
                  )}
                </TabsContent>
                <TabsContent value="downloads">
                  {product.downloads ? (
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">{JSON.stringify(product.downloads, null, 2)}</pre>
                  ) : (
                    <div className="text-muted-foreground">No downloads available.</div>
                  )}
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="text-muted-foreground">Reviews section coming soon.</div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Section 3: Related */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Related Products</h2>
              {related && related.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">No related products found.</div>
              )}
            </div>

            {/* Simple Footer */}
            <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">© {new Date().getFullYear()} CCTV Security Store</footer>

            {/* Sticky mobile CTA */}
            <div className="fixed bottom-3 inset-x-3 sm:hidden">
              <div className="bg-background/95 backdrop-blur border border-border p-2 rounded-lg shadow flex gap-2">
                <Button className="flex-1">Order Now</Button>
                <a href={product ? whatsappHref(product) : '#'} target="_blank" rel="noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full"><Phone className="h-4 w-4 mr-2" /> WhatsApp</Button>
                </a>
              </div>
            </div>

            {/* Zoom dialog */}
            <Dialog open={!!previewUrl} onOpenChange={(open) => !open && setPreviewUrl(null)}>
              <DialogContent className="max-w-3xl">
                {previewUrl && (
                  <img src={previewUrl} alt="preview" className="w-full h-auto object-contain" />
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
