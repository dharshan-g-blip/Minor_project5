import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilters,
  selectCategories,
  setSearchQuery,
  setSelectedCategory,
  setSelectedSubCategory,
  setSortBy,
  resetFilters,
} from '../../store/slices/productSlice';
import { Search, RotateCcw, ArrowUpDown } from 'lucide-react';

export default function ProductFilters({ totalResults = 0 }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const categories = useSelector(selectCategories);

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedCategory !== 'all' ||
    filters.selectedSubCategory !== 'all' ||
    filters.sortBy !== 'default' ||
    filters.priceRange.max < 4000 ||
    filters.minRating > 0;

  const currentCategory = categories.find((c) => c.id === filters.selectedCategory);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 mb-8 shadow-sm transition-colors">
      
      {/* Top Row: Search and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <input
            type="text"
            placeholder="Search by product title, brand, or specs..."
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Category Select */}
        <div className="md:col-span-3">
          <select
            value={filters.selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 capitalize cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Customer Rating (High to Low)</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
            <ArrowUpDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Reset Button */}
        <div className="md:col-span-1 flex justify-end">
          {hasActiveFilters && (
            <button
              onClick={() => dispatch(resetFilters())}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Reset All Filters"
              aria-label="Reset filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Category Chips & Results Counter */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Quick Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
          <span className="text-gray-400 font-medium mr-1 shrink-0">Department:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'smartphones', label: 'Smartphones' },
            { id: 'laptops', label: 'Laptops' },
            { id: 'audio', label: 'Audio' },
            { id: 'watches', label: 'Watches' },
            { id: 'fragrances', label: 'Fragrances' },
            { id: 'skincare', label: 'Skincare' },
            { id: 'home-decoration', label: 'Home Decor' },
            { id: 'fashion', label: 'Fashion' },
          ].map((catItem) => {
            const isActive = filters.selectedCategory === catItem.id;
            return (
              <button
                key={catItem.id}
                onClick={() => dispatch(setSelectedCategory(catItem.id))}
                className={`px-3 py-1.5 rounded-full capitalize whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {catItem.label}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Showing <span className="font-bold text-gray-900 dark:text-white">{totalResults}</span> products
        </div>

      </div>

      {/* Subcategory Pills Row (Visible when department has subcategories) */}
      {currentCategory && currentCategory.subCategories && currentCategory.subCategories.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px] shrink-0">
            Subcategories:
          </span>
          {currentCategory.subCategories.map((sub) => {
            const isSubActive = filters.selectedSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => dispatch(setSelectedSubCategory(sub.id))}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  isSubActive
                    ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800 shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
