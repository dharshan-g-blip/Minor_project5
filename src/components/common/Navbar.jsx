import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShoppingBag,
  Heart,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

import { selectCartTotalQuantity } from '../../store/slices/cartSlice';
import { selectWishlistCount } from '../../store/slices/wishlistSlice';
import { toggleTheme, selectThemeMode } from '../../store/slices/themeSlice';
import { selectAuthUser, selectIsAuthenticated, logout } from '../../store/slices/authSlice';
import { setSearchQuery, selectFilters } from '../../store/slices/productSlice';
import { showToast } from '../../store/slices/toastSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalCartCount = useSelector(selectCartTotalQuantity);
  const wishlistCount = useSelector(selectWishlistCount);
  const themeMode = useSelector(selectThemeMode);
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { searchQuery } = useSelector(selectFilters);

  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
    navigate('/products');
  };

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ message: 'You have been logged out successfully.', type: 'info' }));
    setIsUserDropdownOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-gray-600 dark:text-gray-300'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-gray-950/85 border-b border-gray-200/80 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white leading-none">
                LUXE<span className="text-indigo-600 dark:text-indigo-400">STORE</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 dark:text-gray-500">
                Premium Retail
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={localSearch}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-full bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    dispatch(setSearchQuery(''));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Shop Catalog
            </NavLink>
            <NavLink to="/products?category=smartphones" className={navLinkClass}>
              Tech
            </NavLink>
            <NavLink to="/products?category=fragrances" className={navLinkClass}>
              Fragrances
            </NavLink>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Toggle Dark / Light Theme"
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {themeMode === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="View Wishlist"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold bg-rose-500 text-white rounded-full flex items-center justify-center animate-scale-in">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="View Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  {totalCartCount > 99 ? '99+' : totalCartCount}
                </span>
              )}
            </Link>

            {/* Auth Dropdown or Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:ring-2 hover:ring-indigo-500/30 transition-all"
                  aria-label="User Account Menu"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-indigo-200 dark:border-indigo-800"
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl py-2 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>My Wishlist ({wishlistCount})</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    >
                      <ShoppingBag className="w-4 h-4 text-indigo-500" />
                      <span>My Cart ({totalCartCount})</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left border-t border-gray-100 dark:border-gray-800 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-sm hover:shadow transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible on small screens) */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-8 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-indigo-500 text-gray-900 dark:text-white placeholder-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            All Products
          </NavLink>
          <NavLink
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                {wishlistCount}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <span>Shopping Cart</span>
            {totalCartCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white">
                {totalCartCount}
              </span>
            )}
          </NavLink>

          {!isAuthenticated && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 text-center font-semibold text-white bg-indigo-600 rounded-xl shadow"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
