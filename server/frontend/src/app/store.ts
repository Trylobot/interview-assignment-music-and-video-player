import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '../features/videos/videoSlice';

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

// Inferred types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
