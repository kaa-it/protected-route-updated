import Cookies from 'js-cookie';

// Вспомогательная функция для обработки полученного ответа с сервера
import { defaultOptions, host } from '@utils/constants.js';

export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  throw response;
}

// Метод отправки запроса без обновления токена
export async function request(endpoint, options) {
  const response = await fetch(`${host}/api/${endpoint}`, {
    ...defaultOptions,
    ...options,
  });
  return await checkResponse(response);
}

// Метод обновления access-токена
export async function refreshToken() {
  const refreshData = await request('auth/token', {
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  Cookies.set('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
}

export async function fetchWithRefresh(endpoint, options) {
  try {
    return await request(endpoint, options); //  Пользователь делает запрос за защищёнными данными
  } catch (error) {
    //  Мы проверяем, авторизован ли он, и получаем ошибку 401 или 403
    if (error.statusCode === 401 || error.statusCode === 403) {
      //  Отправляем запрос на обновление access token
      const refreshData = await refreshToken();

      //  Повторяем запрос с новыми accessToken в заголовке
      return await request(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
}

export function isTokenExists() {
  return !!Cookies.get('accessToken');
}
