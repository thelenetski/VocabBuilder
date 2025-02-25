import { createSlice } from '@reduxjs/toolkit';
import {
  signUp,
  signIn,
  logOut,
  refreshUser,
  refreshToken,
} from './operations';

const handleRejected = state => {
  state.loading = {
    signUp: false,
    signIn: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isSignedIn: false,
    loading: {
      signUp: false,
      signIn: false,
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading.signUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading.signUp = false;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, state => {
        state.loading.signIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.loading.signIn = false;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.token = null;
        state.isSignedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, state => {
        // state.token = action.payload.data.accessToken;
        state.isSignedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(refreshToken.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isSignedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.token = null;
        state.isSignedIn = false;
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
