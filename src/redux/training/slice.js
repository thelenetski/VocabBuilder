import { createSlice } from '@reduxjs/toolkit';
import { getTasks, sendAnswers } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const trainingSlice = createSlice({
  name: 'training',
  initialState: {
    tasks: {},
    answers: [],
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(getTasks.pending, handlePending)
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTasks.rejected, handleRejected)
      .addCase(sendAnswers.pending, handlePending)
      .addCase(sendAnswers.fulfilled, (state, action) => {
        state.answers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(sendAnswers.rejected, handleRejected);
  },
});

export const trainingReducer = trainingSlice.reducer;
