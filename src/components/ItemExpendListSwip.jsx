// * w-full py-2 pl-5 md:p-5 bg-SelectColor drop-shadow-2xl

const ItemExpendListSwip = ({ expendItem }) => {
  return (
    <article className="w-full flex flex-col justify-center items-start md:grid md:grid-cols-2 md:grid-rows-1 py-5 pl-5 md:p-5 drop-shadow-2xl bg-SelectColor md:text-center">
      <section>
        <label>{expendItem.description_expenditure}</label>
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
