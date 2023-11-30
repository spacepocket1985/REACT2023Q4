import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import IForm from '../types/interfaces/IFrorm';

const FormReact = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 6 characters')
      .matches(/^[A-ZА-ЯЁ]/, 'The first letter of the name must be capital'),
    age: Yup.number()
      .required('Age is required')
      .typeError('Should be number')
      .min(0, 'No negative values'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    gender: Yup.string().required('Choose gender'),
    password: Yup.string()
      .required('Password is required')
      .matches(/[A-ZА-ЯЁ]/, 'Password strength: must have at least one uppercase letter')
      .matches(/[a-zа-яё]/, 'Password strength: must have at least one lowercase letter')
      .matches(/[0-9]/, 'Password strength: must have at least one digit')
      .matches(
        /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
    acceptTerms: Yup.boolean()
      .required('Accept T&C is required')
      .oneOf([true], 'Accept T&C is required'),
    country: Yup.string().required('Country is required'),
    picture: Yup.string().required('Picture is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

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
        <div className="twoСolumns">
          <label>Gender</label>
          <select
            {...register('gender')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <div className="invalid-feedback">{errors.gender?.message}</div>
          <label>Age</label>
          <input
            {...register('age')}
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.age?.message}</div>
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
        <div className="twoСolumns">
          <label className="form-check-label">I have read and agree to terms and conditions</label>
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>
        <input type="submit" />
      </form>
    </>
  );
};

export default FormReact;
