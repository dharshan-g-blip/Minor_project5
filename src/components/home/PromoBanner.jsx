import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Copy } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/slices/toastSlice';
import { applyPromoCode } from '../../store/slices/cartSlice';

export default function PromoBanner() {
  const dispatch = useDispatch();

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SUPER20');
    dispatch(applyPromoCode('SUPER20'));
    dispatch(showToast({ message: 'Promo code "SUPER20" applied to your cart!', type: 'success' }));
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-8 sm:p-12 shadow-2xl">
          
          {/* Background pattern decorations */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Time Exclusive Deal</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Enjoy 20% Off Your Entire Cart
            </h3>

            <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed">
              Upgrade your tech setup or refresh your personal fragrance signature. Apply coupon code at checkout for instant savings.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 font-mono text-sm tracking-wider">
                <span className="font-bold text-amber-300">SUPER20</span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:text-amber-300 transition-colors"
                  title="Click to apply"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-sm shadow hover:bg-indigo-50 transition-colors"
              >
                <span>Shop The Sale</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
