import css from './FilterPanel.module.css';
import FilterCats from '../FilterCats/FilterCats';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from '../../redux/words/selectors';
import { useEffect } from 'react';
import { getOwnWords } from '../../redux/words/operations';
import FilterSearch from '../FilterSearch/FilterSearch';

const FilterPanel = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnWords({ ...filters }));
  }, [dispatch, filters]);

  return (
    <div className={css.filterWrap}>
      <div className={css.filterBox}>
        <FilterSearch />
        <FilterCats name={'Categories'} />
      </div>
    </div>
  );
};

export default FilterPanel;
