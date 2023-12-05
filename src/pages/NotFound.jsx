import { NavLink } from 'react-router-dom';
import notfound from '../assets/images/notfound.png';
import arrow from '../assets/images/right-arrow.png';
const NotFound = () => {
  return (
    <div className="flex h-screen w-screen justify-center overflow-hidden bg-black  font-mono">
      <div className="flex h-full  w-[70%] flex-col items-center justify-center gap-4">
        <img className="h-[300px] w-[500px] object-cover" src={notfound}></img>
        <h2 className="text-center text-2xl text-white">
          Trang bạn yêu cầu không tồn tại
        </h2>
        <NavLink to="/dashboard/profile">
          <div
            className="flex h-auto w-[230px] flex-row  items-center justify-between rounded-2xl bg-white px-4 py-2"
            href="/"
          >
            <h2 className="font-bold text-black">Quay lại trang chủ</h2>
            <img className="h-[30px] w-[30px] object-cover" src={arrow}></img>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
