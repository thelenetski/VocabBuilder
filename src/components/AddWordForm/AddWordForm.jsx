import { useCallback, useState } from 'react';
import css from './AddWordForm.module.css';
import sprite from '/sprite.svg';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../redux/words/selectors';
import debounce from 'lodash.debounce';
import { createWord } from '../../redux/words/operations';
import { closeModal } from '../../redux/modal/slice';

const AddWordForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [catName, setCatName] = useState(null);
  const [word, setWord] = useState({});
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { isIrregular: 'false' },
  });
  const categories = useSelector(selectCategories);

  const filterHandler = value => {
    console.log(value);
    if (value === 'verb') {
      setWord({
        ...word,
        category: value,
        isIrregular: watch('isIrregular'),
      });
    } else {
      const { isIrregular, ...wordWithoutIrregular } = word;
      setWord({
        ...wordWithoutIrregular,
        category: value,
      });
    }

    setCatName(value);
    setOpen(!open);
  };

  const onSubmit = data => setWord({ ...word, ...data });
  const addSubmit = () => {
    const init = async () => {
      try {
        await dispatch(createWord(word));
        await dispatch(closeModal());
      } catch (e) {
        console.log(e);
      }
    };
    init();
  };

  const handleDebouncedChangeUa = useCallback(
    debounce(e => {
      onSubmit({ ua: String(e.target.value).toLowerCase() });
    }, 300),
    [word]
  );

  const handleDebouncedChangeEn = useCallback(
    debounce(e => {
      onSubmit({ en: String(e.target.value).toLowerCase() });
    }, 300),
    [word]
  );

  return (
    <div className={css.AddWordFormWrap}>
      <h4 className={css.title}>Add word</h4>
      <p>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>
      <>
        <div className={css.filterItemWrap}>
          <div className={css.filterList} onClick={() => setOpen(!open)}>
            <p className={css.catTitle}>{!catName ? 'Categories' : catName}</p>
            <svg className={css.arrowDown}>
              <use href={sprite + '#arrow-down'}></use>
            </svg>
          </div>
          {open && (
            <ul className={css.catList}>
              {categories.map((item, index) => {
                return (
                  <li key={index} onClick={() => filterHandler(item)}>
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <form className={css.radioWrap} onSubmit={handleSubmit(onSubmit)}>
          {catName === 'verb' && (
            <>
              <label>
                <input
                  type="radio"
                  value="false"
                  {...register('isIrregular')}
                  onChange={e =>
                    handleSubmit(() =>
                      onSubmit({ isIrregular: e.target.value })
                    )()
                  }
                />
                Regular
              </label>
              <label>
                <input
                  type="radio"
                  value="true"
                  {...register('isIrregular')}
                  onChange={e =>
                    handleSubmit(() =>
                      onSubmit({ isIrregular: e.target.value })
                    )()
                  }
                />
                Irregular
              </label>
            </>
          )}
          <div className={css.langTitle}>
            <svg className={css.flag}>
              <use href={sprite + '#flag-ua'}></use>
            </svg>
            <p>Ukrainian</p>
          </div>
          <label className={css.langInput}>
            <input
              placeholder="Слово"
              {...register('ua')}
              onChange={handleDebouncedChangeUa}
            />
          </label>
          <div className={css.langTitle}>
            <svg className={css.flag}>
              <use href={sprite + '#flag-uk'}></use>
            </svg>
            <p>English</p>
          </div>
          <label className={css.langInput}>
            <input
              placeholder="Word"
              {...register('en')}
              onChange={handleDebouncedChangeEn}
            />
          </label>
          <div className={css.controls}>
            <button
              type="submit"
              className={css.addBtn}
              onClick={() => handleSubmit(addSubmit)()}
            >
              Add
            </button>
            <button
              type="button"
              className={css.closeBtn}
              onClick={() => dispatch(closeModal())}
            >
              Close
            </button>
          </div>
        </form>
      </>
    </div>
  );
};

export default AddWordForm;
