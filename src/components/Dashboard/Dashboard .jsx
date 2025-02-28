import css from './Dashboard.module.css';
import FilterPanel from '../FilterPanel/FilterPanel';
import Statistics from '../Statistics/Statistics';
import AddWordBtn from '../AddWordBtn/AddWordBtn';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../redux/words/operations';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={css.dashWrap}>
      <FilterPanel />
      <Statistics />
      <div className={css.actions}>
        <AddWordBtn />
      </div>
    </div>
  );
};

export default Dashboard;
