import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatInitialState, UserMessage } from "../../types/message";
import { getUserLatestChat } from "./chatService";

const initialState: ChatInitialState={
  chat: []
}

const chatSlice= createSlice({
  name:'chatReducer',
  initialState,
  reducers:{
    clear:(_state: ChatInitialState, _action:PayloadAction) => initialState
  },
  extraReducers(builder) {
    builder.addCase(getUserLatestChat.fulfilled, (state: ChatInitialState, action:PayloadAction<UserMessage>) =>{
      state.chat.push(action.payload)
    })
  },
})

export const { clear } = chatSlice.actions
export default chatSlice.reducer