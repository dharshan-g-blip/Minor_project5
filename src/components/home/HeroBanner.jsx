import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white dark:from-indigo-950/20 dark:via-gray-950 dark:to-gray-950 pt-8 pb-16 lg:pt-16 lg:pb-24 transition-colors">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spring 2026 Collection Dropped</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 dark:text-white tracking-tight leading-[1.15]">
              Experience Modern <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
                E-Commerce Excellence
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover verified premium electronics, flagship smartphones, designer fragrances, and minimalist home aesthetics with lightning-fast Redux state-powered shopping.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?category=smartphones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 shadow-sm transition-all"
              >
                <span>Explore Tech</span>
              </Link>
            </div>

            {/* Quick Stats Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200/60 dark:border-gray-800/60 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">100+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Curated Items</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9★</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Customer Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">&lt; 24h</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fast Dispatch</p>
              </div>
            </div>

          </div>

          {/* Right Column - Hero Visual Card & Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 dark:border-gray-800 aspect-[4/5] bg-gray-100 dark:bg-gray-900 group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                  alt="Featured High Fidelity Audio"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-600/90 backdrop-blur-md mb-2">
                    Editor's Pick
                  </span>
                  <h3 className="text-xl font-bold">Sony WH-1000XM5 Studio</h3>
                  <p className="text-sm text-gray-300 mt-1 flex items-center justify-between">
                    <span>Active Noise Cancellation</span>
                    <span className="font-extrabold text-white text-base">$398</span>
                  </p>
                </div>
              </div>

              {/* Floating Top Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Top Rated</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">4.9 / 5.0 (610+ Reviews)</p>
                </div>
              </div>

              {/* Floating Bottom Promo Pill */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Promo Coupon</p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">SUPER20 for 20% Off</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
