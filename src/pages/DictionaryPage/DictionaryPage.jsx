import css from './DictionaryPage.module.css';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard ';
import WordsTable from '../../components/WordsTable/WordsTable';
import WordsPagination from '../../components/WordsPagination/WordsPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, selectWordsLoading } from '../../redux/words/selectors';
import { useEffect } from 'react';
import { getOwnWords } from '../../redux/words/operations';
import Loader from '../../components/Loader/Loader';

const DictionaryPage = () => {
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectWordsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnWords({ ...filters }));
  }, [dispatch, filters]);

  return (
    <div className={css.wrapper}>
      <Header />
      <Dashboard />
      {loading ? <Loader /> : <WordsTable />}
      <WordsPagination />
    </div>
  );
};

export default DictionaryPage;
