import React from 'react';
import PapperPlane from '../assets/Icons/PapperPlane';

const ButtonWithIcon = ({ classes, type = 'submit' }) => {
  return (
    <button type={type} className={`button ${classes}`}>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <PapperPlane />
        </div>
      </div>
      <span>Send</span>
    </button>
  );
};

export default ButtonWithIcon;
