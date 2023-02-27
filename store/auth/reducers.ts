import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

import { User } from "@/utils/interfaces/user";
import { AuthOutput } from "@/utils/interfaces/auth";
import { authLogin, authLogout } from "./actions";
import { act } from "react-dom/test-utils";

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: "",
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        authLogin.fulfilled,
        (state, action: PayloadAction<AuthOutput>) => {
          const decodedJwt = jwt.decode(action.payload.accessToken) as User;

          state.isAuthenticated = true;
          state.accessToken = action.payload.accessToken;
          state.user = decodedJwt;
        }
      )
      .addCase(authLogin.rejected, (state, action) => {
        console.error(action);
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.accessToken = "";
        state.user = null;
      });
  },
});

export default authSlice.reducer;
