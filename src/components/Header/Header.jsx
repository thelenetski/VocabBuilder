import css from './Header.module.css';
import Logo from '../../components/Logo/Logo';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/auth/selectors';
import sprite from '/sprite.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
  const user = useSelector(selectUserInfo);

  return (
    <header className={css.headerWrap}>
      <Logo type={'black'} />
      <div className={css.userAccountWrap}>
        <p>{user}</p>
        <div className={css.avatar}>
          <svg className={css.userAvatar}>
            <use href={sprite + '#user'}></use>
          </svg>
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
