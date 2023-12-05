import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import { useSelector } from 'react-redux';

const HomeLayout = () => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  if (user) {
    console.log('[INFO] Homelayout:', location);
    return <Navigate to="/dashboard/profile" />;
  }

  return (
    <div>
      <NavBar
        pages={[
          { label: 'Home', path: '/' },
          { label: 'Sign In', path: '/login' },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
