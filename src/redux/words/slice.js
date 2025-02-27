import { createSlice } from '@reduxjs/toolkit';
import { getAllWords, getCategories } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    items: {},
    categories: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...action.payload };
    },
    resetFilters: state => {
      state.filters = {};
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCategories.rejected, handleRejected)
      .addCase(getAllWords.pending, handlePending)
      .addCase(getAllWords.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllWords.rejected, handleRejected);
  },
});

export const { setFilters, resetFilters } = wordsSlice.actions;

export const wordsReducer = wordsSlice.reducer;
