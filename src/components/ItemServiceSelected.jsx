import { useContext } from 'react';
import { ContextApp } from '../Store/ContextApp';
import types from '../Store/contextTypes';

const ItemServiceSelected = ({ service }) => {
  const { dispatch } = useContext(ContextApp);

  const handleChange = ({ target }) => {
    dispatch({
      type: types.CHANGE_AMOUNT_SERVICE,
      payload: { id: service.id, amount: target.value },
    });
  };

  return (
    <div
      className={`h-10 text-white rounded-lg flex justify-between items-center px-5 m-1 bg-secondaryColor`}
    >
      <label>{service.name_service}</label>
      <input
        type="number"
        step="1"
        min="1"
        className="w-10 text-base text-center outline-none bg-secondaryColor border border-white rounded-lg"
        value={service.amount}
        onChange={handleChange}
      />
    </div>
  );
};

export default ItemServiceSelected;
