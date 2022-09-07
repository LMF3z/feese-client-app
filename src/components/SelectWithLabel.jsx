import React from 'react';

const SelectWithLabel = (props) => {
  const { children, label, name, register, args } = props;

  return (
    <div className="flex flex-col justify-center items-start">
      <label className="text-xs">{label}</label>
      <select
        name={name}
        {...register(name)}
        className="input w-full"
        {...args}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectWithLabel;
