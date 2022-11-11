const ItemExpendListSwip = ({ expendItem }) => {
  return (
    <article className='w-full py-5 pl-5 md:p-5 flex flex-col justify-center items-start md:grid md:grid-cols-2 md:grid-rows-1 drop-shadow-2xl bg-secondaryColor md:text-center container-list-item-data'>
      <section>
        <label className='capitalize'>
          {expendItem.description_expenditure}
        </label>
      </section>

      <section>
        <label>
          Total: <span>${expendItem.cost_expenditure.toFixed(2)}</span>
        </label>
      </section>

      <section>
        <label>
          Cantidad: <span>{expendItem.amount_article}</span>{' '}
        </label>
      </section>
    </article>
  );
};

export default ItemExpendListSwip;
