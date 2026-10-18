import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartTotalQuantity,
  selectCartTotalAmount,
  selectCartDiscount,
  selectCartShipping,
  selectCartTax,
  selectCartGrandTotal,
  selectCartPromoCode,
  applyPromoCode,
  removePromoCode,
} from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/toastSlice';
import { Tag, ArrowRight, Check, X, Lock } from 'lucide-react';

export default function OrderSummary({ onProceedCheckout }) {
  const dispatch = useDispatch();

  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);
  const discount = useSelector(selectCartDiscount);
  const shipping = useSelector(selectCartShipping);
  const tax = useSelector(selectCartTax);
  const grandTotal = useSelector(selectCartGrandTotal);
  const promoCode = useSelector(selectCartPromoCode);

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = inputCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME10' || code === 'SUPER20' || code === 'SAVE50') {
      dispatch(applyPromoCode(code));
      dispatch(showToast({ message: `Coupon "${code}" applied successfully!`, type: 'success' }));
      setInputCode('');
    } else {
      dispatch(
        showToast({
          message: 'Invalid promo code. Try "WELCOME10", "SUPER20", or "SAVE50".',
          type: 'error',
        })
      );
    }
  };

  const handleRemovePromo = () => {
    dispatch(removePromoCode());
    dispatch(showToast({ message: 'Promo code removed.', type: 'info' }));
  };

  const handleQuickPromo = (code) => {
    dispatch(applyPromoCode(code));
    dispatch(showToast({ message: `Coupon "${code}" applied!`, type: 'success' }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h3>

      {/* Breakdown Rows */}
      <div className="space-y-3.5 text-sm text-gray-600 dark:text-gray-300">
        
        <div className="flex items-center justify-between">
          <span>Items Subtotal ({totalQuantity} items)</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ${totalAmount.toLocaleString()}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>Discount ({promoCode})</span>
            </span>
            <span>-${discount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>Estimated Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase text-xs">
                FREE
              </span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Estimated Sales Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* Free shipping progress indicator */}
        {totalAmount < 50 && totalAmount > 0 && (
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300">
            Add <strong>${(50 - totalAmount).toFixed(2)}</strong> more to qualify for <strong>FREE Delivery</strong>!
          </div>
        )}

      </div>

      {/* Promo Code Input */}
      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        {promoCode ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Promo <strong>{promoCode}</strong> Active</span>
            </span>
            <button
              onClick={handleRemovePromo}
              className="text-gray-400 hover:text-rose-500"
              title="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. SUPER20)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white uppercase placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
            
            {/* Quick Promo Pills */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-gray-400">
              <span>Try:</span>
              <button
                type="button"
                onClick={() => handleQuickPromo('SUPER20')}
                className="font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                SUPER20
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleQuickPromo('WELCOME10')}
                className="font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                WELCOME10
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Grand Total */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-gray-900 dark:text-white">Total Amount</p>
          <p className="text-xs text-gray-400">Including shipping and taxes</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            ${grandTotal.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onProceedCheckout}
        disabled={totalQuantity === 0}
        className="mt-6 w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <Lock className="w-3.5 h-3.5" />
        <span>Guaranteed 100% Safe & Secure Checkout</span>
      </div>

    </div>
  );
}
