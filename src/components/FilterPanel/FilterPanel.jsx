import css from './FilterPanel.module.css';
import FilterCats from '../FilterCats/FilterCats';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllWords,
  selectCategories,
  selectFilters,
} from '../../redux/words/selectors';
import { useEffect } from 'react';
import { getAllWords, getCategories } from '../../redux/words/operations';
import FilterSearch from '../FilterSearch/FilterSearch';

const FilterPanel = () => {
  const categories = useSelector(selectCategories);
  const filters = useSelector(selectFilters);
  const words = useSelector(selectAllWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllWords({ ...filters }));
  }, [dispatch, filters]);

  console.log(filters, words);

  return (
    <div className={css.filterWrap}>
      <div className={css.filterBox}>
        <FilterSearch />
        <FilterCats data={categories} name={'Categories'} />
      </div>
    </div>
  );
};

export default FilterPanel;
