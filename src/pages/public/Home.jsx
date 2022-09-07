import { Navigate } from 'react-router-dom';
import { routes } from '../../constants';

const Home = () => {
  return (
    <div>
      <Navigate to={routes.app} replace={true} />
    </div>
  );
};

export default Home;
