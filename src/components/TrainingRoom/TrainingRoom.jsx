import { useForm } from 'react-hook-form';
import css from './TrainingRoom.module.css';
import sprite from '/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAnswers } from '../../redux/training/operations';
import { openWellDone } from '../../redux/modal/slice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { Link } from 'react-router-dom';

const TrainingRoom = ({ data }) => {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);
  const { register, watch, setValue, handleSubmit } = useForm({});
  // const tasksUA = data && data?.tasks?.filter(item => item.task === 'en');
  const tasksEN = data && data?.tasks?.filter(item => item.task === 'ua');
  const [currentTask, setCurrentTask] = useState(tasksEN[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextHandler = () => {
    if (watch('ua') !== '') {
      setAnswers(
        answers.concat({
          ...tasksEN[currentIndex],
          ua: watch('ua').toString().toLowerCase().trim(),
          en: currentTask.en,
        })
      );
    }

    setValue('ua', '');
    setCurrentIndex(currentIndex + 1);
    setCurrentTask(tasksEN[currentIndex + 1]);
  };

  const onSubmit = data => {
    data !== '' &&
      setAnswers(
        answers.concat({
          ...tasksEN[currentIndex],
          ua: watch('ua').toString().toLowerCase().trim(),
          en: currentTask.en,
        })
      ),
      dispatch(sendAnswers(answers))
        .unwrap()
        .then(() => dispatch(openWellDone()));
  };

  const percent = Math.round((currentIndex / tasksEN.length) * 100);

  console.log(tasksEN);

  return (
    <>
      <ProgressBar percent={percent} />
      <div className={css.roomWrap}>
        <form className={css.roomForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.roomTask}>
            <h5 className={css.roomTitle}>Введіть переклад</h5>
            <label className={css.langInput}>
              <input {...register('ua')} />
            </label>
            <div className={css.roomFormfooter}>
              {currentIndex + 1 !== tasksEN.length ? (
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
              <div className={css.roomFormFooterLang}>
                <svg className={css.flag}>
                  <use href={sprite + '#flag-ua'}></use>
                </svg>
                <p className={css.regularTxt}>Ukrainian</p>
              </div>
            </div>
          </div>

          <div className={css.roomTask}>
            <p className={css.taskText}>{currentTask && currentTask.en}</p>
            <div className={css.roomFormfooter}>
              <div></div>
              <div className={css.roomFormFooterLang}>
                <svg className={css.flag}>
                  <use href={sprite + '#flag-uk'}></use>
                </svg>
                <p className={css.regularTxt}>English</p>
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
