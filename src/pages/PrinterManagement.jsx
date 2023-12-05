import 'dayjs/locale/en';
import PrinterTable from '../components/PrinterMan/printerTable';
import { Branch } from '../components/Records/inputForm';
import { Build } from '../components/Records/inputForm';
import { StatusState } from '../components/Records/inputForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BasicModal from '../components/PrinterMan/modal';
const PrinterManangement = () => {
  const [status, setStatus] = useState(null);
  const [building, setBuilding] = useState(null);
  const [branch, setBranch] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultStatus = searchParams.get('Status') || null;
  const defaultBuilding = searchParams.get('Building') || null;
  const defaultBranch = searchParams.get('Branch') || null;
  const handleClick = () => {
    console.log('Status: ', defaultStatus);
    console.log('Building: ', defaultBuilding);
    console.log('Branch: ', defaultBranch);
    setBranch(defaultBranch);
    setBuilding(defaultBuilding);
    setStatus(defaultStatus);
  };

  const widthValue = `calc(100vw - 80px)`;

  const [resetCounter, setResetCounter] = useState(0);
  const [reset, setResetState] = useState(false);

  const handleReset = () => {
    setResetCounter((prev) => prev + 1);
    setBranch(null);
    setBuilding(null);
    setStatus(null);
    navigate(location.pathname);
  };
  return (
    <div
      style={{ width: widthValue }}
      className="flex h-screen flex-col gap-[30px] overflow-hidden bg-primaryContainer py-[50px] pl-[40px] pr-[40px]"
    >
      <div className="flex h-[60px] w-full flex-row justify-between ">
        <h2 className="roboto ml-8 w-auto text-5xl font-bold text-black">
          Quản lí máy in{' '}
        </h2>
      </div>
      <div className="flex w-full flex-row items-start justify-between">
        <div className="grid w-[30%] min-w-[500px]  grid-cols-[40%_40%_20%] flex-col items-center justify-center gap-x-2  rounded-lg bg-white px-5 py-4 ">
          <div className="flex h-full max-w-[200px] flex-col gap-2">
            <Branch setResetState={setResetState} resetCounter={resetCounter} />
            <Build setResetState={setResetState} resetCounter={resetCounter} />
          </div>

          <div className="flex h-full max-w-[200px] flex-col gap-2">
            <StatusState
              setResetState={setResetState}
              resetCounter={resetCounter}
            />
          </div>
          <div className="flex h-full max-w-[200px] flex-col gap-2">
            <button
              onClick={handleClick}
              className="work h-[40px] w-[90px]   rounded-lg bg-customBlue px-2 py-1 text-sm font-bold  text-white"
            >
              Tìm kiếm
            </button>
            <button
              onClick={handleReset}
              className={`work ${reset ? 'block' : 'hidden'}  h-[40px] w-[90px]
                      rounded-lg bg-gray-800 px-2 py-1 text-sm font-bold
                    text-white`}
            >
              Đặt lại
            </button>
          </div>
        </div>
        <BasicModal />
      </div>
      <PrinterTable statuss={status} branch={branch} building={building} />
    </div>
  );
};

export default PrinterManangement;
