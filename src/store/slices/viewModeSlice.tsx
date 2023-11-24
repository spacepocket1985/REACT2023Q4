import { createSlice } from "@reduxjs/toolkit";

const initialState = { isviewMode: false };

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    setViewMode: (state) => {
      state.isviewMode = true;
    },
    clearViewMode: (state) => {
      state.isviewMode = false;
    },
  },
});

export const { setViewMode, clearViewMode } = viewModeSlice.actions;

export default viewModeSlice.reducer;
