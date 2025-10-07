import {defaultOptions} from "@utils/constants.js";
import {fetchWithRefresh, request} from "@utils/tokens.js";

export function register(formData) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(formData),
  };

  return request('auth/register', options).then((response) => {
    if (!response.success) {
      return Promise.reject(response);
    }

    return response;
  });
}

export function login(formData) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(formData),
  };

  return request('auth/login', options).then((response) => {
    if (!response.success) {
      return Promise.reject(response);
    }

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response;
  });
}

async function getUser() {
  //  Использование функции fetchWithRefresh
  return fetchWithRefresh('auth/user', {
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
  });
}

export function logout() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  };

  return request('auth/logout', options).then((response) => {
    if (!response.success) {
      return Promise.reject(response);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response;
  });
}

export const api = {
  getUser,
  login,
  logout,
  register,
};
