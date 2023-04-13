import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, User } from "../../types/authentication";
import Storage from "../../utility/storage";
import { authSignInAsync, authSignOutAsync } from "./authServices";

const storage= new Storage("token")

const initialState: InitialState ={
  user: localStorage.getItem('token') ? storage.getItem() : null,
  isLoading:false,
  isSuccess:false,
  isError:false,
  message: ''
}

const authSlice= createSlice({
  name:'auth',
  initialState,
  reducers:{
    reset:(state: InitialState, _action: PayloadAction) =>{
      state.user=null
      state.isLoading=false
      state.isSuccess=false
      state.isError=false
      state.message= ''
    }
  },
  extraReducers(builder) {
    builder.addCase(authSignInAsync.fulfilled, (state: InitialState, action: PayloadAction<User | unknown>) =>{
      state.user = action.payload ?? null
    })
    
    builder.addCase(authSignOutAsync.fulfilled, (state:InitialState, _action:PayloadAction<null>) =>{
      state.user= null
    })
  },
})

export const {reset} = authSlice.actions
export default authSlice.reducer