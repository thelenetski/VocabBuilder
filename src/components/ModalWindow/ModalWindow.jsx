import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import { selectIsOpenModal } from '../../redux/modal/selectors';
import styles from './ModalWindow.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ModalWindow = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const location = useLocation();
  const navigate = useNavigate();

  const closeModalHandler = () => {
    if (location.pathname === '/training') {
      navigate('/dictionary');
    }
    dispatch(closeModal());
  };

  useEffect(() => {
    isOpen
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [isOpen]);

  return createPortal(
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModalHandler}
        className={styles.modalWrapper}
        ariaHideApp={false}
        overlayClassName={styles.modalOverlay}
      >
        <button className={styles.btnClose} onClick={closeModalHandler}>
          <svg>
            <use href="/sprite.svg#close"></use>
          </svg>
        </button>
        <div className={styles.modalContent}>{children}</div>
      </Modal>
    </>,
    document.getElementById('modal-root')
  );
};

export default ModalWindow;
