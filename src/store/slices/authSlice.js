import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'luxestore_auth_v1';

const loadUserFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse user from storage:', e);
  }
  return null;
};

const savedUser = loadUserFromStorage();

const initialState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, name = 'Alex Morgan' } = action.payload;
      const user = {
        name,
        email,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
        memberSince: '2026',
      };
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error(e);
      }
    },
    register: (state, action) => {
      const { email, name } = action.payload;
      const user = {
        name: name || 'Valued Customer',
        email,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
        memberSince: '2026',
      };
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error(e);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
