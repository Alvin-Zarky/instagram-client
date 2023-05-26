import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateAuth, User } from "../../types/authentication";
import { authSignInAsync, authSignOutAsync, updateHideLike, updateProfilePhoto } from "./authServices";

const initialState: InitialStateAuth ={
  user: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
  // user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isLoading:false,
  isSuccess:false,
  isError:false,
  message: ''
}

const authSlice= createSlice({
  name:'auth',
  initialState,
  reducers:{
    reset:(state: InitialStateAuth, _action: PayloadAction) =>{
      state.user=null
      state.isLoading=false
      state.isSuccess=false
      state.isError=false
      state.message= ''
    }
  },
  extraReducers(builder) {
    builder.addCase(authSignInAsync.fulfilled, (state: InitialStateAuth, action: PayloadAction<User | unknown>) =>{
      state.user = action.payload ?? null
    })
    
    builder.addCase(authSignOutAsync.fulfilled, (state:InitialStateAuth, _action:PayloadAction<null>) =>{
      state.user= null
    })

    builder.addCase(updateProfilePhoto.fulfilled, (state: InitialStateAuth, action: PayloadAction<string | undefined>) =>{
      state.user!.photo = action.payload
    })

    builder.addCase(updateHideLike.fulfilled, (state: InitialStateAuth, action: PayloadAction<User | undefined>) =>{
      state.user!.isHideLike = action.payload?.isHideLike
    })
  },
})

export const {reset} = authSlice.actions
export default authSlice.reducer