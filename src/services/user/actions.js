import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@utils/api.js';

import { setUser, setAuthChecked } from './slice.js';

export const register = createAsyncThunk('user/register', async (formData) => {
  const res = await api.register(formData);
  return res;
});

export const login = createAsyncThunk('user/login', async (formData) => {
  const res = await api.login(formData);
  return res.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      api
        .getUser()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  return api.logout();
});
