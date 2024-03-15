import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user";
import {api} from "../utils/api";
import {AppDispatch} from "./store";

export const login = createAsyncThunk(
    "user/login",
    async () => {
        const res = await api.login();
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = createAsyncThunk<void, void, { dispatch: AppDispatch}> (
  "user/checkAuth",
  async (_, { dispatch }) => {
    if (localStorage.getItem("accessToken")) {
      api.getUser()
        .then(res => dispatch(setUser(res.user)))
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk<void>(
    "user/logout",
    async () => {
        await api.logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);
