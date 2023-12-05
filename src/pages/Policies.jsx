// import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import {useNavigate, useSearchParams } from 'react-router-dom';
import AllowedFormatForm from '../components/policy/AllowedFormatForm';
import AllocationDateForm from '../components/policy/AllocationDateForm';
import AllocationPageForm from '../components/policy/AllocationPaperForm';
// import paper from '../assets/icon/paper.png';
// import calender from '../assets/icon/calendar.png';
// import format from '../assets/icon/format.png';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PoliciesPage = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const renderBody = (type) => {
    switch (type) {
      case 'date':
        //  TODO: Implement the form body here
        return (<PoliciesContainer title={'Thay đổi ngày phân bố'} ><AllocationDateForm /></PoliciesContainer>);
      case 'paper':
        //  TODO: Implement the form body here
        return (<PoliciesContainer title={'Thay đổi số trang mặc định'} > <AllocationPageForm /> </PoliciesContainer>);
      case 'format':
        //  TODO: Implement the form body here
        return (<PoliciesContainer title={'Thay đổi định dạng file được phép'}>  <AllowedFormatForm /> </PoliciesContainer>);
      default:
        return (
          <>
          <div className='min-h-screen flex flex-col items-center justify-center align-center space-y-[40px] bg-primaryContainer '>
            <Button onClick={() => setSearchParams({ type: 'date' })}>
              <div className='grid grid-cols-4
              bg-customBlue hover:bg-blue-300 
              h-[100px] w-[396px] rounded-[20px] text-white' >
                <div className='flex justify-center items-center '>
                  <CalendarMonthIcon/>
                  {/* <img className='h-[50px] w-[50px] ' src={calender} alt="" /> */}
                </div>
                <div className='col-span-2 flex justify-self-start items-center text-sm font-semibold' >
                  Thay đổi ngày phân bố
                </div>
              </div>
            </Button>
            <Button onClick={() => setSearchParams({ type: 'paper' })}>
              <div className='grid grid-cols-4
              bg-customBlue hover:bg-blue-300 
              h-[100px] w-[396px] rounded-[20px] text-white' >
                <div className='flex justify-center items-center '>
                  {/* <img className='h-[50px] w-[50px] ' src={paper} alt="" /> */}
                  <FileCopyIcon/>
                </div> 
                <div className='col-span-3 flex justify-self-start items-center text-sm font-semibold' >
                  Thay đổi số trang mặc định
                </div>
              </div>
            </Button>
            <Button onClick={() => setSearchParams({ type: 'format' })}>
              <div className='grid grid-cols-4 
              bg-customBlue hover:bg-blue-300 
              h-[100px] w-[396px] rounded-[20px] text-white' >
                <div className='flex justify-center items-center '>
                  <FolderCopyIcon/>
                </div>
                <div className='col-span-3 flex justify-self-start items-center  text-sm font-semibold'  >
                  Thay đổi định dạng file được phép
                </div>
              </div>
            </Button>
          </div>
          </>
        );
    }
  };

  return (
    
      <>{renderBody(searchParams.get('type'))}</>
    
  );
};

const PoliciesContainer = ({ children, title }) => {
  // TODO: implement the layout here
  const navigate = useNavigate();
  return (
    <div className="flex h-[100vh] w-full items-center justify-center white">
      <div className=" h-3/4 w-3/4 white border-4 border-blue-200 rounded-[60px] flex flex-col items-center justify-between">
        {/* the header */}
        <div className='flex items-center justify-center h-[90px] w-full rounded-t-[56px] text-[20px] font-semibold bg-blue-200'>
          {title}  
        </div>
        <>
          {children}
        </>

        {/* Button back using navigate back router dom */}
        <div className='flex w-full pb-[12px] pl-[24px]'>
          <button onClick={() => navigate("/dashboard/policies")}
                  className='border-[1px] border-customBlue text-customBlue py-[8px] px-[16px] rounded-[20px] font-semibold  w-[120px] h-[40px]'>
            Quay lại
          </button>      
        </div>
      </div>
    </div> // the end of a page
  );
};

PoliciesContainer.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string
};

export default PoliciesPage;
