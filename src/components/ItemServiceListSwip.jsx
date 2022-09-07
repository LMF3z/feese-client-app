import React from 'react';

const ItemServiceListSwip = ({ serviceItem }) => {
  return (
    <article className="w-full flex flex-col justify-center items-start md:grid md:grid-cols-2 md:grid-rows-1 py-5 pl-5 md:p-5 drop-shadow-2xl bg-SelectColor">
      <section className="md:text-center">
        <label className="capitalize">Servicio:</label>{' '}
        <span>{serviceItem.name_service}</span>
      </section>
      <section className="md:text-center">
        <label className="capitalize">Costo:</label>{' '}
        <span>${serviceItem.price_service.toFixed(2)}</span>
      </section>
    </article>
  );
};

export default ItemServiceListSwip;
