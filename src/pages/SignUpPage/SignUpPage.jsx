import Logo from '../../components/Logo/Logo';
import css from './SignUpPage.module.css';
import kids from '../../assets/images/illustration.png';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPage = () => {
  return (
    <main className={css.signUpPage}>
      <Logo type={'black'} />
      <div className={css.kids}>
        <img src={kids} alt="kids illustration" />
      </div>
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
