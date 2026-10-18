import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
    auth: authReducer,
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
