import clsx from 'clsx';
import css from './Navigation.module.css';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className={css.navWrap}>
      <Link
        to="/dictionary"
        className={clsx(location.pathname === '/dictionary' && css.active)}
      >
        Dictionary
      </Link>
      <Link
        to="/recommended"
        className={clsx(location.pathname === '/recommended' && css.active)}
      >
        Recommended
      </Link>
      <Link
        to="/training"
        className={clsx(location.pathname === '/training' && css.active)}
      >
        Training
      </Link>
    </div>
  );
};

export default Navigation;
