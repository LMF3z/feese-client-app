import React from 'react';

const EnvelopIcon = ({ color, classes, handleClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="133.333"
      height="133.333"
      version="1"
      viewBox="0 0 100 100"
      className={classes}
      onClick={handleClick}
      fill={color || 'currentColor'}
    >
      <path
        d="M122 823c-7-3-19-18-27-33-19-37-22-538-3-573 24-46 24-46 408-46s384 0 408 46c17 30 17 536 0 566-24 46-24 46-408 46-201 0-371-3-378-6zm235-193l143-89 144 90c80 50 153 89 163 87 11-2 19-13 21-28 2-22-14-36-153-122-86-54-165-98-175-98s-89 44-174 98c-120 75-156 102-156 118 0 54 25 47 187-56z"
        transform="matrix(.1 0 0 -.1 0 100)"
      ></path>
    </svg>
  );
};

export default EnvelopIcon;
