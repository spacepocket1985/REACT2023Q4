import { createSlice } from '@reduxjs/toolkit';
import IFormData from '../../types/interfaces/IData';

const initialState: IFormData = {
  name: '',
  age: 0,
  gender: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  country: '',
  picture: '',
};

const formReactSlice = createSlice({
  name: 'formReact',
  initialState,
  reducers: {
    setFormReactData: (state, action) => (state = action.payload),
  },
});

export const { setFormReactData } = formReactSlice.actions;

export default formReactSlice.reducer;
