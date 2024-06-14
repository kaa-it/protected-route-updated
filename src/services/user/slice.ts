import {createSlice} from "@reduxjs/toolkit";
import {login, logout} from "./action";
import {TUser} from "../../types";

type TUserState = {
    user: TUser | null;
}

const initialState: TUserState = {
    user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
        })
  }
});
