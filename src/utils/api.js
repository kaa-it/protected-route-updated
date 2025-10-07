const host = 'https://norma.nomoreparties.space';

let defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Вспомогательная функция для обработки полученного ответа с сервера
function checkResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((error) => Promise.reject({ ...error, statusCode: res.status }));
}

// Метод отправки запроса без обновления токена
async function request(endpoint, options) {
  try {
    const res = await fetch(`${host}/api/${endpoint}`, options);
    return await checkResponse(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Метод обновления access-токена
function refreshToken() {
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

async function fetchWithRefresh(endpoint, options) {
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
  const dataUser = await fetchWithRefresh('auth/user', {
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
  });
  return dataUser;
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
