import { createAsyncThunk } from "@reduxjs/toolkit";

import { AuthDao } from "@/utils/dao/auth-dao";
import { AuthLogin, AuthLogout, AuthOutput } from "@/utils/interfaces/auth";

export const authLogin = createAsyncThunk<AuthOutput, AuthLogin>(
  "auth/login",
  async (userData: AuthLogin) => {
    return await AuthDao.login(userData);
  }
);

export const authLogout = createAsyncThunk<AuthLogout, AuthLogout>(
  "auth/logout",
  async (userData: AuthLogout) => {
    return await AuthDao.logout(userData);
  }
);
