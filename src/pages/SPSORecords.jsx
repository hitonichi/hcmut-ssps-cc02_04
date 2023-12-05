import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaperSize } from '../components/Records/inputForm';
import { StartDate } from '../components/Records/inputForm';
import { EndDate } from '../components/Records/inputForm';
import 'dayjs/locale/en';
import PaperSizeFilter from '../components/Records/paperSizeFilter';
import RecordTable from '../components/Records/recordTable';
import { StudentID } from '../components/Records/inputForm';
import { PaperMonth } from '../components/Records/inputForm';
import { PaperYear } from '../components/Records/inputForm';
import PreviewIcon from '@mui/icons-material/Preview';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getRecords } from '../services/records.service';
import { useNavigate } from 'react-router-dom';
// import { DayCalendar } from '@mui/x-date-pickers/internals';
// import { YearCalendar } from '@mui/x-date-pickers';
const SPSORecords = () => {
  const [paperSize, setpaperSize] = useState(null);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [studentID, setstudentID] = useState(null);
  const [selectedMonth, setselectedMonth] = useState(null);
  const [selectedYear, setselectedYear] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParamss = new URLSearchParams(location.search);
  const defaultPaperSize = searchParamss.get('paperSize') || null;
  const defaultStartDate = searchParamss.get('startDate') || '2000-01-01';
  const defaultEndDate = searchParamss.get('endDate') || Date.now();
  const defaultStudentID = searchParamss.get('StudentID') || null;
  const defaultselectMonth = searchParamss.get('month') || null;
  const defaultselectYear = searchParamss.get('year') || null;
  const [data, setData] = useState([]);
  useEffect(() => {
    getRecords().then((resData) => setData(resData));
  }, []);

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
  const [searchParams, setSearchParams] = useSearchParams();
  const widthValue = `calc(100vw - 80px)`;

  useEffect(() => {
    console.log('updage search params', searchParams, searchParams.get('type'));
  }, [searchParams]);
  const type = searchParams.get('type');
  const handleClick = () => {
    switch (type) {
      case 'general':
        console.log('StudentID: ', defaultStudentID);
        console.log('Size: ', defaultPaperSize);
        console.log('Start Date:', defaultStartDate);
        console.log('End date: ', defaultEndDate);
        setstudentID(defaultStudentID);
        setpaperSize(defaultPaperSize);
        setstartDate(defaultStartDate);
        setendDate(defaultEndDate);
        break;
      case 'monthly':
        console.log('SelectedMonth: ', defaultselectMonth);
        console.log('Size: ', defaultPaperSize);
        setselectedMonth(defaultselectMonth);
        setpaperSize(defaultPaperSize);
        break;
      case 'annual':
        console.log('SelectedYear: ', defaultselectYear);
        console.log('Size: ', defaultPaperSize);
        setselectedYear(defaultselectYear);
        setpaperSize(defaultPaperSize);
        break;
    }
  };
  const [resetCounter, setResetCounter] = useState(0);

  const handleReset = () => {
    setpaperSize(null);
    setstartDate(null);
    setendDate(null);
    setselectedMonth(null);
    setselectedYear(null);
    setstudentID(null);

    const queryParams = new URLSearchParams(location.search);
    const currentType = queryParams.get('type') || 'default';

    const newPath = `${location.pathname}?type=${currentType}`;

    navigate(newPath);
    setResetCounter((prev) => prev + 1);
  };
  const [reset, setResetState] = useState(false);

  const renderRecordScreen = (type) => {
    switch (type) {
      case 'general':
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
                  <StudentID
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                  <StartDate
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                </div>
                <div className="flex h-full max-w-[200px] flex-col gap-2">
                  <PaperSize
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                  <EndDate
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                </div>
                <div className="flex h-full flex-col gap-2">
                  <button
                    onClick={handleClick}
                    className="work h-[40px] rounded-lg bg-customBlue px-2 py-1 text-sm font-bold  text-white"
                  >
                    Tìm kiếm
                  </button>

                  <button
                    onClick={handleReset}
                    className={`work h-[40px]  rounded-lg bg-gray-800 px-2 py-1 text-sm  font-bold text-white ${
                      reset ? 'block' : 'hidden'
                    }`}
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
              studentID={studentID}
              startDate={startDate}
              endDate={endDate}
              variant={'general'}
            />
          </div>
        );
      case 'monthly':
        return (
          <div
            style={{ width: widthValue }}
            className="flex h-screen flex-col gap-[30px] overflow-hidden bg-primaryContainer py-[50px] pl-[40px] pr-[60px]"
          >
            <div className="flex h-[60px] w-full flex-row justify-between ">
              <h2 className="roboto ml-8 w-auto text-5xl font-bold text-black">
                Báo cáo in tháng{' '}
              </h2>
            </div>
            <div className="flex w-full flex-row items-start justify-between">
              <div className="grid grid-cols-[40%_40%_20%] flex-col items-center justify-center gap-x-2  rounded-lg bg-white px-5 py-4 ">
                <div className="flex h-full  w-[200px] flex-col gap-2">
                  <PaperMonth
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                </div>
                <div className="flex h-full  w-[200px] flex-col gap-2">
                  <PaperSize
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                </div>

                <div className="flex h-full   flex-col gap-2">
                  <button
                    onClick={handleClick}
                    className="work h-[40px]  rounded-lg bg-customBlue px-2 py-1 text-sm font-bold  text-white"
                  >
                    Tìm kiếm
                  </button>
                  <button
                    onClick={handleReset}
                    className={`work h-[40px]  rounded-lg bg-gray-800 px-2 py-1 text-sm  font-bold text-white ${
                      reset ? 'block' : 'hidden'
                    }`}
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
              selectedMonth={selectedMonth}
              paperSize={paperSize}
              variant={'monthly'}
            />
          </div>
        );
      case 'annual':
        return (
          <div
            style={{ width: widthValue }}
            className="flex h-screen flex-col gap-[30px] overflow-hidden bg-primaryContainer py-[50px] pl-[40px] pr-[60px]"
          >
            <div className="flex h-[60px] w-full flex-row justify-between ">
              <h2 className="roboto ml-8 w-auto text-5xl font-bold text-black">
                Báo cáo in năm{' '}
              </h2>
            </div>
            <div className="flex w-full flex-row items-start justify-between">
              <div className=" grid grid-cols-[40%_40%_20%] flex-col items-center justify-center gap-x-2  rounded-lg bg-white px-5 py-4 ">
                <div className="flex h-full  w-[200px] flex-col gap-2">
                  <PaperYear
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                </div>
                <div className="flex h-full  w-[200px] flex-col gap-2">
                  <PaperSize
                    resetCounter={resetCounter}
                    setResetState={setResetState}
                  />
                </div>
                <div className="flex h-full   flex-col gap-2">
                  <button
                    onClick={handleClick}
                    className="work h-[40px]  rounded-lg bg-customBlue px-2 py-1 text-sm font-bold  text-white"
                  >
                    Tìm kiếm
                  </button>
                  <button
                    onClick={handleReset}
                    className={`work h-[40px]  rounded-lg bg-gray-800 px-2 py-1 text-sm  font-bold text-white ${
                      reset ? 'block' : 'hidden'
                    }`}
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
              selectedYear={selectedYear}
              paperSize={paperSize}
              variant={'annual'}
            />
          </div>
        );
      default:
        return (
          <>
            <div className="align-center flex min-h-screen flex-col items-center justify-center space-y-[40px] bg-primaryContainer ">
              <Button onClick={() => setSearchParams({ type: 'general' })}>
                <div
                  className="grid h-[100px]
                w-[396px] grid-cols-4 
                rounded-[20px] bg-customBlue text-white hover:bg-blue-300"
                >
                  <div className="flex items-center justify-center ">
                    <PreviewIcon />
                  </div>
                  <div className="col-span-2 flex items-center justify-self-start text-sm font-semibold">
                    Báo cáo in theo sinh viên
                  </div>
                </div>
              </Button>
              <Button onClick={() => setSearchParams({ type: 'monthly' })}>
                <div
                  className="grid h-[100px]
                  w-[396px] grid-cols-4 
                  rounded-[20px] bg-customBlue text-white hover:bg-blue-300"
                >
                  <div className="flex items-center justify-center ">
                    <TodayIcon />
                  </div>
                  <div className="col-span-2 flex items-center justify-self-start text-sm font-semibold">
                    Báo cáo in theo tháng
                  </div>
                </div>
              </Button>
              <Button onClick={() => setSearchParams({ type: 'annual' })}>
                <div
                  className="grid h-[100px]
                  w-[396px] grid-cols-4 
                  rounded-[20px] bg-customBlue text-white hover:bg-blue-300"
                >
                  <div className="flex items-center justify-center ">
                    <CalendarMonthIcon />
                  </div>
                  <div className="col-span-2 flex items-center justify-self-start text-sm font-semibold">
                    Báo cáo in theo năm
                  </div>
                </div>
              </Button>
            </div>
          </>
        );
    }
  };

  return <div>{renderRecordScreen(searchParams.get('type'))}</div>;
};

export default SPSORecords;
