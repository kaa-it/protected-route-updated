import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";
import {setIsAuthChecked, setUser} from "./slice.ts";

export const login = createAsyncThunk(
    "user/login",
    async () => {
        return api.login();
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
    async (_, { dispatch }) => {
        if (localStorage.getItem("accessToken")) {
            api.getUser()
                .then(user => dispatch(setUser(user)))
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }
)