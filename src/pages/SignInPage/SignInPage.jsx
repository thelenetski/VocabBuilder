import Logo from '../../components/Logo/Logo';
import css from './SignInPage.module.css';
import kids from '../../assets/images/illustration.png';
import kids2x from '../../assets/images/illustration@2x.png';
import SignInForm from '../../components/SignInForm/SignInForm';

const SignInPage = () => {
  return (
    <main className={css.signInPage}>
      <div>
        <Logo type={'black'} />
        <div className={css.kids}>
          <img
            src={kids}
            srcSet={`${kids} 1x, ${kids2x} 2x`}
            alt="kids illustration"
          />
        </div>
        <div className={css.actionsItems}>
          <span>Word</span>
          <span>Translation</span>
          <span>Grammar</span>
          <span>Progress</span>
        </div>
      </div>

      <SignInForm />
    </main>
  );
};

export default SignInPage;
