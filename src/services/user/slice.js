import { createSlice } from '@reduxjs/toolkit';

import { login, logout, register } from './actions.js';

const initialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectUser: (state) => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('/pending') && !action.type.includes('checkUserAuth'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') && !action.type.includes('checkUserAuth'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message;
        }
      );
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const { selectIsLoading, selectError, selectUser } = userSlice.selectors;
export const selectAuthChecked = (state) => state.user.isAuthChecked;
