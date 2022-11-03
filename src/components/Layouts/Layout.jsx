import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../Header';
import SideBar from '../SideBar';
import Footer from '../Footer';
import AuthProvider from '../hooks/auth/AuthProvider';

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <main>
        <Header />
        <SideBar />
        <div className='w-full min-h-screen md:px-10 z-0'>{children}</div>
        <Toaster position='top-right' />
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default Layout;
