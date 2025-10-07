import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@utils/api.js';
import { isTokenExists } from '@utils/tokens.js';

import { setUser, setAuthChecked } from './slice.js';

export const register = createAsyncThunk('user/register', async (formData) => {
  const response = await api.register(formData);
  return response.user;
});

export const login = createAsyncThunk('user/login', async (formData) => {
  const response = await api.login(formData);
  return response.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const response = await api.getUser();
        dispatch(setUser(response.user));
      }
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  return await api.logout();
});
