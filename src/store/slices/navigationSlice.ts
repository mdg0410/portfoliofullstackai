import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentSection: string;
  prevSection: string | null;
  isTransitioning: boolean;
}

const initialState: NavigationState = {
  currentSection: 'console',
  prevSection: null,
  isTransitioning: false,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<string>) => {
      state.prevSection = state.currentSection;
      state.currentSection = action.payload;
    },
    setTransitioning: (state, action: PayloadAction<boolean>) => {
      state.isTransitioning = action.payload;
    },
  },
});