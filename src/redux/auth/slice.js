import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, logOut, refreshUser } from './operations';

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
    user: null,
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
        state.token = action.payload.token;
        state.user = action.payload.name;
        state.isSignedIn = true;
        state.loading.signUp = false;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, state => {
        state.loading.signIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.name;
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
      .addCase(refreshUser.fulfilled, (state, action) => {
        // state.token = action.payload.accessToken;
        state.user = action.payload.name;
        state.isSignedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
