import { createSlice } from '@reduxjs/toolkit';
// import { getUserQuery } from '../../utils/localStorageActions';

// const query = getUserQuery();
const initialState = { searchValue: '' };

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;

export default searchValueSlice.reducer;
