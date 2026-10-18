import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../store/slices/productSlice';
import { MOCK_CATEGORIES } from '../../services/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Exclude 'all' to show dedicated category visual posters
  const displayCategories = MOCK_CATEGORIES.filter((c) => c.id !== 'all');

  const handleCategoryClick = (catId) => {
    dispatch(setSelectedCategory(catId));
    navigate(`/products?category=${catId}`);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Lookbook</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Explore Collections by Category
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Curated luxury and performance essentials across 8 exclusive lifestyle departments.
            </p>
          </div>

          <button
            onClick={() => {
              dispatch(setSelectedCategory('all'));
              navigate('/products');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Category Posters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-indigo-500/15 border border-gray-200/80 dark:border-gray-800 transition-all duration-500 flex flex-col justify-between p-6"
            >
              {/* Background Poster Image */}
              <img
                src={cat.poster}
                alt={`${cat.name} Poster`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Scrim Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-black/25 group-hover:via-gray-950/40 transition-colors duration-500" />

              {/* Top Tag / Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm">
                  {cat.tag}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-10 space-y-2 text-white">
                <h3 className="text-xl font-black tracking-tight leading-snug group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
