import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, PostInititState } from "../../types/post";
import { setPostService } from "./postService";

const initialState: PostInititState={
  post: {},
}

const postDetailSlice= createSlice({
  name: 'postDetail',
  initialState,
  reducers:{
    reset:() =>{}
  },
  extraReducers:(builder) => {
    builder.addCase(setPostService.fulfilled, (state: PostInititState, action:PayloadAction<Post>) =>{
      state.post = action.payload
    })
  },
})

export const { reset } = postDetailSlice.actions
export default postDetailSlice.reducer