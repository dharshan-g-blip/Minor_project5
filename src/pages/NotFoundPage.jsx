import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-white dark:bg-gray-950 transition-colors">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
