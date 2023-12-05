import { configureStore } from '@reduxjs/toolkit';
import questionSlice from './slices/questionSlice';

export const store = configureStore({
  reducer: {
    question: questionSlice,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
