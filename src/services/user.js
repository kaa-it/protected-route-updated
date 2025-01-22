import {createSlice} from "@reduxjs/toolkit";
import {login} from "./action";

const initialState = {
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
      });
  },
});

export default userSlice.reducer;
