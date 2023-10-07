import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import queryStatusSlice from '../queryStatus/queryStatusSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    queryStatus: queryStatusSlice,
  },
});