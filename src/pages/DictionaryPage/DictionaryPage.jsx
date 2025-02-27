import css from './DictionaryPage.module.css';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard ';

const DictionaryPage = () => {
  return (
    <div className={css.wrapper}>
      <Header />
      <Dashboard />
    </div>
  );
};

export default DictionaryPage;
