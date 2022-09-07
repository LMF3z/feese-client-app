import React from 'react';

const ButtonForPagination = ({ children }) => {
  return (
    <div className="w-8 h-8 rounded-full bg-buttonSuccessColor text-black flex justify-center items-center">
      <p>{children}</p>
    </div>
  );
};

export default ButtonForPagination;
