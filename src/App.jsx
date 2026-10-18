import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectThemeMode } from './store/slices/themeSlice';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';

// Pages
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Helper to scroll to top whenever route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const themeMode = useSelector(selectThemeMode);

  // Sync theme class to document root
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <ScrollToTop />
      
      {/* Persistent App Header Navigation */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Persistent App Footer */}
      <Footer />

      {/* Global Interactive Notification Toasts */}
      <Toast />
    </div>
  );
}
