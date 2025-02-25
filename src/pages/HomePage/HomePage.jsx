import Logo from '../../components/Logo/Logo';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <Logo type={'white'} />
    </main>
  );
};

export default HomePage;
