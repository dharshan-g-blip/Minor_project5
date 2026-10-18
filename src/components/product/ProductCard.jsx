import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import { showToast } from '../../store/slices/toastSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(
      showToast({
        message: `Added "${product.title}" to cart!`,
        type: 'success',
      })
    );
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        message: isInWishlist
          ? `Removed "${product.title}" from wishlist.`
          : `Saved "${product.title}" to wishlist!`,
        type: 'info',
      })
    );
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full">
      
      {/* Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800/50">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-[11px] font-bold tracking-wide bg-rose-500 text-white shadow-sm">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
            isInWishlist
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 hover:text-rose-500 dark:hover:text-rose-400'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isInWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link
            to={`/products/${product.id}`}
            className="w-full py-2 px-3 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-xs font-semibold text-gray-900 dark:text-white shadow-lg flex items-center justify-center gap-1.5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Category & Brand */}
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-1.5 uppercase font-medium tracking-wider">
          <span className="truncate max-w-[120px]">{product.category}</span>
          <span className="truncate max-w-[100px] text-gray-500 dark:text-gray-400 font-semibold">{product.brand}</span>
        </div>

        {/* Title */}
        <Link to={`/products/${product.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="mt-2 mb-3">
          <RatingStars rating={product.rating} count={product.ratingCount} size={14} />
        </div>

        {/* Price & Action Button Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-950 dark:text-white leading-tight">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            aria-label="Add to cart"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}
