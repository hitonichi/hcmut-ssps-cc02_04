import 'dayjs/locale/en';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaperSizeFilter from '../components/Records/paperSizeFilter';
import RecordTable from '../components/Records/recordTable';
import { PaperSize } from '../components/Records/inputForm';
import { StartDate } from '../components/Records/inputForm';
import { EndDate } from '../components/Records/inputForm';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getRecords } from '../services/records.service';
const StudentRecords = () => {
  const [paperSize, setpaperSize] = useState(null);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultPaperSize = searchParams.get('paperSize') || null;
  const defaultStartDate = searchParams.get('startDate') || '2000-01-01';
  const defaultEndDate = searchParams.get('endDate') || Date.now();
  const handleClick = () => {
    console.log('Status: ', defaultPaperSize);
    console.log('Building: ', defaultStartDate);
    console.log('Branch: ', defaultEndDate);
    setpaperSize(defaultPaperSize);
    setstartDate(defaultStartDate);
    setendDate(defaultEndDate);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    getRecords().then((resData) => setData(resData));
  }, []);

  const widthValue = `calc(100vw - 80px)`;
  const countPages = (data, paperSize) => {
    let pageCount = 0;
    data.forEach((item) => {
      if (item.paperSize === paperSize) {
        pageCount += item.pageCount * item.printCount;
      }
    });
    return pageCount;
  };

  const totalCountA3 = countPages(data, 'A3');
  const totalCountA4 = countPages(data, 'A4');
  const totalCountA5 = countPages(data, 'A5');
  const [resetCounter, setResetCounter] = useState(0);
  const [reset, setResetState] = useState(false);

  const handleReset = () => {
    setResetCounter((prev) => prev + 1);
    setpaperSize(null);
    setstartDate(null);
    setendDate(null);

    navigate(location.pathname);
  };
  return (
    <div
      style={{ width: widthValue }}
      className="flex h-screen flex-col gap-[30px] overflow-hidden bg-primaryContainer py-[50px] pl-[40px] pr-[40px]"
    >
      <div className="flex h-[60px] w-full flex-row justify-between ">
        <h2 className="roboto ml-8 w-auto text-5xl font-bold text-black">
          Lịch sử in{' '}
        </h2>
      </div>
      <div className="flex w-full flex-row items-start justify-between">
        <div className="grid grid-cols-[40%_40%_20%] flex-col items-center justify-center gap-x-2  rounded-lg bg-white px-5 py-4 ">
          <div className="flex h-full max-w-[200px] flex-col gap-2">
            <StartDate
              setResetState={setResetState}
              resetCounter={resetCounter}
            />
            <PaperSize
              setResetState={setResetState}
              resetCounter={resetCounter}
            />
          </div>

          <div className="flex h-full max-w-[200px] flex-col gap-2">
            <EndDate
              setResetState={setResetState}
              resetCounter={resetCounter}
            />
          </div>
          <div className="flex h-full max-w-[200px] flex-col gap-2">
            <button
              onClick={handleClick}
              className="work h-[40px]   rounded-lg bg-customBlue px-2 py-1 text-sm font-bold  text-white"
            >
              Tìm kiếm
            </button>
            <button
              onClick={handleReset}
              className={`work ${
                reset ? 'block' : 'hidden'
              }  h-[40px] rounded-lg
                      bg-gray-800 px-2 py-1 text-sm font-bold
                    text-white`}
            >
              Đặt lại
            </button>
          </div>
        </div>
        <PaperSizeFilter
          totalCountA3={totalCountA3}
          totalCountA4={totalCountA4}
          totalCountA5={totalCountA5}
        />
      </div>
      <RecordTable
        paperSize={paperSize}
        startDate={startDate}
        endDate={endDate}
        variant={'student'}
      />
    </div>
  );
};

export default StudentRecords;
