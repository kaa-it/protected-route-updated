import {TUser} from "../../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout} from "./actions.ts";

type TAuthState = {
    user: TUser | null;
    isAuthChecked: boolean;
}

export const initialState: TAuthState = {
    user: null,
    isAuthChecked: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TUser | null>) => {
            state.user = action.payload;
        },
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        }
    },
    selectors: {
        getUser: state => state.user,
        getIsAuthChecked: state => state.isAuthChecked,
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const { setUser, setIsAuthChecked } = authSlice.actions;
export const { getUser, getIsAuthChecked } = authSlice.selectors;

export type TAuthActions = ReturnType<(typeof authSlice.actions)[keyof typeof authSlice.actions]>;