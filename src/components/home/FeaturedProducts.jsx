import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFeaturedProducts, selectProductStatus } from '../../store/slices/productSlice';
import ProductCard from '../product/ProductCard';
import SkeletonCard from '../common/SkeletonCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const featured = useSelector(selectFeaturedProducts);
  const status = useSelector(selectProductStatus);

  return (
    <section className="py-16 bg-gray-50/60 dark:bg-gray-950 border-y border-gray-200/60 dark:border-gray-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Top-rated selections loved by thousands of discerning buyers.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {status === 'loading' && featured.length === 0
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

      </div>
    </section>
  );
}
