import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm animate-pulse flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="w-full h-52 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4" />
      
      {/* Category & Rating */}
      <div className="flex items-center justify-between mb-2">
        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="w-12 h-4 bg-gray-200 dark:bg-gray-800 rounded-full" />
      </div>

      {/* Title */}
      <div className="w-full h-5 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
      <div className="w-2/3 h-5 bg-gray-200 dark:bg-gray-800 rounded mb-4" />

      {/* Footer (Price & Button) */}
      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="w-24 h-9 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    </div>
  );
}
