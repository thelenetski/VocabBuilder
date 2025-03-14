import { useSelector } from 'react-redux';
import css from './ModalWellDone.module.css';
import { selectAnswers } from '../../redux/training/selectors';
import book from '../../assets/images/book.png';
import book2x from '../../assets/images/book@2x.png';

const ModalWellDone = () => {
  const answersResults = useSelector(selectAnswers);
  console.log(answersResults);
  return (
    <div className={css.wellDoneWrap}>
      <h4>Well done</h4>
      <div className={css.wellDoneResults}>
        <div className={css.correct}>
          <h6>Сorrect answers:</h6>
          <ul>
            {answersResults.map(item => {
              return item.isDone === true && <li key={item._id}>{item.en}</li>;
            })}
          </ul>
        </div>
        <div className={css.mistakes}>
          <h6>Mistakes:</h6>
          <ul>
            {answersResults.map(item => {
              return item.isDone === false && <li key={item._id}>{item.en}</li>;
            })}
          </ul>
        </div>
        <div className={css.bookImg}>
          <img
            src={book}
            srcSet={`${book} 1x, ${book2x} 2x`}
            alt="book illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWellDone;
