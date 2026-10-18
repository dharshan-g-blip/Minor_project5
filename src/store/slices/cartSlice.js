import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'luxestore_cart_v1';

// Helper to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse cart from storage:', e);
  }
  return {
    items: [],
    promoCode: null,
    discountPercentage: 0,
    fixedDiscount: 0,
  };
};

// Calculate all cart totals uniformly
const calculateTotals = (items, promoCode, discountPercentage = 0, fixedDiscount = 0) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (discountPercentage > 0) {
    discount = Math.round((totalAmount * discountPercentage) / 100);
  } else if (fixedDiscount > 0) {
    discount = Math.min(totalAmount, fixedDiscount);
  }

  // Free shipping above $50 or when cart is empty
  const shipping = totalAmount === 0 ? 0 : totalAmount > 50 ? 0 : 9.99;
  const tax = totalAmount === 0 ? 0 : Math.round((totalAmount - discount) * 0.05 * 100) / 100;
  const grandTotal = Math.max(0, Math.round((totalAmount - discount + shipping + tax) * 100) / 100);

  return {
    totalQuantity,
    totalAmount,
    discount,
    shipping,
    tax,
    grandTotal,
  };
};

const savedCart = loadCartFromStorage();
const initialTotals = calculateTotals(
  savedCart.items,
  savedCart.promoCode,
  savedCart.discountPercentage,
  savedCart.fixedDiscount
);

const initialState = {
  items: savedCart.items,
  promoCode: savedCart.promoCode,
  discountPercentage: savedCart.discountPercentage,
  fixedDiscount: savedCart.fixedDiscount,
  ...initialTotals,
};

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: state.items,
        promoCode: state.promoCode,
        discountPercentage: state.discountPercentage,
        fixedDiscount: state.fixedDiscount,
      })
    );
  } catch (e) {
    console.error('Failed to save cart to storage:', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          thumbnail: product.thumbnail,
          category: product.category,
          stock: product.stock,
          quantity: quantity,
        });
      }

      const totals = calculateTotals(
        state.items,
        state.promoCode,
        state.discountPercentage,
        state.fixedDiscount
      );
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const totals = calculateTotals(
        state.items,
        state.promoCode,
        state.discountPercentage,
        state.fixedDiscount
      );
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (!item.stock || item.quantity < item.stock) {
          item.quantity += 1;
        }
      }

      const totals = calculateTotals(
        state.items,
        state.promoCode,
        state.discountPercentage,
        state.fixedDiscount
      );
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }

      const totals = calculateTotals(
        state.items,
        state.promoCode,
        state.discountPercentage,
        state.fixedDiscount
      );
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    updateQuantityDirect: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }

      const totals = calculateTotals(
        state.items,
        state.promoCode,
        state.discountPercentage,
        state.fixedDiscount
      );
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    applyPromoCode: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (code === 'WELCOME10') {
        state.promoCode = code;
        state.discountPercentage = 10;
        state.fixedDiscount = 0;
      } else if (code === 'SUPER20') {
        state.promoCode = code;
        state.discountPercentage = 20;
        state.fixedDiscount = 0;
      } else if (code === 'SAVE50') {
        state.promoCode = code;
        state.discountPercentage = 0;
        state.fixedDiscount = 50;
      } else {
        return; // invalid code handled in component
      }

      const totals = calculateTotals(
        state.items,
        state.promoCode,
        state.discountPercentage,
        state.fixedDiscount
      );
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.discountPercentage = 0;
      state.fixedDiscount = 0;

      const totals = calculateTotals(state.items, null, 0, 0);
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discountPercentage = 0;
      state.fixedDiscount = 0;

      const totals = calculateTotals([], null, 0, 0);
      Object.assign(state, totals);
      saveToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantityDirect,
  applyPromoCode,
  removePromoCode,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartGrandTotal = (state) => state.cart.grandTotal;
export const selectCartPromoCode = (state) => state.cart.promoCode;
export const selectCartDiscountPercentage = (state) => state.cart.discountPercentage;

export default cartSlice.reducer;
