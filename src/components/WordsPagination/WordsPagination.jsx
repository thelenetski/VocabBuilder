import { useDispatch, useSelector } from 'react-redux';
import css from './WordsPagination.module.css';
import sprite from '/sprite.svg';
import { selectAllWords, selectFilters } from '../../redux/words/selectors';
import clsx from 'clsx';
import { setFilters } from '../../redux/words/slice';

const WordsPagination = () => {
  const { page, totalPages } = useSelector(selectAllWords);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const startPage = () => {
    dispatch(setFilters({ ...filters, page: 1 }));
  };

  const prevPage = () => {
    dispatch(setFilters({ ...filters, page: page - 1 }));
  };

  const nextPage = () => {
    dispatch(setFilters({ ...filters, page: page + 1 }));
  };

  const plusTenPage = () => {
    dispatch(setFilters({ ...filters, page: page + 10 }));
  };

  const lastPage = () => {
    dispatch(setFilters({ ...filters, page: totalPages }));
  };

  const handlerPage = page => {
    dispatch(setFilters({ ...filters, page }));
  };

  return (
    <div className={css.paginationWrap}>
      {totalPages >= 1 && (
        <>
          {page > 1 && (
            <>
              <button className={css.button} onClick={startPage}>
                <svg>
                  <use href={sprite + '#double-arrow'}></use>
                </svg>
              </button>
              <button className={css.button} onClick={prevPage}>
                <svg className={css.arrowBtn}>
                  <use href={sprite + '#arrow-left'}></use>
                </svg>
              </button>
            </>
          )}
          {page > 1 && (
            <button
              className={css.button}
              onClick={() => handlerPage(page - 1)}
            >
              {page - 1}
            </button>
          )}

          <button className={clsx(css.button, css.currentPage)}>{page}</button>
          {totalPages > 8 && <button className={css.button}>...</button>}
          {totalPages > 8 && (
            <button className={css.button} onClick={plusTenPage}>
              {page + 9}
            </button>
          )}
          {totalPages > 1 && page < totalPages && (
            <button className={css.button} onClick={nextPage}>
              <svg className={clsx(css.rightBtn, css.arrowBtn)}>
                <use href={sprite + '#arrow-left'}></use>
              </svg>
            </button>
          )}
          {totalPages > 1 && page < totalPages && (
            <button className={css.button} onClick={lastPage}>
              <svg className={css.lastPage}>
                <use href={sprite + '#double-arrow'}></use>
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WordsPagination;
