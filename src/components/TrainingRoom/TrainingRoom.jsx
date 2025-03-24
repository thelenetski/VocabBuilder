import { useForm } from 'react-hook-form';
import css from './TrainingRoom.module.css';
import sprite from '/sprite.svg';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAnswers } from '../../redux/training/operations';
import { openWellDone } from '../../redux/modal/slice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schemaUA = yup.object().shape({
  translate: yup
    .string()
    .transform(value => (value === '' ? null : value))
    .nullable()
    .notRequired()
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      'Please enter a valid word'
    ),
});

const schemaEN = yup.object().shape({
  translate: yup
    .string()
    .transform(value => (value === '' ? null : value))
    .nullable()
    .notRequired()
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Please enter a valid word'),
});

const TrainingRoom = ({ data }) => {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);
  const [currentTask, setCurrentTask] = useState(data.tasks[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [save, setSave] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentTask.task === 'ua' ? schemaUA : schemaEN),
  });

  const nextHandler = async (notLast = true) => {
    const isValid = await trigger('translate');

    if (!isValid) return;

    if (watch('translate') !== '') {
      setAnswers(
        answers.concat({
          ...data.tasks[currentIndex],
          ua:
            currentTask.task === 'ua'
              ? watch('translate').toString().toLowerCase().trim()
              : currentTask.ua,
          en:
            currentTask.task === 'en'
              ? watch('translate').toString().toLowerCase().trim()
              : currentTask.en,
        })
      );
    }
    if (notLast) {
      setValue('translate', '');
      setCurrentIndex(currentIndex + 1);
      setCurrentTask(data.tasks[currentIndex + 1]);
    }
  };

  const onSubmit = data => {
    if (!data.translate?.trim()) {
      setError('translate', {
        type: 'manual',
        message: 'Field is required',
      });
      return;
    }

    nextHandler(false);
    setSave(true);
  };

  const percent = Math.round((currentIndex / data.tasks.length) * 100);

  useEffect(() => {
    if (answers.length > 0 && save === true) {
      dispatch(sendAnswers(answers))
        .unwrap()
        .then(() => dispatch(openWellDone()));
    }
  }, [dispatch, answers]);

  return (
    <>
      <ProgressBar percent={percent} />
      <div className={css.roomWrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.roomForm}>
            <div className={css.roomTask}>
              <div className={css.roomTaskPadding}>
                <div className={css.roomTaskLeft}>
                  <h5 className={css.roomTitle}>Введіть переклад</h5>
                  <label className={css.langInput}>
                    <input {...register('translate')} />
                  </label>
                  {errors.translate && (
                    <p className={css.error}>{errors.translate.message}</p>
                  )}
                  <div className={css.roomFormfooter}>
                    {currentIndex + 1 !== data.tasks.length ? (
                      <button
                        className={css.nextBtn}
                        type="button"
                        onClick={nextHandler}
                      >
                        Next
                        <svg className={css.arrow}>
                          <use href={sprite + '#arrow-right'}></use>
                        </svg>
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div className={css.roomFormFooterLang}>
                  <div className={css.roomLang}>
                    {currentTask.task === 'ua' ? (
                      <svg className={css.flag}>
                        <use href={sprite + '#flag-ua'}></use>
                      </svg>
                    ) : (
                      <svg className={css.flag}>
                        <use href={sprite + '#flag-uk'}></use>
                      </svg>
                    )}
                    <p className={css.regularTxt}>
                      {currentTask.task === 'ua' ? 'Ukrainian' : 'English'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={css.roomTask}>
              <div className={css.roomTaskPadding}>
                <p className={css.taskText}>
                  {(currentTask && currentTask?.en) || currentTask?.ua}
                </p>
                <div className={css.roomFormfooter}>
                  <div></div>
                  <div className={css.roomFormFooterLang}>
                    <div className={css.roomLang}>
                      {currentTask.task === 'ua' ? (
                        <svg className={css.flag}>
                          <use href={sprite + '#flag-uk'}></use>
                        </svg>
                      ) : (
                        <svg className={css.flag}>
                          <use href={sprite + '#flag-ua'}></use>
                        </svg>
                      )}
                      <p className={css.regularTxt}>
                        {currentTask.task === 'en' ? 'Ukrainian' : 'English'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css.controls}>
            <button type="submit" className={css.addBtn}>
              Save
            </button>
            <Link to="/dictionary" className={css.closeBtn}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default TrainingRoom;
