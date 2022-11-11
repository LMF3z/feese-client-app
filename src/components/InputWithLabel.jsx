const InputWithLabel = (props) => {
  const { name, label, type = 'text', placeholder, register } = props;

  if (type === 'number') {
    return (
      <div className='flex flex-col justify-center items-start'>
        <label className='text-xs'>{label}</label>
        <input
          type={type}
          step='0.01'
          min={'0.01'}
          className='input w-full'
          {...register(name)}
          autoComplete='off'
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-start'>
      <label className='text-xs'>{label}</label>
      <input
        type={type}
        className='input w-full'
        placeholder={placeholder}
        {...register(name)}
        autoComplete='off'
      />
    </div>
  );
};

export default InputWithLabel;
