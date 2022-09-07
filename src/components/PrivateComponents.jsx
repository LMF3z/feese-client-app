import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from './hooks/auth/useAuth';
import { routes } from '../constants/index';
import Loading from '../assets/Icons/Loading';

const PrivateComponents = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      navigate(routes.login);
    } else {
      setIsLoading(false);
    }
  }, [isAuth]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateComponents;
