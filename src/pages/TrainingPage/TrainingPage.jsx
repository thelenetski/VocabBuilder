import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import css from './TrainingPage.module.css';
import { useEffect } from 'react';
import TrainingRoom from '../../components/TrainingRoom/TrainingRoom';
import { getTasks } from '../../redux/training/operations';
import { selectTasks } from '../../redux/training/selectors';

const TrainingPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <Header />
      {tasks?.tasks && <TrainingRoom data={tasks} />}
    </div>
  );
};

export default TrainingPage;
