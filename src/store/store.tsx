import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countrySlice';
import dataReducer from './slices/appData';

const rootReducer = combineReducers({
  countries: countriesReducer,
  dataFromForms: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
