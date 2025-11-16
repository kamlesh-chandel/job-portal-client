import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
