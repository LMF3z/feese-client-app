import { useContext } from 'react';
import { ContextApp } from '../Store/ContextApp';
import CheckedIcon from '../assets/Icons/CheckedIcon';
import types from '../Store/contextTypes';
import { colors } from '../constants';

const ItemServiceAsig = ({ service }) => {
  const { state, dispatch } = useContext(ContextApp);

  const isSelected = `${
    state.services_selected.find((s) => +s.id === +service.id)
      ? 'bg-custom_bg text-white'
      : ''
  }`;

  const selectService = () => {
    dispatch({ type: types.ADD_SERVICE_ORDER, payload: service });
  };

  return (
    <div
      onClick={selectService}
      className={`w-full h-10 rounded-lg flex items-center bg-secondaryColor`}
    >
      <div className="w-4/5 flex justify-center items-center">
        {service.name_service}
      </div>
      <div className="w-1/5">
        {isSelected && (
          <CheckedIcon classes="w-5 h-5" color={colors.buttonSuccessColor} />
        )}
      </div>
    </div>
  );
};

export default ItemServiceAsig;
