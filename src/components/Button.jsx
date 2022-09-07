const Button = (props) => {
  const {
    label,
    classes,
    type = 'submit',
    handleClick = () => {},
    disabled = false,
  } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick}
      className={`w-full min-h-8 bg-buttonSuccessColor text-black text-xl rounded-full hover:bg-green-600 flex justify-center items-center p-2 z-0 ${classes}`}
    >
      {label}
    </button>
  );
};

export default Button;
