import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './generalSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
  },
});
