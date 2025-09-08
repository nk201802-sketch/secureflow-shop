import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: currency === 'PKR' ? 'PKR' : 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <Badge variant="secondary" className="absolute top-2 left-2">
            {product.brand}
          </Badge>
        </div>
        
        <div className="p-4">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.short_description}
          </p>

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm ml-2">
              ({product.reviews_count} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="text-2xl font-bold text-primary mb-4">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;