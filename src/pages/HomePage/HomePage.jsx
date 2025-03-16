import { useSelector } from 'react-redux';
import Logo from '../../components/Logo/Logo';
import styles from './HomePage.module.css';
import { selectIsSignedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const isSignIn = useSelector(selectIsSignedIn);

  return (
    <>
      <main className={styles.homePage}>
        <Logo type={'white'} />
      </main>
      {isSignIn ? <Navigate to={'/dictionary'} /> : <Navigate to={'/login'} />}
    </>
  );
};

export default HomePage;
