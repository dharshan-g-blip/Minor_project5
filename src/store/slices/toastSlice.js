import { createSlice } from '@reduxjs/toolkit';

let nextToastId = 1;

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {
    showToast: (state, action) => {
      const { message, type = 'info', duration = 3000 } = action.payload;
      state.toasts.push({
        id: nextToastId++,
        message,
        type, // 'success' | 'info' | 'error' | 'warning'
        duration,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export const selectToasts = (state) => state.toast.toasts;

export default toastSlice.reducer;
