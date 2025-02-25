import clsx from 'clsx';
import css from './Logo.module.css';
import sprite from '/sprite.svg';

const Logo = ({ type }) => {
  return (
    <div
      className={clsx(css.logoWrap, {
        [css.logoWhite]: type === 'white',
      })}
    >
      {type === 'white' ? (
        <svg className={css.logoIcon}>
          <use href={`${sprite}#logo-reverce`} />
        </svg>
      ) : (
        <svg className={css.logoIcon}>
          <use href={`${sprite}#logo`} />
        </svg>
      )}

      <h4>VocabBuilder</h4>
    </div>
  );
};

export default Logo;
