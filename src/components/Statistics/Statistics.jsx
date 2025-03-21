import { useDispatch, useSelector } from 'react-redux';
import css from './Statistics.module.css';
import { selectAllWords, selectStats } from '../../redux/words/selectors';
import { useEffect } from 'react';
import { getStatistics } from '../../redux/words/operations';

const Statistics = () => {
  const stats = useSelector(selectStats);
  const words = useSelector(selectAllWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch, words.results]);

  return (
    <div className={css.statWrap}>
      <p className={css.title}>To study:</p>
      <p className={css.value}>{stats?.totalCount}</p>
    </div>
  );
};

export default Statistics;
