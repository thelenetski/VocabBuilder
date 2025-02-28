import { useSelector } from 'react-redux';
import css from './Statistics.module.css';
import { selectAllWords } from '../../redux/words/selectors';

const Statistics = () => {
  const words = useSelector(selectAllWords);
  console.log(words);

  return (
    <div className={css.statWrap}>
      <p className={css.title}>To study:</p>
      <p className={css.value}>{words?.results?.length}</p>
    </div>
  );
};

export default Statistics;
