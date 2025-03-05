import { useDispatch } from 'react-redux';
import css from './WordPopoverMenu.module.css';
import sprite from '/sprite.svg';
import { openEditWord } from '../../redux/modal/slice';
import { deleteWord } from '../../redux/words/operations';
import toast from 'react-hot-toast';

const WordPopoverMenu = ({ id }) => {
  const dispatch = useDispatch();

  const handlerEdit = () => {
    dispatch(openEditWord(id));
  };

  const handlerDelete = () => {
    dispatch(deleteWord(id))
      .unwrap()
      .then(() => {
        toast.success('Word deleted successfully');
      });
  };

  return (
    <div className={css.wordPopMenuWrap}>
      <button onClick={handlerEdit}>
        <svg>
          <use href={sprite + '#pencilGreen'}></use>
        </svg>
        <span>Edit</span>
      </button>
      <button onClick={handlerDelete}>
        <svg>
          <use href={sprite + '#trashGreen'}></use>
        </svg>
        <span>Delete</span>
      </button>
    </div>
  );
};

export default WordPopoverMenu;
