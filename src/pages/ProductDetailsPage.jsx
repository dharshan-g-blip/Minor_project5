import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetails,
  selectSelectedProduct,
  selectSelectedProductStatus,
  clearSelectedProduct,
  selectAllProducts,
} from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../store/slices/wishlistSlice';
import { showToast } from '../store/slices/toastSlice';
import ProductGallery from '../components/product/ProductGallery';
import RatingStars from '../components/common/RatingStars';
import ReviewList from '../components/product/ReviewList';
import ProductCard from '../components/product/ProductCard';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectSelectedProductStatus);
  const allProducts = useSelector(selectAllProducts);
  const isInWishlist = useSelector(selectIsInWishlist(Number(id)));

  const [quantity, setQuantity] = useState(1);
  const [prevId, setPrevId] = useState(id);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  if (prevId !== id) {
    setPrevId(id);
    setQuantity(1);
  }

  useEffect(() => {
    dispatch(getProductDetails(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    dispatch(
      showToast({
        message: `Added ${quantity} x "${product.title}" to cart!`,
        type: 'success',
      })
    );
  };

  const handleToggleWishlist = () => {
    if (!product) return;
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

  // Related products from same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (status === 'loading' || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-8">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl" />
          <div className="lg:col-span-6 space-y-4">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to={`/products?category=${product.category}`}
            className="capitalize hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Category & Brand Badges */}
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60">
                {product.category}
              </span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {product.brand}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 dark:text-white tracking-tight leading-tight mb-3">
              {product.title}
            </h1>

            {/* Rating & Stock Status */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <RatingStars rating={product.rating} count={product.ratingCount} size={18} />
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Details */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 mb-6 flex items-baseline gap-4">
              <span className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                    Save {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
                    disabled={quantity >= (product.stock || 20)}
                    className="p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 rounded-2xl border transition-all ${
                    isInWishlist
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-rose-500 hover:border-rose-200'
                  }`}
                  aria-label="Save to Wishlist"
                  title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Value Guarantees Grid */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-3 gap-3 text-center text-xs text-gray-500 dark:text-gray-400">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <Truck className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <span className="font-semibold block text-gray-900 dark:text-white">Free Delivery</span>
                <span>On orders &gt; $50</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <span className="font-semibold block text-gray-900 dark:text-white">Authentic</span>
                <span>100% Guaranteed</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <RotateCcw className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="font-semibold block text-gray-900 dark:text-white">Easy Returns</span>
                <span>30-Day Policy</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Navigation: Specs & Customer Reviews */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Key Specifications & Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>Customer Reviews</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {product.reviews?.length || 0}
              </span>
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="max-w-3xl">
              <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 p-4 text-xs sm:text-sm bg-white dark:bg-gray-900">
                    <span className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">
                      {key}
                    </span>
                    <span className="col-span-2 text-gray-900 dark:text-white">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl">
              <ReviewList reviews={product.reviews} averageRating={product.rating} />
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Similar Items</span>
            </div>
            <h3 className="text-2xl font-black text-gray-950 dark:text-white mb-8">
              You May Also Like
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
