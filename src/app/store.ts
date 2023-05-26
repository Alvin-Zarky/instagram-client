import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import postSlice from '../features/post/postSlice';
import { APP_ENV } from '../config/env';
import chatSlice from '../features/chat/chatSlice';
import userVerifySlice from "../features/auth/verify-user/verifyUserSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    verifyUser: userVerifySlice,
    post: postSlice,
    chat: chatSlice
  },
  devTools: APP_ENV === 'development'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
