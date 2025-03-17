import css from './Dashboard.module.css';
import FilterPanel from '../FilterPanel/FilterPanel';
import Statistics from '../Statistics/Statistics';
import AddWordBtn from '../AddWordBtn/AddWordBtn';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../redux/words/operations';
import { Link, useLocation } from 'react-router-dom';
import sprite from '/sprite.svg';

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={css.dashWrap}>
      <FilterPanel />
      <div className={css.statWrap}>
        <Statistics />
        <div className={css.actions}>
          {location.pathname === '/dictionary' && <AddWordBtn />}
          <Link className={css.trainLink} to="/training">
            <span>Train oneself</span>
            <svg className={css.trainLinkIcon}>
              <use href={sprite + '#arrow-right'}></use>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
