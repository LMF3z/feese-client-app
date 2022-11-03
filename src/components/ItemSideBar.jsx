import React from 'react';

const ItemSideBar = ({ classes, label, icon, handleClick, isPathMatch }) => {
  return (
    <div
      className={`w-full h-10 hover:ease-out hover:bg-buttonSuccessColor hover:text-black ${
        isPathMatch &&
        'bg-buttonSuccessColor text-black font-bold tracking-widest'
      } rounded-lg flex justify-start items-center space-x-2 pl-5 cursor-pointer ${classes}`}
      onClick={handleClick}
    >
      <span className='cursor-pointer'>{icon}</span>
      <span className='cursor-pointer'>{label}</span>
    </div>
  );
};

export default ItemSideBar;
