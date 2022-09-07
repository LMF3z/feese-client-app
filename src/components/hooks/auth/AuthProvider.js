import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../../../utils/handleLocal';
import { routes } from '../../../constants/index';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(
    storage.getItemStorage('user_ES') || null
  );

  const handleLogged = (toggleLogged, data) => {
    switch (toggleLogged) {
      case true: {
        storage.setItemStorage('user_ES', data);
        setIsAuth(data);
        return;
      }

      case false: {
        storage.removeItemStorage('user_ES');
        setIsAuth(null);
        navigate(routes.login);
        return;
      }

      default:
        break;
    }
  };

  const buildSuccessResponse = (response) => {
    if (response.data?.access === false) {
      return handleLogged(false);
    }

    return {
      success: response.data.success,
      msg: response.data.msg,
      data: response.data.data,
    };
  };

  const contextAuthValues = { isAuth, handleLogged, buildSuccessResponse };

  return (
    <AuthContext.Provider value={contextAuthValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
