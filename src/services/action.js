import { api } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async () => {
    const res = await api.getUser();
    return res.user;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async () => {
  const res = await api.login();
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  }
);
