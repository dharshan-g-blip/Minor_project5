import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images = [], title = 'Product' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList = Array.isArray(images) && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200/80 dark:border-gray-800 shadow-sm flex items-center justify-center group">
        <img
          src={imageList[currentIndex]}
          alt={`${title} - View ${currentIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />

        {/* Prev / Next controls */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-800 dark:text-gray-200 shadow hover:bg-white dark:hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-800 dark:text-gray-200 shadow hover:bg-white dark:hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                currentIndex === idx
                  ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
