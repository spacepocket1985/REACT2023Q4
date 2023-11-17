import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import searchValueReducer from './slices/searchFormSlice';
import charactersOnPageReducer from './slices/charactersOnPageSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    searchValue: searchValueReducer,
    charactersOnPage: charactersOnPageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
