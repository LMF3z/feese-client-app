import React from 'react';

const ItemOrdersListSwip = ({ orderItem }) => {
  return (
    <div
      className={`w-full py-5 pl-5 md:p-5 flex flex-col bg-secondaryColor text-white drop-shadow-2xl `}
    >
      <label
        className={`${orderItem.state_null ? 'line-through text-red-600' : ''}`}
      >
        N° de orden: {orderItem.num_control}
      </label>
      <label
        className={`${orderItem.state_null ? 'line-through text-red-600' : ''}`}
      >
        Total: <span>${orderItem.total_payment.toFixed(2)}</span>
      </label>
      <label
        className={`${orderItem.state_null ? 'line-through text-red-600' : ''}`}
      >
        Fecha: <span>{orderItem.createdAt}</span>
      </label>
    </div>
  );
};

export default ItemOrdersListSwip;
