import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import IForm from '../types/interfaces/IFrorm';
import validationSchema from '../utils/validationSchema';
import { RootState } from '../store/store';
import { setData, addData, setPicture } from '../store/slices/appData';
// import { ChangeEvent } from 'react';

const FormReact = () => {
  const navigate = useNavigate();

  const countries = useSelector((state: RootState) => {
    return state.countries.countries;
  });

  // const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   console.log(base64)
  // };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        if (typeof fileReader.result === 'string') dispatch(setPicture(fileReader.result));
        dispatch(addData());
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const countriesList = countries.map((country, index) => (
    <option key={index} value={country}>
      {country}
    </option>
  ));

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    dispatch(setData(data));
    convertBase64(data.picture[0]);
    navigate('/');
  };

  return (
    <>
      <h1>React-Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          type="text"
          {...register('name')}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.name?.message}</div>
        <div className="two-columns">
          <div className="column">
            <label>Gender</label>
            <select
              {...register('gender')}
              className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            <div className="invalid-feedback">{errors.gender?.message}</div>
          </div>
          <div className="column">
            <label>Age</label>
            <input
              {...register('age')}
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.age?.message}</div>
          </div>
        </div>
        <label>Email</label>
        <input
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <label>Password</label>
        <input
          type="password"
          {...register('password')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
        <label>Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>

        <label>Country</label>
        <select
          {...register('country')}
          className={`form-control ${errors.country ? 'is-invalid' : ''}`}
        >
          {' '}
          {countriesList}
        </select>
        <div className="invalid-feedback">{errors.country?.message}</div>
        <div className="img-wrapper">
          <label>Picture</label>
          <input
            type="file"
            {...register('picture')}
            className={`form-control ${errors.picture ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.picture?.message}</div>
        </div>

        <div className="two-columns">
          <label className="form-check-label">I have read and agree to terms and conditions</label>
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>

        <input type="submit" />
      </form>
    </>
  );
};

export default FormReact;
