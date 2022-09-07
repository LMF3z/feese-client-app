import { createContext, useReducer } from 'react';
import calcFunctions from '../utils/calc';
import types from './contextTypes';

export const ContextApp = createContext();

const INITIAL_STATE = {
  // layout
  openSideBar: false,
  // data
  client_selected: {},
  services_selected: [],
  employees_selected: [],
  total_to_pay_order: 0,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    // * layouts
    case types.TOGGLE_SIDE_BAR: {
      return {
        ...state,
        openSideBar: payload,
      };
    }

    // * data
    case types.ADD_CLIENT_ORDER: {
      return {
        ...state,
        client_selected: payload,
      };
    }

    case types.ADD_SERVICE_ORDER: {
      payload.amount = 1;

      const toggleSelectedServices = state.services_selected.find(
        (s) => s.id === payload.id
      )
        ? state.services_selected.filter((s) => s.id !== payload.id)
        : [...state.services_selected, payload];

      return {
        ...state,
        services_selected: toggleSelectedServices,
        total_to_pay_order: calcFunctions.addValuesOfObjects(
          toggleSelectedServices,
          'price_service',
          'amount'
        ),
      };
    }

    case types.ADD_EMPLOYEE_ORDER: {
      return {
        ...state,
        employees_selected: [payload],
      };
    }

    case types.CHANGE_AMOUNT_SERVICE: {
      return {
        ...state,
        services_selected: state.services_selected.reduce((acc, el) => {
          if (el.id === payload.id) el.amount = payload.amount;
          acc.push(el);
          return acc;
        }, []),
        total_to_pay_order: calcFunctions.addValuesOfObjects(
          state.services_selected,
          'price_service',
          'amount'
        ),
      };
    }

    case types.RESET_DATA_TO_ORDER: {
      return {
        ...state,
        client_selected: {},
        services_selected: [],
        employees_selected: [],
        total_to_pay_order: 0,
      };
    }

    default:
      return { ...state };
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      {children}
    </ContextApp.Provider>
  );
};

export default Store;
