import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Plus, Minus, Trash2 } from 'lucide-react';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/toastSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(item.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    dispatch(
      showToast({
        message: `Removed "${item.title}" from cart.`,
        type: 'info',
      })
    );
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      
      {/* Product Image & Info */}
      <div className="flex items-center gap-4">
        <Link
          to={`/products/${item.id}`}
          className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200/60 dark:border-gray-700/60 hover:opacity-90 transition-opacity"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover object-center"
          />
        </Link>

        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {item.category}
          </span>
          <Link
            to={`/products/${item.id}`}
            className="block text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1 max-w-xs sm:max-w-md"
          >
            {item.title}
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Price: <strong className="text-gray-900 dark:text-white font-medium">${item.price.toLocaleString()}</strong></span>
            {item.stock && item.stock < 10 && (
              <span className="text-amber-500 font-medium">Only {item.stock} left in stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity & Price Controls */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8 self-end sm:self-center">
        
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
          <button
            onClick={handleDecrease}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-sm text-gray-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={item.stock && item.quantity >= item.stock}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[80px]">
          <p className="text-base font-extrabold text-gray-900 dark:text-white">
            ${subtotal.toLocaleString()}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
          aria-label="Remove item"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}
