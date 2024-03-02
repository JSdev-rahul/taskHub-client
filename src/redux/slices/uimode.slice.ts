import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: true,
};

export const uimode = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = uimode.actions;


export default uimode.reducer;
