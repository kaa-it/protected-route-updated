import {TLoginResponse, TUserResponse} from "../types";

// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
const getUser = (): Promise<TUserResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });

const login = (): Promise<TLoginResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: "test-token",
        refreshToken: "test-refresh-token",
        user: {},
      });
    }, 1000);
  });

const logout = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });  

export const api = {
  getUser,
  login,
  logout
};
