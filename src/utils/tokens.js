// Вспомогательная функция для обработки полученного ответа с сервера
import {defaultOptions, host} from "@utils/constants.js";

export function checkResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((error) => Promise.reject({ ...error, statusCode: res.status }));
}

// Метод отправки запроса без обновления токена
export async function request(endpoint, options) {
  try {
    const res = await fetch(`${host}/api/${endpoint}`, options);
    return await checkResponse(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Метод обновления access-токена
export function refreshToken() {
  return request('auth/token', {
    ...defaultOptions,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then((refreshData) => {
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }

    localStorage.setItem('refreshToken', refreshData.refreshToken);
    localStorage.setItem('accessToken', refreshData.accessToken);
    return refreshData;
  });
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
