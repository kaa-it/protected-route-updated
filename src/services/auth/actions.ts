import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api.ts";
import {setIsAuthChecked, setUser} from "./slice.ts";

export const login = createAsyncThunk(
    'auth/login',
    async () => {
        return api.login();
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return api.logout();
    }
)

export const checkUserAuth = createAsyncThunk(
    'auth/checkUserAuth',
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