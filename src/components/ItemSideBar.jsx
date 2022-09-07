import React from 'react';

const ItemSideBar = ({ classes, label, icon, handleClick }) => {
  return (
    <div
      className={`w-full h-10 hover:ease-out hover:bg-SelectColor hover:text-black rounded-lg flex justify-start items-center space-x-2 pl-5 cursor-pointer ${classes}`}
      onClick={handleClick}
    >
      <label className="cursor-pointer">{icon}</label>
      <label className="cursor-pointer">{label}</label>
    </div>
  );
};

export default ItemSideBar;
