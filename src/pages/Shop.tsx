import React from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const useProducts = (search: string, sort: string) => {
  return useQuery({
    queryKey: ['products', { search, sort }],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('id,name,slug,short_description,price,currency,brand,images,rating,reviews_count,features')
        .eq('is_active', true);

      if (search.trim()) {
        // Simple ILIKE filter on name
        query = query.ilike('name', `%${search}%`);
      }

      switch (sort) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('name', { ascending: true });
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    },
  });
};

const Shop: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('name');
  const { data, isLoading, error } = useProducts(search, sort);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-sm"
          />

          <div className="ml-auto w-44">
            <Select value={sort} onValueChange={(v) => setSort(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-destructive">Failed to load products: {(error as Error).message}</div>
        )}

        {!isLoading && !error && (
          <div>
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">No products found.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
