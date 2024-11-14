import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user";
import {api} from "../utils/api";

export const login = createAsyncThunk(
    "user/login",
    async () => {
        const res = await api.login();
        return res.user;
    }
);

export const checkUserAuth = createAsyncThunk(
    "user/checkAuth",
    async (_, {dispatch}) => {
        if (localStorage.getItem("accessToken")) {
            api.getUser()
                .then(res => dispatch(setUser(res.user)))
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    }
)


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        return api.logout();
    }
);
