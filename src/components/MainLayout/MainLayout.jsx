import Loader from '../Loader/Loader';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSelector } from 'react-redux';
import { selectTypeModal } from '../../redux/modal/selectors';
import { modalTypes } from '../../redux/modal/slice';
import AddWordForm from '../AddWordForm/AddWordForm';
import EditWordForm from '../EditWordForm/EditWordForm';
import ModalWellDone from '../ModalWellDone/ModalWellDone';
import bg from '../../assets/images/bg.png';
import css from './MainLayout.module.css';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const MainLayout = ({ children }) => {
  const type = useSelector(selectTypeModal);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <main className={css.mainWrapper}>
      <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>{children}</Suspense>
      <ModalWindow>
        {type === modalTypes.addWord && <AddWordForm />}
        {type === modalTypes.editWord && <EditWordForm />}
        {type === modalTypes.welldone && <ModalWellDone />}
      </ModalWindow>
      {(location.pathname === '/login' || location.pathname === '/register') &&
        !isMobile && (
          <div className={css.bg}>
            <img src={bg} alt="bg illustration" />
          </div>
        )}
    </main>
  );
};

export default MainLayout;
