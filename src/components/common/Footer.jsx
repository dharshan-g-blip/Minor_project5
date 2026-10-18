import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/slices/toastSlice';

export default function Footer() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      dispatch(showToast({ message: 'Please enter a valid email address.', type: 'error' }));
      return;
    }
    dispatch(showToast({ message: 'Thank you for subscribing! Check your inbox for 10% off code: WELCOME10', type: 'success' }));
    setEmail('');
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200/80 dark:border-gray-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Perks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-200/60 dark:border-gray-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Free Delivery</h4>
              <p className="text-xs text-gray-500">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Secure Checkout</h4>
              <p className="text-xs text-gray-500">256-bit SSL encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Easy Returns</h4>
              <p className="text-xs text-gray-500">30-day money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">24/7 Support</h4>
              <p className="text-xs text-gray-500">Dedicated assistance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-gray-900 dark:text-white">
                LUXE<span className="text-indigo-600 dark:text-indigo-400">STORE</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Discover curated luxury lifestyle goods, modern technology, bespoke fragrances, and high-fashion essentials engineered with perfection.
            </p>
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-1 transition-colors"
                >
                  Join
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] text-gray-400 mt-1.5">Use code <strong>WELCOME10</strong> for 10% off your first order.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=smartphones" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Laptops & PCs
                </Link>
              </li>
              <li>
                <Link to="/products?category=fragrances" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Fragrances
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Fashion & Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                  Order Tracking
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Account & Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              My Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cart" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/60 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 LUXESTORE Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-600 dark:hover:text-gray-300">Privacy</span>
            <span>•</span>
            <span className="hover:text-gray-600 dark:hover:text-gray-300">Terms</span>
            <span>•</span>
            <span className="hover:text-gray-600 dark:hover:text-gray-300">Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
