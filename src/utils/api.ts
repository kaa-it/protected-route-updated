// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
import {TUser} from "../types";

const getUser = async (): Promise<TUser> => {
    const request: Promise<TUser> = new Promise((resolve) => {
        setTimeout(() => {
            resolve({});
        }, 1000);
    });

    try {
        return await request;
    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw error;
    }
}

const login = (): Promise<TUser> =>
    new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("accessToken", "test-token");
            localStorage.setItem("refreshToken", "test-refresh-token");
            resolve({});
        }, 1000);
    });

const logout = (): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            resolve();
        }, 1000);
    });

export const api = {
    getUser,
    login,
    logout
};
