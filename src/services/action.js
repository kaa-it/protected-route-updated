import { api } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {setIsAuthChecked, setUser} from "./user";

export const login = createAsyncThunk(
  "user/login",
  async () => {
    const res = await api.login();
    return res.user;
  }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        return api.logout();
    }
);

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, { dispatch}) => {
        if (api.isTokenExists()) {
            api.getUser()
                .then((res) => dispatch(setUser(res.user)))
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }
);