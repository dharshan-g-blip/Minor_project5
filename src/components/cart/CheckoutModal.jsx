import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartGrandTotal, clearCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/toastSlice';
import { X, CheckCircle, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const grandTotal = useSelector(selectCartGrandTotal);

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94107',
    paymentMethod: 'card',
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedOrderNum = 'LX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNum);
    setStep('success');
    dispatch(clearCart());
    dispatch(
      showToast({
        message: `Order #${generatedOrderNum} placed successfully!`,
        type: 'success',
        duration: 5000,
      })
    );
  };

  const handleFinish = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Complete Your Order
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enter your shipping and payment information to finalize purchase.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Shipping info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  1. Shipping Information
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              {/* Payment selector */}
              <div className="pt-2 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Amount Due</p>
                  <p className="text-xl font-extrabold text-gray-900 dark:text-white">
                    ${grandTotal.toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Pay</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Order Confirmed!
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
              Thank you for shopping with LUXESTORE. Your receipt and dispatch details have been sent to{' '}
              <strong>{formData.email}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 text-left space-y-2 max-w-sm mx-auto text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Reference:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-600">2-3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Status:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Paid via {formData.paymentMethod.toUpperCase()}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="mt-4 w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
            >
              Back to Store Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
