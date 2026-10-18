import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, count = null, size = 16, showScore = true }) {
  const rounded = Math.round(rating * 10) / 10;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating ${rounded} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rating >= starIndex;
          const half = !filled && rating >= starIndex - 0.5;

          return (
            <span key={starIndex} className="relative inline-block">
              {half ? (
                <span className="relative inline-block">
                  <Star size={size} className="text-gray-300 dark:text-gray-600" />
                  <span className="absolute inset-0 overflow-hidden w-[50%]">
                    <Star size={size} className="fill-amber-400 text-amber-400" />
                  </span>
                </span>
              ) : (
                <Star
                  size={size}
                  className={
                    filled
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }
                />
              )}
            </span>
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          {rounded}
        </span>
      )}
      {count !== null && (
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({count})
        </span>
      )}
    </div>
  );
}
