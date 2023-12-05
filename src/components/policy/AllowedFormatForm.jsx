// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
// import { current } from '@reduxjs/toolkit';
import { useState } from 'react';
// import handle

const mockData = [
  { name: 'pdf', permitted: true },
  { name: 'doc', permitted: false },
  { name: 'docx', permitted: false },
  { name: 'xls', permitted: true },
  { name: 'ttf', permitted: false },
  { name: 'md', permitted: true },
  { name: 'html', permitted: false },
];

const AllowedFormatForm = () => {
  const [formData, setFormData] = useState(mockData);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [change, setChange] = useState('');

  const handleSave = () => {
    if (isValid) {
      const permittedNames = formData
        .filter((data) => data.permitted)
        .map((data) => data.name)
        .join(', ')
        .toUpperCase();

      setMessage(
        `Cập nhật thành công. Các định dạng được chọn: ${permittedNames}.`,
      );
    }
  };

  const handleCheckboxChange = (name) => (event) => {
    const updatedFormData = formData.map((data) => {
      if (data.name === name) {
        return { ...data, permitted: event.target.checked };
      }
      return data;
    });

    const checked = updatedFormData.some((data) => data.permitted);
    setIsValid(checked);
    setMessage(
      checked
        ? ''
        : 'Có lỗi xảy ra. Chọn ít nhất 1 (một) định dạng trước khi “Lưu”.',
    );

    const hasChanges = updatedFormData.some((item) =>
      mockData.some(
        (origin) =>
          origin.name === item.name && origin.permitted !== item.permitted,
      ),
    );

    if (hasChanges) {
      const originalFormats = mockData
        .filter((data) => data.permitted)
        .map((data) => data.name)
        .join(', ')
        .toUpperCase();
      setChange(`Các định dạng trước đó: ${originalFormats}.`);
    } else {
      setChange('');
    }

    setFormData(updatedFormData);
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-between">
      <div className="flex h-full w-full flex-col items-center pt-4">
        <div className="flex w-full flex-col pl-[45%]">
          {formData.map((data) => (
            <FormControlLabel
              key={data.name}
              control={
                <Checkbox
                  checked={data.permitted}
                  onChange={handleCheckboxChange(data.name)}
                  name={data.name}
                  color="primary"
                />
              }
              label={data.name}
            />
          ))}
        </div>
        {message && (
          <p className={`${isValid ? 'text-blue-800' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        {change && <p className={'text-yellow-500'}>{change}</p>}
      </div>
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          borderRadius: 20,
          backgroundcolor: '#4061A3',
          width: 100,
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold', color: 'white', textTransform: 'none' }}
        >
          Lưu
        </Typography>
      </Button>
    </div>
  );
};

export default AllowedFormatForm;
