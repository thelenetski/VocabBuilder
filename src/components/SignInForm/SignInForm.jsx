import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './SignInForm.module.css';
import sprite from '/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/auth/operations';
import { selectAuthLoading } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
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

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const passwordValue = watch('password');

  const onSubmit = data => {
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        toast.success('Login successfully!');
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    if (
      passwordValue &&
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/.test(passwordValue)
    ) {
      setPasswordSuccess(true);
    } else {
      setPasswordSuccess(false);
    }
  }, [passwordValue, trigger]);

  return (
    <div className={css.signInContainer}>
      <h1 className={css.title}>Login</h1>
      <p className={css.description}>
        Please enter your login details to continue using our service:
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.formGroup}>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Email"
            className={css.input}
          />
          {errors.email && (
            <div className={css.errorWrap}>
              <svg className={css.warningIcon}>
                <use href={sprite + '#warning'}></use>
              </svg>
              <p className={css.error}>{errors.email.message}</p>
            </div>
          )}
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
            <div className={css.errorWrap}>
              <svg className={css.warningIcon}>
                <use href={sprite + '#warning'}></use>
              </svg>
              <p className={css.error}>{errors.password.message}</p>
              {passwordSuccess && (
                <>
                  <svg className={css.warningIcon}>
                    <use href={sprite + '#success'}></use>
                  </svg>
                  <p className={css.success}>Success password</p>
                </>
              )}
            </div>
          )}
          {passwordSuccess && (
            <div className={css.errorWrap}>
              <svg className={css.warningIcon}>
                <use href={sprite + '#success'}></use>
              </svg>
              <p className={css.success}>Success password</p>
            </div>
          )}
        </div>

        <button type="submit" className={css.signInButton}>
          {loading.signUp ? 'Loading...' : 'Login'}
        </button>
        <Link to="/register" className={css.link}>
          Register
        </Link>
      </form>
    </div>
  );
};

export default SignInForm;
