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

const MainLayout = ({ children }) => {
  const type = useSelector(selectTypeModal);

  return (
    <main>
      <div className="container">
        <div className="pageContentWrapper">
          <Toaster position="top-center" />
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <ModalWindow>
            {type === modalTypes.addWord && <AddWordForm />}
            {type === modalTypes.editWord && <EditWordForm />}
            {type === modalTypes.welldone && <ModalWellDone />}
          </ModalWindow>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
