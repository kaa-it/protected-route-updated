import Cookies from 'js-cookie';

// Вспомогательная функция для обработки полученного ответа с сервера
import { defaultOptions, host } from '@utils/constants.js';

// Кастомная ошибка для ошибок с сервера
class ServerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

// Функция проверки ответа от сервера
export async function checkResponse(response) {
  const res = await response.json();

  if (response.ok) {
    return res;
  }

  throw new ServerError(res.message, res.status);
}

// Функция отправки запроса без обновления токена
export async function request(endpoint, options) {
  const response = await fetch(`${host}/api/${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  return await checkResponse(response);
}

// Функция обновления токенов
export async function refreshToken() {
  const refreshData = await request('auth/token', {
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  Cookies.set('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
}

// Функция выполнения запроса с обновлением токенов
export async function fetchWithRefresh(endpoint, options) {
  try {
    //  Пользователь делает запрос за защищёнными данными
    return await request(endpoint, options);
  } catch (error) {
    //  Мы проверяем, авторизован ли он, и получаем ошибку 401 или 403
    if (error.statusCode === 401 || error.statusCode === 403) {
      //  Отправляем запрос на обновление access token
      const refreshData = await refreshToken();

      //  Повторяем запрос с новыми accessToken в заголовке
      return request(endpoint, {
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

// Функция проверки наличия токенов
export function isTokenExists() {
  return !!Cookies.get('accessToken');
}
