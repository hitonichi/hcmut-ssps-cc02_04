import { Link, Outlet, useLocation } from 'react-router-dom';
import SideBar from '../SideBar';
import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    console.log('[INFO] current url:', location);
    return (
      <>
        Unauth.
        <Link to={`/login`}>To Login</Link>
      </>
    );
    // return <Navigate to={`/login`} />;
  }
  return (
    <div>
      <SideBar />
      <div className="pl-[80px]">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
