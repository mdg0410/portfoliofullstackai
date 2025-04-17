import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Secciones disponibles en el portafolio
export type Section = 'hero' | 'about' | 'projects' | 'skills' | 'stack' | 'contact';

interface NavigationState {
  activeSection: Section;
  lastSection: Section | null;
  scrollProgress: number;
  isScrolling: boolean;
  navOpen: boolean; // Para menús móviles/drawer
}

const initialState: NavigationState = {
  activeSection: 'hero',
  lastSection: null,
  scrollProgress: 0,
  isScrolling: false,
  navOpen: false
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<Section>) => {
      state.lastSection = state.activeSection;
      state.activeSection = action.payload;
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload;
    },
    toggleIsScrolling: (state, action: PayloadAction<boolean>) => {
      state.isScrolling = action.payload;
    },
    toggleNavMenu: (state, action: PayloadAction<boolean | undefined>) => {
      state.navOpen = action.payload !== undefined ? action.payload : !state.navOpen;
    }
  }
});

export const { 
  setActiveSection, 
  setScrollProgress, 
  toggleIsScrolling,
  toggleNavMenu
} = navigationSlice.actions;

export default navigationSlice.reducer;