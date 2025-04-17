import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import themeReducer from './slices/themeSlice';
import navigationReducer from './slices/navigationSlice';
import consoleReducer from './slices/consoleSlice';
import aiReducer from './slices/aiSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    navigation: navigationReducer,
    console: consoleReducer,
    ai: aiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore estos campos en la serialización para evitar warnings
        ignoredActions: ['ai/fetchResponse/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados para usar con Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;