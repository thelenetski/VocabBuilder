import css from './Loader.module.css'; // Подключаем CSS-модуль

const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <div className={css.loader}></div>
    </div>
  );
};

export default Loader;
