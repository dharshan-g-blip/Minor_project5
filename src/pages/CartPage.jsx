import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalQuantity,
  clearCart,
} from '../store/slices/cartSlice';
import { showToast } from '../store/slices/toastSlice';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import CheckoutModal from '../components/cart/CheckoutModal';
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      dispatch(clearCart());
      dispatch(showToast({ message: 'Cart cleared.', type: 'info' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You have <span className="font-bold text-gray-900 dark:text-white">{totalQuantity}</span> {totalQuantity === 1 ? 'item' : 'items'} in your cart.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Entire Cart</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-24 px-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl max-w-xl mx-auto space-y-5">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Explore our curated catalog to find something you'll love!
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <OrderSummary onProceedCheckout={() => setIsCheckoutOpen(true)} />
            </div>

          </div>
        )}

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
