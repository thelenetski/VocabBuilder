import { createSlice } from '@reduxjs/toolkit';
import {
  createWord,
  deleteWord,
  getAllWords,
  getCategories,
  getOwnWords,
  getStatistics,
  patchWord,
} from './operations';

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
    stats: null,
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
      .addCase(getAllWords.rejected, handleRejected)
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getStatistics.rejected, handleRejected)
      .addCase(getOwnWords.pending, handlePending)
      .addCase(getOwnWords.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOwnWords.rejected, handleRejected)
      .addCase(createWord.pending, handlePending)
      .addCase(createWord.fulfilled, (state, action) => {
        state.items.results = [...state.items.results, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(createWord.rejected, handleRejected)
      .addCase(patchWord.pending, state => {
        state.loading = true;
      })
      .addCase(patchWord.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.results = state.items.results.map(word => {
          if (word && word._id === action.payload._id) {
            return action.payload;
          }
          return word;
        });
      })
      .addCase(patchWord.rejected, handleRejected)
      .addCase(deleteWord.pending, handlePending)
      .addCase(deleteWord.fulfilled, (state, action) => {
        const index = state.items.results.findIndex(
          word => word._id === action.payload.id
        );
        if (index !== -1) {
          state.items.results.splice(index, 1);
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(deleteWord.rejected, handleRejected);
  },
});

export const { setFilters, resetFilters } = wordsSlice.actions;

export const wordsReducer = wordsSlice.reducer;
