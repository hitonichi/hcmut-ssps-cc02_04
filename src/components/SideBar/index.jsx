import { useState } from 'react';
import logo from '../../assets/images/HCMUT_logo.png';
import logoutIcon from '../../assets/icon/logout.png';
import { NavLink } from 'react-router-dom';

import { DEFAULT_ROUTES } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { removeUser } from '../../store/slices/authSlice';

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const routes = DEFAULT_ROUTES[user.role];

  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };
  const linkStyle = `flex h-auto w-full cursor-pointer flex-row items-center gap-3 rounded-lg p-2 text-black hover:bg-primaryContainer hover:text-customBlue ${
    isExpanded ? '' : 'justify-center'
  }`;
  return (
    <div className="footer">
      <div
        className={`collapsed fixed z-30 flex h-screen flex-col bg-white ${
          isExpanded ? 'w-[360px]' : ' w-[80px]'
        } `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex h-[126px] w-full flex-col  p-2">
          <div
            className={`flex h-auto w-full flex-row items-center justify-start py-2 pl-4 pr-2`}
          >
            <img
              className={`${
                isExpanded ? '' : ''
              } aspect-square w-[36px] self-center object-cover`}
              src={logo}
              alt=""
            />
            <h2
              className={`ml-4 flex h-full w-full items-center text-start font-serif text-3xl uppercase  text-black ${
                isExpanded ? 'block' : ' hidden'
              }`}
            >
              SPSS
            </h2>
          </div>
          <div
            className={`flex h-auto w-full flex-col gap-1 py-2  ${
              isExpanded ? 'block' : ' hidden'
            }`}
          >
            <h3 className="ml-4 w-fit rounded-md  text-black  ">
              {user.role.toUpperCase()}
            </h3>
            <h3 className="ml-4 w-auto font-bold uppercase text-black">
              {`${user.name} - ${user.orgId}`}
            </h3>
          </div>
        </div>

        <div className="flex h-auto w-full px-4  ">
          <div className="flex h-full  w-full flex-col gap-4 border-y-2  border-black py-2 font-bold ">
            {routes.map(({ path, label, icon }) => (
              // <div
              // className="flex h-auto w-full cursor-pointer flex-row items-center gap-3 rounded-lg p-2 text-black hover:bg-primaryContainer hover:text-customBlue"
              // >
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-primaryContainer text-customBlue ' + linkStyle
                    : linkStyle
                }
              >
                <img
                  className="h-[24px] w-[24px] object-cover p-1"
                  alt=""
                  src={icon}
                ></img>
                <h2
                  className={`h-full w-auto text-base  ${
                    isExpanded ? 'block' : ' hidden'
                  } `}
                >
                  {label}
                </h2>
              </NavLink>
              // </div>
            ))}
          </div>
        </div>

        <div className="h-auto w-full px-4 ">
          <Link
            underline="none"
            href={
              user.local
                ? '#'
                : `${process.env.REACT_APP_BACKEND_BASE_URL}/api/logout`
            }
          >
            <div
              onClick={() => {
                if (user.local) dispatch(removeUser());
              }}
              className={`mt-2 flex h-auto w-full cursor-pointer flex-row items-center gap-3 rounded-lg p-2 text-black hover:bg-primaryContainer hover:text-customBlue ${
                isExpanded ? '' : 'justify-center'
              }`}
            >
              <img
                className="h-[24px] w-[24px] object-cover p-1"
                alt=""
                src={logoutIcon}
              ></img>
              <h2
                className={`h-full w-auto text-base font-bold ${
                  isExpanded ? 'block' : ' hidden'
                }`}
              >
                Đăng xuất
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
