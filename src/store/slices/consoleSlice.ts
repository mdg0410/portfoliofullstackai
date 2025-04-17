import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConsoleState {
  history: Array<{
    type: 'input' | 'output';
    content: string;
    timestamp: number;
  }>;
  isTyping: boolean;
}

const initialState: ConsoleState = {
  history: [],
  isTyping: false,
};

export const consoleSlice = createSlice({
  name: 'console',
  initialState,
  reducers: {
    addConsoleEntry: (state, action: PayloadAction<{ type: 'input' | 'output'; content: string }>) => {
      state.history.push({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    setTypingStatus: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearConsole: (state) => {
      state.history = [];
    },
  },
});

// Exportando las acciones y el reducer
export const { addConsoleEntry, setTypingStatus, clearConsole } = consoleSlice.actions;
export default consoleSlice.reducer;