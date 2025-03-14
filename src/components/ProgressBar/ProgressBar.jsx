import { Circle } from 'rc-progress';
import css from './ProgressBar.module.css';

const ProgressBar = ({ percent }) => {
  return (
    <div className={css.progressBarWrap}>
      <div className={css.circleWrap}>
        <Circle
          percent={percent}
          strokeWidth={12}
          strokeColor="var(--main-color)"
          trailWidth={12}
          trailColor="#ffffff"
        />
        <div className={css.circlePercent}>{percent}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
