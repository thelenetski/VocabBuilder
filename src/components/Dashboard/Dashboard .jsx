import css from './Dashboard.module.css';
import FilterPanel from '../FilterPanel/FilterPanel';

const Dashboard = () => {
  return (
    <div className={css.dashWrap}>
      <FilterPanel />
    </div>
  );
};

export default Dashboard;
