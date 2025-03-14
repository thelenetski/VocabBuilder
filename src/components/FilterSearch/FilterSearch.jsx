import { useDispatch, useSelector } from 'react-redux';
import css from './FilterSearch.module.css';
import { setFilters } from '../../redux/words/slice';
import { selectFilters } from '../../redux/words/selectors';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import sprite from '/sprite.svg';

const FilterSearch = () => {
  const { register, handleSubmit } = useForm();
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const onSubmit = data => dispatch(setFilters({ ...data }));

  const handleDebouncedChange = useCallback(
    debounce(e => {
      onSubmit({ keyword: e.target.value });
    }, 300),
    [filters, dispatch]
  );

  return (
    <form className={css.searchWrap} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input
          placeholder="Find a word"
          {...register('keyword')}
          onChange={handleDebouncedChange}
        />
      </label>
      <svg className={css.arrowDown}>
        <use href={sprite + '#search'}></use>
      </svg>
    </form>
  );
};

export default FilterSearch;
