import { useContext } from 'react';
import CheckedIcon from '../assets/Icons/CheckedIcon';
import { colors } from '../constants';
import { ContextApp } from '../Store/ContextApp';
import types from '../Store/contextTypes';

const ItemEmployeeAsig = ({ employee }) => {
  const { state, dispatch } = useContext(ContextApp);
  const { employees_selected } = state;

  const isSelected = employees_selected.find((e) => e.id === employee.id);

  const HandleSelectEmployee = () => {
    dispatch({ type: types.ADD_EMPLOYEE_ORDER, payload: employee });
  };

  return (
    <div
      onClick={HandleSelectEmployee}
      className={`w-full h-10 flex justify-center items-center bg-secondaryColor rounded-lg ${isSelected}`}
    >
      <div className="w-4/5 flex justify-center items-center">
        {employee.name_employee}
      </div>
      <div className="w-1/5">
        {isSelected && (
          <CheckedIcon classes="w-5 h-5" color={colors.buttonSuccessColor} />
        )}
      </div>
    </div>
  );
};

export default ItemEmployeeAsig;
