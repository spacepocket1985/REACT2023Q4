import { createSlice } from "@reduxjs/toolkit";

const initialState = { charactersOnPage: 20 };

const charactersOnPageSlice = createSlice({
  name: "charactersOnPage",
  initialState,
  reducers: {
    setCharactersOnPage: (state, action) => {
      state.charactersOnPage = action.payload;
    },
  },
});

export const { setCharactersOnPage } = charactersOnPageSlice.actions;

export default charactersOnPageSlice.reducer;
