import css from './DictionaryPage.module.css';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard ';
import WordsTable from '../../components/WordsTable/WordsTable';
import WordsPagination from '../../components/WordsPagination/WordsPagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllWords,
  selectFilters,
  selectWordsLoading,
} from '../../redux/words/selectors';
import { useEffect, useState } from 'react';
import { getOwnWords } from '../../redux/words/operations';
import Loader from '../../components/Loader/Loader';
import { resetFilters } from '../../redux/words/slice';
import { useSearchParams } from 'react-router-dom';
import { openAddWord } from '../../redux/modal/slice';
import { setSignOut } from '../../redux/auth/slice';

const DictionaryPage = () => {
  const filters = useSelector(selectFilters);
  const { results } = useSelector(selectAllWords);
  const loading = useSelector(selectWordsLoading);
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchParams] = useSearchParams();
  const addWord = searchParams.get('addword');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilters());
    setFirstLoad(false);
    try {
      addWord && dispatch(openAddWord());
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch, addWord]);

  useEffect(() => {
    try {
      !firstLoad && dispatch(getOwnWords({ ...filters }));
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch, filters]);

  return (
    <div className={css.wrapper}>
      <Header />
      <Dashboard />
      {loading ? (
        <Loader />
      ) : (
        <>
          {results?.length > 0 ? (
            <WordsTable />
          ) : (
            <p className={css.noWordsTxt}>
              {!filters?.keyword || filters.keyword === ''
                ? 'Your dictionary is empty :('
                : 'No words found'}
            </p>
          )}
          <WordsPagination />
        </>
      )}
    </div>
  );
};

export default DictionaryPage;
