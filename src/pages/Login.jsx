import { Link } from '@mui/material';
import { useAuth } from '../hooks/auth';
import { ToastService } from '../services/ToastService';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const LoginPage = () => {
  const { login } = useAuth();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <Link
        className="w-[50%]"
        href={`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/google`}
      >
        <button className="w-full rounded-md bg-customBlue p-2 text-white hover:bg-primaryContainer">
          Sign In with SSO
        </button>
      </Link>
      <button
        className="w-[50%] rounded-md bg-customBlue p-2 text-white hover:bg-primaryContainer"
        onClick={async () => {
          console.log(login);
          dispatch(
            setUser({
              role: 'student',
              orgId: '1234567',
              name: 'Nguyễn Văn A',
              local: true,
            }),
          );
          ToastService.createToast({ title: 'login toast' });
        }}
      >
        Sign In As Student
      </button>
      <button
        className="w-[50%] rounded-md bg-customBlue p-2 text-white hover:bg-primaryContainer"
        onClick={async () => {
          console.log(login);
          dispatch(
            setUser({
              role: 'spso',
              orgId: '7654321',
              name: 'Trần Văn B',
              local: true,
            }),
          );
          ToastService.createToast({ title: 'login toast' });
        }}
      >
        Sign In As SPSO
      </button>
    </div>
  );
};

export default LoginPage;
