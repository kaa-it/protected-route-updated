import Cookies from 'js-cookie';

import { fetchWithRefresh, request } from '@utils/tokens.js';

export async function register(formData) {
  const response = await request('auth/register', { body: JSON.stringify(formData) });

  Cookies.set('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response;
}

export async function login(formData) {
  const response = await request('auth/login', { body: JSON.stringify(formData) });

  Cookies.set('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response;
}

async function getUser() {
  //  Использование функции fetchWithRefresh
  return await fetchWithRefresh('auth/user', {
    headers: {
      authorization: Cookies.get('accessToken'),
    },
  });
}

export async function logout() {
  const response = await request('auth/logout', {
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  Cookies.remove('accessToken');
  localStorage.removeItem('refreshToken');

  return response;
}

export const api = {
  getUser,
  login,
  logout,
  register,
};
