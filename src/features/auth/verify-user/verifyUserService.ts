import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../types/authentication";

export const setUserVerify= createAsyncThunk(
  'userVerify/verify',
  async (data: User, thunkAPI) =>{
    return data
  }
)