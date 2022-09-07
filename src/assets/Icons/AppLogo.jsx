import React from 'react';

const AppLogo = ({ color, classes, handleClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1706.667"
      height="1706.667"
      version="1"
      viewBox="0 0 1280 1280"
      className={`w-5 h-5 ${classes}`}
      fill={color || 'currentColor'}
      onClick={handleClick}
    >
      <path
        d="M0 6400V0h12800v12800H0V6400z"
        transform="matrix(.1 0 0 -.1 0 1280)"
      ></path>
    </svg>
  );
};

export default AppLogo;
