import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import css from './TrainingPage.module.css';
import { useEffect } from 'react';
import TrainingRoom from '../../components/TrainingRoom/TrainingRoom';
import { getTasks } from '../../redux/training/operations';
import {
  selectTasks,
  selectTasksLoading,
} from '../../redux/training/selectors';
import AddWordModal from '../../components/AddWordModal/AddWordModal';
import Loader from '../../components/Loader/Loader';
import { setSignOut } from '../../redux/auth/slice';

const TrainingPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectTasksLoading);

  useEffect(() => {
    try {
      dispatch(getTasks());
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <Header />
      {loading ? (
        <Loader />
      ) : tasks?.tasks && tasks?.tasks.length > 0 ? (
        <TrainingRoom data={tasks} />
      ) : (
        <AddWordModal />
      )}
    </div>
  );
};

export default TrainingPage;
