import { useRef } from 'react';

const ContainerModal = ({ children, root, title, idModal }) => {
  const refModal = useRef(null);

  const callback = (e) => {
    root.unmount();
    document.querySelector(`#${idModal}`).remove();
    refModal.current.removeEventListener('animationend', callback);
  };

  const onCloseModal = () => {
    refModal.current.classList.add('fadeOut');
    refModal.current.addEventListener('animationend', callback, { once: true });
  };

  return (
    <div
      ref={refModal}
      className='w-full h-screen fixed top-0 bg-black flex justify-center items-center p-5 fadeIn'
    >
      <div className='w-full h-full md:w-3/4 md:h-90vh text-black rounded-lg bg-secondaryColor'>
        <div className='w-full h-10 flex justify-center items-center relative'>
          <label>{title}</label>
          <span
            onClick={onCloseModal}
            className='w-6 h-6 text-center absolute top-1 right-1 cursor-pointer text-black bg-gray-300 hover:text-white rounded-lg'
          >
            X
          </span>
        </div>
        <div className='p-5 bg-secondaryColor'>{children}</div>
      </div>
    </div>
  );
};

export default ContainerModal;
