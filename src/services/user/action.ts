import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../utils/api";

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
