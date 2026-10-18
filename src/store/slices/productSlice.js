import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchCategories, fetchProductById } from '../../services/api';

// Async Thunks
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllProducts();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch products');
    }
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategories();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch categories');
    }
  }
);

export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchProductById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load product details');
    }
  }
);

const initialState = {
  items: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  selectedProduct: null,
  selectedProductStatus: 'idle',
  selectedProductError: null,

  // Filters
  searchQuery: '',
  selectedCategory: 'all',
  selectedSubCategory: 'all',
  sortBy: 'default', // 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc'
  priceRange: { min: 0, max: 4000 },
  minRating: 0,

  // Pagination
  currentPage: 1,
  itemsPerPage: 8,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to page 1 on search
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubCategory = 'all'; // Reset subcategory when switching main category
      state.currentPage = 1;
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.currentPage = 1;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedSubCategory = 'all';
      state.sortBy = 'default';
      state.priceRange = { min: 0, max: 4000 };
      state.minRating = 0;
      state.currentPage = 1;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductStatus = 'idle';
      state.selectedProductError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getProducts
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // getCategories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      // getProductDetails
      .addCase(getProductDetails.pending, (state) => {
        state.selectedProductStatus = 'loading';
        state.selectedProductError = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.selectedProductStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.selectedProductStatus = 'failed';
        state.selectedProductError = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedSubCategory,
  setSortBy,
  setPriceRange,
  setMinRating,
  setCurrentPage,
  resetFilters,
  clearSelectedProduct,
} = productSlice.actions;

// Base Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectCategories = (state) => state.products.categories;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectSelectedProductStatus = (state) => state.products.selectedProductStatus;

export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSelectedSubCategory = (state) => state.products.selectedSubCategory;
export const selectSortBy = (state) => state.products.sortBy;
export const selectPriceRange = (state) => state.products.priceRange;
export const selectMinRating = (state) => state.products.minRating;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;

export const selectFilters = createSelector(
  [
    selectSearchQuery,
    selectSelectedCategory,
    selectSelectedSubCategory,
    selectSortBy,
    selectPriceRange,
    selectMinRating,
    selectCurrentPage,
    selectItemsPerPage,
  ],
  (
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    sortBy,
    priceRange,
    minRating,
    currentPage,
    itemsPerPage
  ) => ({
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    sortBy,
    priceRange,
    minRating,
    currentPage,
    itemsPerPage,
  })
);

// Memoized selector for filtering and sorting products
export const selectFilteredProducts = createSelector(
  [
    selectAllProducts,
    selectSearchQuery,
    selectSelectedCategory,
    selectSelectedSubCategory,
    selectSortBy,
    selectPriceRange,
    selectMinRating,
  ],
  (
    items,
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    sortBy,
    priceRange,
    minRating
  ) => {
    let result = [...items];

    // Filter by main department category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by subcategory if selected
    if (selectedSubCategory && selectedSubCategory !== 'all') {
      result = result.filter((p) => {
        const sub = (p.subCategory || '').toLowerCase();
        const orig = (p.originalCategory || '').toLowerCase();
        const title = (p.title || '').toLowerCase();

        if (selectedSubCategory === 'shoes') {
          return sub.includes('shoe') || orig.includes('shoe') || title.includes('shoe') || title.includes('sneaker');
        }
        if (selectedSubCategory === 'bags') {
          return sub.includes('bag') || orig.includes('bag') || title.includes('bag');
        }
        if (selectedSubCategory === 'accessories') {
          return sub.includes('jewel') || sub.includes('sunglass') || orig.includes('jewel') || orig.includes('sunglass') || title.includes('glass');
        }
        if (selectedSubCategory === 'headphones') {
          return title.includes('headphone') || sub.includes('headphone');
        }
        if (selectedSubCategory === 'earbuds') {
          return title.includes('earbud') || title.includes('airpod') || sub.includes('earbud');
        }
        if (selectedSubCategory === 'speakers') {
          return title.includes('speaker') || sub.includes('speaker');
        }
        return (
          sub === selectedSubCategory.toLowerCase() ||
          orig === selectedSubCategory.toLowerCase() ||
          sub.includes(selectedSubCategory.toLowerCase()) ||
          orig.includes(selectedSubCategory.toLowerCase())
        );
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Filter by price range
    if (priceRange) {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
      );
    }

    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // default: keep original order
        break;
    }

    return result;
  }
);

// Memoized paginated products selector
export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectCurrentPage, selectItemsPerPage],
  (filtered, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }
);

// Total pages selector
export const selectTotalPages = createSelector(
  [selectFilteredProducts, selectItemsPerPage],
  (filtered, itemsPerPage) => {
    return Math.ceil(filtered.length / itemsPerPage) || 1;
  }
);

// Featured products selector
export const selectFeaturedProducts = createSelector(
  [selectAllProducts],
  (items) => items.filter((p) => p.featured || p.rating >= 4.8).slice(0, 8)
);

export default productSlice.reducer;
