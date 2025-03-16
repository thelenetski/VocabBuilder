import Logo from '../../components/Logo/Logo';
import css from './SignUpPage.module.css';
import kids from '../../assets/images/illustration.png';
import kids2x from '../../assets/images/illustration@2x.png';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { useMediaQuery } from 'react-responsive';

const SignUpPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <main className={css.signUpPage}>
      <Logo type={'black'} />
      {isMobile && (
        <div className={css.kids}>
          <img
            src={kids}
            srcSet={`${kids} 1x, ${kids2x} 2x`}
            alt="kids illustration"
          />
        </div>
      )}
      <SignUpForm />
      <div className={css.actionsItems}>
        <span>Word</span>
        <span>Translation</span>
        <span>Grammar</span>
        <span>Progress</span>
      </div>
    </main>
  );
};

export default SignUpPage;
