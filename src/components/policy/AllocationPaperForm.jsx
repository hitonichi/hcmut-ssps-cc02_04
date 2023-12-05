import { useState } from 'react';
// import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Button } from '@mui/material';
import NumberInput from '../Input/NumberInputBasic';
const AllocationPageForm = () => {
  const [value, setValue] = useState(10);
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState('');
  const [defValue, setDefValue] = useState(value);
  const handleSave = () => {
    if (value >= 1 && value <= 100) {
      setIsValid(true);
      setDefValue(value);
      setTimeout(() => {
        setMessage('Cập nhật thành công');
      }, 10);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else if (value > 100) {
      setIsValid(false);
      setMessage('Lỗi: Vượt quá số trang cho phép');
    } else {
      setIsValid(false);
      setMessage('Lỗi: Giá trị không hợp lệ');
    }
  };

  return (
    <>
      {/* <div>Modifying default allocated paper</div> */}
      <div>
        <div className="flex min-h-[300px] flex-col justify-between p-8">
          <div className="ml-10 mr-10 mt-10 flex flex-col items-center justify-center">
            <NumberInput
              aria-label="Number input"
              placeholder="Nhập số trang"
              value={value}
              defaultValue={defValue}
              min={1}
              // max={100}
              onChange={(event, val) => setValue(val)}
              error={!isValid}
            />
            {message && (
              <p
                className={`mb-2 ${isValid ? 'text-blue-800' : 'text-red-500'}`}
              >
                {message}
              </p>
            )}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <p className={`mb-2 text-yellow-500`}>
              {defValue !== value && `Số trang mặc định hiện tại: ${defValue}`}
            </p>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                borderRadius: 20,
                backgroundcolor: '#4061A3',
                width: 100,
              }}
            >
              {' '}
              Lưu{' '}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllocationPageForm;
