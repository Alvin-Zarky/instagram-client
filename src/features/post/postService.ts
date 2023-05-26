import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../types/post";

export const setPostService = createAsyncThunk(
  'setPost',
  async(data: Post, _thunkAPI) =>{
    return data
  }
)