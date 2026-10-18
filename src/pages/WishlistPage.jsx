import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWishlistItems,
  selectWishlistCount,
  removeFromWishlist,
  clearWishlist,
} from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/toastSlice';
import RatingStars from '../components/common/RatingStars';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from 'lucide-react';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = useSelector(selectWishlistCount);

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product.id));
    dispatch(
      showToast({
        message: `Moved "${product.title}" to cart!`,
        type: 'success',
      })
    );
  };

  const handleRemove = (product) => {
    dispatch(removeFromWishlist(product.id));
    dispatch(
      showToast({
        message: `Removed "${product.title}" from wishlist.`,
        type: 'info',
      })
    );
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all items from your wishlist?')) {
      dispatch(clearWishlist());
      dispatch(showToast({ message: 'Wishlist cleared.', type: 'info' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You have <span className="font-bold text-gray-900 dark:text-white">{wishlistCount}</span> {wishlistCount === 1 ? 'saved item' : 'saved items'}.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-24 px-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl max-w-xl mx-auto space-y-5">
            <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your wishlist is empty
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Save items you want to keep an eye on by clicking the heart icon on any product card.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Grid of Saved Items */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                  <Link to={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  <button
                    onClick={() => handleRemove(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-500 hover:text-rose-500 shadow transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {product.category}
                  </span>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mt-1 hover:text-indigo-600"
                  >
                    {product.title}
                  </Link>

                  <div className="mt-2 mb-3">
                    <RatingStars rating={product.rating} size={14} />
                  </div>

                  {/* Price & Move to Cart */}
                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                    <span className="text-lg font-black text-gray-950 dark:text-white">
                      ${product.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
