import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  getCategories,
  selectFilteredProducts,
  selectPaginatedProducts,
  selectTotalPages,
  selectFilters,
  selectProductStatus,
  setSelectedCategory,
  setSelectedSubCategory,
  setSearchQuery,
  setCurrentPage,
  resetFilters,
} from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import SkeletonCard from '../components/common/SkeletonCard';
import {
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  RotateCcw,
} from 'lucide-react';

import { MOCK_CATEGORIES } from '../services/mockData';

export default function ProductListingPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const filteredProducts = useSelector(selectFilteredProducts);
  const paginatedProducts = useSelector(selectPaginatedProducts);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectProductStatus);

  const currentCategoryData =
    MOCK_CATEGORIES.find((c) => c.id === filters.selectedCategory) || MOCK_CATEGORIES[0];

  // Sync URL search parameters if arriving from links like ?category=smartphones&sub=tablets
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subParam = searchParams.get('sub');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      dispatch(setSelectedCategory(categoryParam));
    }
    if (subParam) {
      dispatch(setSelectedSubCategory(subParam));
    }
    if (searchParam) {
      dispatch(setSearchQuery(searchParam));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
      dispatch(getCategories());
    }
  }, [dispatch, status]);

  // Scroll to top on page change
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Category Poster Banner */}
        <div className="relative mb-8 rounded-3xl overflow-hidden h-52 sm:h-64 shadow-xl border border-gray-200/80 dark:border-gray-800 flex items-end p-6 sm:p-10 group">
          <img
            src={currentCategoryData.poster}
            alt={currentCategoryData.name}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-black/30" />
          
          <div className="relative z-10 max-w-2xl text-white space-y-1.5">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
              {currentCategoryData.tag}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {currentCategoryData.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl leading-relaxed">
              {currentCategoryData.description}
            </p>
          </div>
        </div>

        {/* Search, Filter & Sort Bar */}
        <ProductFilters totalResults={filteredProducts.length} />

        {/* Loading Skeletons */}
        {status === 'loading' && filteredProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="text-center py-20 px-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center mx-auto">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No matching products found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              We couldn't find any products matching your current search or filter combination.
            </p>
            <button
              onClick={() => dispatch(resetFilters())}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(filters.currentPage - 1)}
                  disabled={filters.currentPage === 1}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  const isActive = filters.currentPage === pageNum;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                          : 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(filters.currentPage + 1)}
                  disabled={filters.currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
