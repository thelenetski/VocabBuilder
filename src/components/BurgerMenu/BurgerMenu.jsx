import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import css from './BurgerMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/auth/selectors';
import sprite from '/sprite.svg';
import { Link, useLocation } from 'react-router-dom';
import kids from '../../assets/images/illustration.png';
import kids2x from '../../assets/images/illustration@2x.png';
import clsx from 'clsx';
import { logOut } from '../../redux/auth/operations';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector(selectUserInfo);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button className={css.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        <div className={css.menuIconFrame}></div>
        <div className={css.menuIconFrame}></div>
        <div className={css.menuIconFrame}></div>
      </button>
      <AnimatePresence initial={false}>
        <motion.nav
          ref={menuRef}
          className={css.menuWrap}
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          exit={{ x: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className={css.headWrap}>
            <div className={css.userInfo}>
              <p>{user}</p>
              <div className={css.avatar}>
                <svg className={css.userAvatar}>
                  <use href={sprite + '#user'}></use>
                </svg>
              </div>
            </div>
            <button className={css.close} onClick={() => setIsOpen(false)}>
              <svg>
                <use href={sprite + '#close'}></use>
              </svg>
            </button>
          </div>
          <div className={css.linksWrap}>
            <Link
              to="/dictionary"
              className={clsx(
                location.pathname === '/dictionary' && css.active
              )}
            >
              Dictionary
            </Link>
            <Link
              to="/recommended"
              className={clsx(
                location.pathname === '/recommended' && css.active
              )}
            >
              Recommended
            </Link>
            <Link
              to="/training"
              className={clsx(location.pathname === '/training' && css.active)}
            >
              Training
            </Link>
            <Link onClick={() => dispatch(logOut())}>
              Log out
              <svg>
                <use href={sprite + '#arrow-white-right'}></use>
              </svg>
            </Link>
          </div>
          <div className={css.kids}>
            <img
              src={kids}
              srcSet={`${kids} 1x, ${kids2x} 2x`}
              alt="kids illustration"
            />
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
