import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './SignUpForm.module.css';
import sprite from '/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/auth/operations';
import { selectAuthLoading } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password must contain at least 6 letters and 1 digit, and be exactly 7 characters long'
    )
    .required('Password is required'),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(signUp(data))
      .unwrap()
      .then(() => {
        toast.success('Register successfully!');
      })
      .catch(e => {
        toast.error(e);
      });
  };

  return (
    <div className={css.signUpContainer}>
      <h1 className={css.title}>Registration</h1>
      <p className={css.description}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.formGroup}>
          <input
            id="name"
            {...register('name')}
            placeholder="Name"
            className={css.input}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

        <div className={css.formGroup}>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Email"
            className={css.input}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={`${css.formGroup} ${css.passwordGroup}`}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            className={css.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={css.togglePassword}
          >
            {showPassword ? (
              <svg>
                <use href={sprite + '#eye'}></use>
              </svg>
            ) : (
              <svg>
                <use href={sprite + '#eye-off'}></use>
              </svg>
            )}
          </button>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={css.signUpButton}>
          {loading.signUp ? 'Loading...' : 'Register'}
        </button>
        <Link to="/login" className={css.link}>
          Login
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
