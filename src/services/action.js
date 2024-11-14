import { api } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "user/login",
  async () => {
    const res = await api.login();
    return res.user;
  }
);
