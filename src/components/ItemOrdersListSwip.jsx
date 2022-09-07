import React from 'react';

const ItemOrdersListSwip = ({ orderItem }) => {
  return (
    <div
      className={`w-full py-5 pl-5 md:p-5 bg-SelectColor text-white drop-shadow-2xl `}
    >
      <label
        className={`w-full flex justify-evenly items-center ${
          orderItem.state_null ? 'line-through text-red-600' : ''
        }`}
      >
        <span>{orderItem.num_control}</span>
        <span>-</span>
        <span>Total: ${orderItem.total_payment.toFixed(2)}</span>
        <span>-</span>
        <span>{orderItem.createdAt}</span>
      </label>
    </div>
  );
};

export default ItemOrdersListSwip;
