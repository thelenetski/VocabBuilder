import css from './Header.module.css';
import Logo from '../../components/Logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/auth/selectors';
import sprite from '/sprite.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <header className={css.headerWrap}>
      <Logo type={'black'} />
      {isDesktop && <Navigation />}
      <div className={css.userAccountWrap}>
        <p>{user}</p>
        <div className={css.avatar}>
          <svg className={css.userAvatar}>
            <use href={sprite + '#user'}></use>
          </svg>
        </div>
        {!isDesktop && <BurgerMenu />}
        {isDesktop && (
          <Link onClick={() => dispatch(logOut())} className={css.logOutLink}>
            Log out
            <svg>
              <use href={sprite + '#arrow-right'}></use>
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
