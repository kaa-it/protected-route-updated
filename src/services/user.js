import {createSlice} from "@reduxjs/toolkit";
import {getUser, login} from "./action";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
