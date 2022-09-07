import React from 'react';

const PapperPlane = ({ color, classes, handleClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-5 h-5 ${classes}`}
      onClick={handleClick}
    >
      <path fill={color || 'currentColor'} d="M0 0h24v24H0z"></path>
      <path
        fill={color || 'currentColor'}
        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
      ></path>
    </svg>
  );
};

export default PapperPlane;
