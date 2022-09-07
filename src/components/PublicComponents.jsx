import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../assets/Icons/Loading';
import { routes } from '../constants/index';
import useAuth from './hooks/auth/useAuth';

const PublicComponents = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuth) {
      navigate(routes.app);
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

export default PublicComponents;
