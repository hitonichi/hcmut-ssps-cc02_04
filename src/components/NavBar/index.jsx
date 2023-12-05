import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { removeUser } from '../../store/slices/authSlice';

const NavBar = ({ pages }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // TODO: change it into the correct layout
  const linkStyle = 'px-2 rounded font-bold';
  return (
    <nav className="flex items-center justify-center gap-4 border bg-customBlue py-2 text-white">
      {pages.map((page) => (
        <NavLink
          key={page.label}
          to={page.path}
          className={({ isActive }) =>
            isActive ? 'bg-slate-200 text-black ' + linkStyle : linkStyle
          }
        >
          {page.label}
        </NavLink>
      ))}
      {!!user && (
        <Link
          underline="none"
          href={
            user.local
              ? '#'
              : `${process.env.REACT_APP_BACKEND_BASE_URL}/api/logout`
          }
        >
          <button
            onClick={() => {
              if (user.local) dispatch(removeUser());
            }}
          >
            Đăng xuất
          </button>
        </Link>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  pages: PropTypes.array,
};

export default NavBar;
