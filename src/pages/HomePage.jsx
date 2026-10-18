import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCategories, selectProductStatus } from '../store/slices/productSlice';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanner from '../components/home/PromoBanner';

export default function HomePage() {
  const dispatch = useDispatch();
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
      dispatch(getCategories());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* 1. Hero Landing Page */}
      <HeroBanner />

      {/* 2. Featured Categories Quick Navigation */}
      <FeaturedCategories />

      {/* 3. Featured Products Grid */}
      <FeaturedProducts />

      {/* 4. Promotional Interactive Banner */}
      <PromoBanner />
    </div>
  );
}
