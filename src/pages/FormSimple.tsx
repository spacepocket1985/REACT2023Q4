import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ValidationError } from 'yup';

import { useState, useRef, FormEvent } from 'react';
import {} from 'react';
import validationSchema from '../utils/validationSchema';
import { RootState } from '../store/store';
import { setData, addData, setPicture } from '../store/slices/appData';

const FormSimple = () => {
  const navigate = useNavigate();

  const [formErrors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countriesRef = useRef<HTMLSelectElement>(null);

  const countries = useSelector((state: RootState) => {
    return state.countries.countries;
  });

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptTerms: tcRef.current?.checked,
      picture: pictureRef.current?.files,
      country: countriesRef.current?.value,
    };
    
    try {
      validationSchema.validateSync(formData), { abortEarly: false };
      if (
        formData.name &&
        formData.age &&
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.gender &&
        formData.acceptTerms &&
        formData.picture &&
        formData.country
      ) {
        dispatch(setData(formData));
        convertBase64(formData.picture[0]);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors({ [String(err.path)]: err.message });
      }
    }
  };

  return (
    <>
      <h1>Simple-Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" ref={nameRef} />
        <div className="invalid-feedback">{formErrors.name}</div>
        <div className="two-columns">
          <div className="column">
            <label>Gender</label>
            <select name="gender" ref={genderRef}>
              <option value=""></option>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="invalid-feedback">{formErrors.gender}</div>
          <div className="column">
            <label>Age</label>
            <input name="age" ref={ageRef} />
          </div>
        </div>
        <div className="invalid-feedback">{formErrors.age}</div>
        <label>Email</label>
        <input name="email" ref={emailRef} />
        <div className="invalid-feedback">{formErrors.email}</div>
        <label>Password</label>
        <input type="password" name="password" ref={passwordRef} />
        <div className="invalid-feedback">{formErrors.password}</div>
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" ref={confirmPasswordRef} />
        <div className="invalid-feedback">{formErrors.confirmPassword}</div>

        <label>Country</label>
        <select name="country" ref={countriesRef}>
          {countriesList}
        </select>
        <div className="invalid-feedback">{formErrors.country}</div>
        <div className="img-wrapper">
          <label>Picture</label>
          <input type="file" name="picture" ref={pictureRef} />
        </div>
        <div className="invalid-feedback">{formErrors.picture}</div>

        <div className="two-columns">
          <label className="form-check-label">I have read and agree to terms and conditions</label>
          <input type="checkbox" name="acceptTerms" ref={tcRef} />
        </div>
        <div className="invalid-feedback">{formErrors.acceptTerms}</div>
        <input type="submit" />
      </form>
    </>
  );
};

export default FormSimple;
