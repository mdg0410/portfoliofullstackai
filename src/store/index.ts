import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './slices/themeSlice';
import { consoleSlice } from './slices/consoleSlice';
import { navigationSlice } from './slices/navigationSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    console: consoleSlice.reducer,
    navigation: navigationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;