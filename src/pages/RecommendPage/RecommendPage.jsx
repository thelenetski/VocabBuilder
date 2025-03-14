import css from './RecommendPage.module.css';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard ';
import WordsTable from '../../components/WordsTable/WordsTable';
import WordsPagination from '../../components/WordsPagination/WordsPagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, selectWordsLoading } from '../../redux/words/selectors';
import { useEffect, useState } from 'react';
import { getAllWords } from '../../redux/words/operations';
import Loader from '../../components/Loader/Loader';
import { resetFilters } from '../../redux/words/slice';

const RecommendPage = () => {
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectWordsLoading);
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilters());
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    !firstLoad && dispatch(getAllWords({ ...filters }));
  }, [dispatch, filters]);

  return (
    <div className={css.wrapper}>
      <Header />
      <Dashboard />
      {loading ? (
        <Loader />
      ) : (
        <>
          <WordsTable />
          <WordsPagination />
        </>
      )}
    </div>
  );
};

export default RecommendPage;
