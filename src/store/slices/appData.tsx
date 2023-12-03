import { createSlice } from '@reduxjs/toolkit';
import IFormData from '../../types/interfaces/IData';
type IDataList = { dataFromForms: IFormData[]; dataFromLastSubmit: IFormData };

const initialState: IDataList = {
  dataFromForms: [],
  dataFromLastSubmit: {
    name: '',
    age: 0,
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    country: '',
    picture: '',
  },
};

const datatSlice = createSlice({
  name: 'dataFromForms',
  initialState,
  reducers: {
    addData(state) {
      state.dataFromForms.unshift(state.dataFromLastSubmit);
    },
    setData: (state, action) => void (state.dataFromLastSubmit = action.payload),
    setPicture: (state, action) => void (state.dataFromLastSubmit.picture = action.payload),
  },
});

export const { addData, setData, setPicture } = datatSlice.actions;

export default datatSlice.reducer;
