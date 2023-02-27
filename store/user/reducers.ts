import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, UserCreateOutput } from "@/utils/interfaces/user";
import {
  createUser,
  deleteUser,
  getAllUser,
  sendMailUser,
  updateUser,
} from "./actions";

export interface UserState {
  users: User[];
  error: any | null;
}

const initialState: UserState = {
  users: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserCreateOutput>) => {
          console.log(action.payload);
          state.users.push(action.payload.user);
        }
      )
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(sendMailUser.fulfilled, (state, action) => {
        console.log(action);
      });
  },
});

export default userSlice.reducer;
