import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import css from './EditWordForm.module.css';
import sprite from '/sprite.svg';
import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash.debounce';
import { patchWord } from '../../redux/words/operations';
import { selectContentModal } from '../../redux/modal/selectors';

const schema = yup.object().shape({
  ua: yup
    .string()
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, 'Please enter a valid word')
    .required('Field is required'),
  en: yup
    .string()
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Please enter a valid word')
    .required('Field is required'),
});

const EditWordForm = () => {
  const dispatch = useDispatch();
  const modalContent = useSelector(selectContentModal);
  const [word, setWord] = useState({
    ua: modalContent?.data?.ua,
    en: modalContent?.data?.en,
    category: modalContent?.data?.category,
    isIrregular: modalContent?.data?.isIrregular,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ua: modalContent?.data?.ua, en: modalContent?.data?.en },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => setWord({ ...word, ...data });
  const addSubmit = () => {
    const init = async () => {
      try {
        await dispatch(patchWord({ id: modalContent.id, data: word }));
        await dispatch(closeModal());
      } catch (e) {
        toast.error(e.message);
      }
    };
    init();
  };

  const handleDebouncedChangeUa = useCallback(
    debounce(e => {
      onSubmit({ ua: String(e.target.value).toLowerCase().trim() });
    }, 300),
    [word]
  );

  const handleDebouncedChangeEn = useCallback(
    debounce(e => {
      onSubmit({ en: String(e.target.value).toLowerCase().trim() });
    }, 300),
    [word]
  );

  return (
    <div className={css.EditWordFormWrap}>
      <form className={css.formWrap} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.langWrap}>
          <div className={css.langTitle}>
            <svg className={css.flag}>
              <use href={sprite + '#flag-ua'}></use>
            </svg>
            <p className={css.regularTxt}>Ukrainian</p>
          </div>
          <label className={css.langInput}>
            <input
              placeholder="Слово"
              {...register('ua')}
              onChange={handleDebouncedChangeUa}
            />
          </label>
          {errors.ua && <p className={css.error}>{errors.ua.message}</p>}
        </div>
        <div className={css.langWrap}>
          <div className={css.langTitle}>
            <svg className={css.flag}>
              <use href={sprite + '#flag-uk'}></use>
            </svg>
            <p className={css.regularTxt}>English</p>
          </div>
          <label className={css.langInput}>
            <input
              placeholder="Word"
              {...register('en')}
              onChange={handleDebouncedChangeEn}
            />
          </label>
          {errors.en && <p className={css.error}>{errors.en.message}</p>}
        </div>
        <div className={css.controls}>
          <button
            type="submit"
            className={css.addBtn}
            onClick={() => handleSubmit(addSubmit)()}
          >
            Save
          </button>
          <button
            type="button"
            className={css.closeBtn}
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWordForm;
