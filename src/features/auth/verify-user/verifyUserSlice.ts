import { createSlice } from "@reduxjs/toolkit";

const initialState={
  verifyUser: null,
}
const userVerifySlice= createSlice({
  name: 'verify-user',
  initialState,
  reducers:{},
  extraReducers(builder) {
    
  },
})

export default userVerifySlice.reducer