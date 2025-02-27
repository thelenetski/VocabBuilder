import { useDispatch, useSelector } from 'react-redux';
import css from './FilterCats.module.css';
import { setFilters } from '../../redux/words/slice';
import { selectFilters } from '../../redux/words/selectors';
import sprite from '/sprite.svg';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const FilterCats = ({ data, name }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [open, setOpen] = useState(false);
  const [catName, setCatName] = useState(null);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { isIrregular: 'false' },
  });

  const filterHandler = value => {
    if (value === 'verb') {
      dispatch(
        setFilters({
          ...filters,
          category: value,
          isIrregular: watch('isIrregular'),
        })
      );
    } else {
      const { isIrregular, ...filtersWithoutIrregular } = filters;
      dispatch(setFilters({ ...filtersWithoutIrregular, category: value }));
    }

    setCatName(value);
    setOpen(!open);
  };

  const onSubmit = data => dispatch(setFilters({ ...filters, ...data }));

  return (
    <>
      <div className={css.filterItemWrap}>
        <div className={css.filterList} onClick={() => setOpen(!open)}>
          <p>{!catName ? name : catName}</p>
          <svg className={css.arrowDown}>
            <use href={sprite + '#arrow-down'}></use>
          </svg>
        </div>
        {open && (
          <ul className={css.catList}>
            {data.map((item, index) => {
              return (
                <li key={index} onClick={() => filterHandler(item)}>
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {catName === 'verb' && (
        <form className={css.radioWrap} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              type="radio"
              value={false}
              {...register('isIrregular')}
              onChange={e =>
                handleSubmit(() => onSubmit({ isIrregular: e.target.value }))()
              }
            />
            Regular
          </label>
          <label>
            <input
              type="radio"
              value={true}
              {...register('isIrregular')}
              onChange={e =>
                handleSubmit(() => onSubmit({ isIrregular: e.target.value }))()
              }
            />
            Irregular
          </label>
        </form>
      )}
    </>
  );
};

export default FilterCats;
