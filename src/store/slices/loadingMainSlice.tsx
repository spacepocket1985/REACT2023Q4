import { createSlice } from "@reduxjs/toolkit";

const initialState = { loadingMain: false };

const loadingMainSlice = createSlice({
  name: "loadingMain",
  initialState,
  reducers: {
    setLoadingMain: (state, action) => {
      state.loadingMain = action.payload;
    },
  },
});

export const { setLoadingMain } = loadingMainSlice.actions;

export default loadingMainSlice.reducer;
