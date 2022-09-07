import React from 'react';

const ContainerModalContext = ({ children, title, onCloseModal, classes }) => {
  return (
    <div className="w-full h-screen fixed left-0 top-0 bg-black flex justify-center items-center px-5 fadeIn z-50">
      <div
        className={`w-full min-h-10vh max-h-full py-10 rounded-lg relative ${classes}`}
      >
        <span
          onClick={onCloseModal}
          className="w-6 h-6 text-center absolute top-1 right-1 cursor-pointer text-black bg-gray-300 hover:text-white rounded-lg"
        >
          X
        </span>
        <div className="w-full h-10 flex justify-center items-center relative">
          <h1>{title}</h1>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ContainerModalContext;
