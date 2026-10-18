import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'luxestore_theme_v1';

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.error('Failed to read theme preference:', e);
  }
  return 'light';
};

const initialMode = getInitialTheme();
if (typeof document !== 'undefined') {
  if (initialMode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const initialState = {
  mode: initialMode,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, state.mode);
        if (state.mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error('Failed to save theme preference:', e);
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY, state.mode);
        if (state.mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error('Failed to save theme preference:', e);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;
