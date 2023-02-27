import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserDao } from "@/utils/dao/user-dao";
import { UserCreate, UserUpdate } from "@/utils/interfaces/user";

// -- Actions
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, user }: UserUpdate) => {
    return await UserDao.update({ id, user });
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: string) => {
    return await UserDao.delete(id);
  }
);

export const sendMailUser = createAsyncThunk("user/sendMail", async () => {
  return await UserDao.sendMail();
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: UserCreate) => {
    return await UserDao.create(user);
  }
);
// -- Getters
export const getAllUser = createAsyncThunk("user/getAll", async () => {
  return await UserDao.getAllUsers();
});

export const getUserById = createAsyncThunk(
  "user/getById",
  async (id: string) => {
    return await UserDao.getUserById(id);
  }
);
