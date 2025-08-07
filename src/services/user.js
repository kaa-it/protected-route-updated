import {createSlice} from "@reduxjs/toolkit";
import {login, logout} from "./action";

const initialState = {
    user: null,
    isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      setUser: (state, action) => {
          state.user = action.payload;
      },
      setIsAuthChecked: (state, action) => {
          state.isAuthChecked = action.payload;
      }
  },
  selectors: {
    getIsAuthChecked: state => state.isAuthChecked,
    getUser: state => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const {setUser, setIsAuthChecked} = userSlice.actions;
export const { getIsAuthChecked, getUser } = userSlice.selectors;

export default userSlice.reducer;
