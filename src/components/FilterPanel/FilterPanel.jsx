import css from './FilterPanel.module.css';
import FilterCats from '../FilterCats/FilterCats';
import FilterSearch from '../FilterSearch/FilterSearch';

const FilterPanel = () => {
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
