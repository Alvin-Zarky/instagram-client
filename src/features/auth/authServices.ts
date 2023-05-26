import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../types/authentication"

export const authSignInAsync = createAsyncThunk(
  "auth/signIn",
  async (value: User, _thunkAPI:any) =>{
    if(value) return value
  }
)

export const authSignOutAsync = createAsyncThunk(
  "auth/signOut",
  async(_, _thunkAPI) =>{
    return null
  }
)

export const updateProfilePhoto = createAsyncThunk(
  'auth/updateImage',
  async (value: string, _thunkAPI:any) =>{
    if(value) return value
  }
)

export const updateHideLike= createAsyncThunk(
  'auth/hideLike',
  async (value:User, _thunkAPI:any) =>{
    if(value) return value
  }
)
