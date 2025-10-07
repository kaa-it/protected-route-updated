import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { api } from '@utils/api.js';

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
      if (Cookies.get('accessToken')) {
        const response = await api.getUser();
        dispatch(setUser(response.user));
      }
    } catch {
      // Очищаем невалидный токен при ошибке
      Cookies.delete('accessToken');
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  return await api.logout();
});
