import { useDispatch } from 'react-redux';
import css from './AddWordBtn.module.css';
import sprite from '/sprite.svg';
import { openAddWord } from '../../redux/modal/slice';

const AddWordBtn = () => {
  const dispatch = useDispatch();
  return (
    <button className={css.addBtn} onClick={() => dispatch(openAddWord())}>
      <span>Add word</span>
      <svg className={css.plus}>
        <use href={sprite + '#plus'}></use>
      </svg>
    </button>
  );
};

export default AddWordBtn;
