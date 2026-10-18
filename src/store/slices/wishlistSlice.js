import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'luxestore_wishlist_v1';

const loadWishlistFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse wishlist from storage:', e);
  }
  return [];
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save wishlist to storage:', e);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      saveToLocalStorage(state.items);
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.some((i) => i.id === product.id)) {
        state.items.push(product);
        saveToLocalStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id);

export default wishlistSlice.reducer;
