import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout} from "./action";
import {TUser} from "../types";

type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
}

const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
        })
  }
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
