import css from './AddWordModal.module.css';
import link from '../../assets/images/blood-report.png';
import link2x from '../../assets/images/blood-report@2x.png';
import { Link } from 'react-router-dom';

const AddWordModal = () => {
  return (
    <div className={css.addWordModalWrap}>
      <img
        src={link}
        srcSet={`${link} 1x, ${link2x} 2x`}
        alt="no tasks illustration"
      />
      <h4 className={css.title}>
        You don&apos;t have a single word to learn right now.{' '}
      </h4>
      <p className={css.regularTxt}>
        Please create or add a word to start the workout. We want to improve
        your vocabulary and develop your knowledge, so please share the words
        you are interested in adding to your study.
      </p>
      <div className={css.controls}>
        <Link to="/dictionary?addword=true" className={css.addWord}>
          Add word
        </Link>
        <Link to="/dictionary" className={css.closeBtn}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default AddWordModal;
