import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserMessage } from "../../types/message";

export const getUserLatestChat = createAsyncThunk(
  'chat/getLastestMs',
  async (data: UserMessage, _thunkAPI) =>{
    return data
  }
)