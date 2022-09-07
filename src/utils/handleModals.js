import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import Loading from '../assets/Icons/Loading';

const handleModalAssignmentOrder = (onRoot = false) => {
  const ContainerModal = lazy(() => import('../components/ContainerModal'));
  const ModalAssignmentsOrder = lazy(() =>
    import('../components/ModalAssignmentsOrder')
  );

  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal';

  onRoot
    ? document.querySelector('#root').appendChild(modalDiv)
    : document.body.appendChild(modalDiv);

  const root = createRoot(modalDiv);
  root.render(
    <Suspense
      fallback={
        <div className="w-full h-screen fixed top-0 bg-white">
          <Loading />
        </div>
      }
    >
      <ContainerModal
        root={root}
        idModal={'modal'}
        title={'Asignar a un empleado'}
      >
        <ModalAssignmentsOrder />
      </ContainerModal>
    </Suspense>
  );
};

const handleModals = { handleModalAssignmentOrder };

export default handleModals;
