import css from './DictionaryPage.module.css';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard ';
import WordsTable from '../../components/WordsTable/WordsTable';

const DictionaryPage = () => {
  return (
    <div className={css.wrapper}>
      <Header />
      <Dashboard />
      <WordsTable />
    </div>
  );
};

export default DictionaryPage;
