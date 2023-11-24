import { createSlice } from "@reduxjs/toolkit";

const initialState = { loadingDetails: false };

const loadingDetailsSlice = createSlice({
  name: "loadingDetails",
  initialState,
  reducers: {
    setLoadingDetails: (state, action) => {
      state.loadingDetails = action.payload;
    },
  },
});

export const { setLoadingDetails } = loadingDetailsSlice.actions;

export default loadingDetailsSlice.reducer;
