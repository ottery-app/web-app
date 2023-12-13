import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import tempzoneSlice from '../features/event/tempzone/tempzoneSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tempzone: tempzoneSlice,
  },
});