import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import PropTypes from 'prop-types';
import 'dayjs/locale/en';
import { InputLabel, Select } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const MaxSizeFormat = ({ errorState }) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    const newSize = event.target.value;
    setValue(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('MaxSizeFormat', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialBranchValue = searchParams.get('MaxSizeFormat') || null;
    setValue(initialBranchValue);
  }, []);
  MaxSizeFormat.propTypes = {
    errorState: PropTypes.bool.isRequired,
  };
  return (
    <FormControl error={errorState}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel
          value="A3"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="A3"
        />
        <FormControlLabel
          value="A4"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="A4"
        />
        <FormControlLabel
          value="A5"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="A5"
        />
      </RadioGroup>
    </FormControl>
  );
};

export const BranchPrinter = ({ errorState }) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    const newSize = event.target.value;
    setValue(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('BranchPrinter', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialBranchValue = searchParams.get('BranchPrinter') || null;
    setValue(initialBranchValue);
  }, []);
  BranchPrinter.propTypes = {
    errorState: PropTypes.bool.isRequired,
  };
  return (
    <FormControl error={errorState}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel
          value="CS1"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="CS1"
        />
        <FormControlLabel
          value="CS2"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="CS2"
        />
      </RadioGroup>
    </FormControl>
  );
};

export const PrintingType = ({ errorState }) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    const newSize = event.target.value;
    setValue(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('PrintingType', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialBranchValue = searchParams.get('PrintingType') || null;
    setValue(initialBranchValue);
  }, []);
  PrintingType.propTypes = {
    errorState: PropTypes.bool.isRequired,
  };
  return (
    <FormControl error={errorState}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel
          value="Một mặt"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="Một mặt"
        />
        <FormControlLabel
          value="Hai mặt"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="Hai mặt"
        />
      </RadioGroup>
    </FormControl>
  );
};

export const PrintingStatus = ({ errorState }) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    const newSize = event.target.value;
    setValue(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('PrintingStatus', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };
  console.log('ry state', errorState);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialBranchValue = searchParams.get('PrintingStatus') || null;
    setValue(initialBranchValue);
  }, []);
  PrintingStatus.propTypes = {
    errorState: PropTypes.bool.isRequired,
  };
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel
          value="Được kích hoạt"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="Được kích hoạt"
        />
        <FormControlLabel
          value="Vô hiệu hóa"
          control={<Radio style={{ color: errorState ? 'red' : '' }} />}
          label="Vô hiệu hóa"
        />
      </RadioGroup>
    </FormControl>
  );
};

export const Branch = ({ resetCounter, setResetState }) => {
  const [branchValue, setBranchValue] = useState('chưa chọn');

  useEffect(() => {
    setBranchValue('chưa chọn');
  }, [resetCounter]);
  useEffect(() => {
    if (branchValue !== 'chưa chọn' && branchValue !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [branchValue, setResetState]);

  const handleChange = (event) => {
    const newSize = event.target.value;
    setBranchValue(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('Branch', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialBranchValue = searchParams.get('Branch') || 'chưa chọn';
    setBranchValue(initialBranchValue);
  }, []);
  Branch.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.func.isRequired,
  };
  return (
    <div className="">
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Cơ sở</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={branchValue}
          label="Cơ sở"
          onChange={handleChange}
        >
          <MenuItem value={'chưa chọn'}>Chọn cơ sở</MenuItem>
          <MenuItem value={'CS1'}>Cơ sở 1</MenuItem>
          <MenuItem value={'CS2'}>Cơ sở 2</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export const PaperSize = ({ resetCounter, setResetState }) => {
  const [paperSize, setPaperSize] = useState('all');
  useEffect(() => {
    setPaperSize('all');
  }, [resetCounter]);
  useEffect(() => {
    if (paperSize !== 'all' && paperSize !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [paperSize, setResetState]);

  // const setResetState = (val) => dispac
  // setReste(...)
  // setReset  = ...

  const handleChange = (event) => {
    const newSize = event.target.value;
    setPaperSize(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('paperSize', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialPaperSize = searchParams.get('paperSize') || 'all';
    setPaperSize(initialPaperSize);
  }, []);
  PaperSize.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired,
  };

  return (
    <div className="">
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Khổ giấy</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paperSize}
          label="Khổ giấy"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>Tất cả</MenuItem>
          <MenuItem value={'A5'}>A5</MenuItem>
          <MenuItem value={'A4'}>A4</MenuItem>
          <MenuItem value={'A3'}>A3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export const PaperMonth = ({ resetCounter, setResetState }) => {
  const [month, setPaperSize] = useState('all');
  useEffect(() => {
    setPaperSize('all');
  }, [resetCounter]);
  useEffect(() => {
    if (month !== 'all' && month !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [month, setResetState]);

  const handleChange = (event) => {
    const newSize = event.target.value;
    setPaperSize(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('month', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialPaperSize = searchParams.get('month') || 'all';
    setPaperSize(initialPaperSize);
  }, []);
  PaperMonth.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired,
  };

  return (
    <div className="h-full ">
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Chọn tháng</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Chọn tháng"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>Tất cả</MenuItem>
          <MenuItem value={1}>Tháng Một</MenuItem>
          <MenuItem value={2}>Tháng Hai</MenuItem>
          <MenuItem value={3}>Tháng Ba</MenuItem>
          <MenuItem value={4}>Tháng Tư</MenuItem>
          <MenuItem value={5}>Tháng Năm</MenuItem>
          <MenuItem value={6}>Tháng Sáu</MenuItem>
          <MenuItem value={7}>Tháng Bảy</MenuItem>
          <MenuItem value={8}>Tháng Tám</MenuItem>
          <MenuItem value={9}>Tháng Chín</MenuItem>
          <MenuItem value={10}>Tháng Mười</MenuItem>
          <MenuItem value={11}>Tháng Mười Một</MenuItem>
          <MenuItem value={12}>Tháng Mười Hai</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export const PaperYear = ({ resetCounter, setResetState }) => {
  const [year, setPaperSize] = useState('all');
  useEffect(() => {
    setPaperSize('all');
  }, [resetCounter]);
  useEffect(() => {
    if (year !== 'all' && year !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [year, setResetState]);
  console.log('PapeYear current ', year);

  const handleChange = (event) => {
    const newSize = event.target.value;
    setPaperSize(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('year', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialPaperSize = searchParams.get('year') || 'all';
    ``;
    setPaperSize(initialPaperSize);
  }, []);
  PaperYear.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired,
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Chọn năm</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Chọn tháng"
        onChange={handleChange}
      >
        <MenuItem value={'all'}>Tất cả</MenuItem>
        <MenuItem value={'2023'}>2023</MenuItem>
        <MenuItem value={'2022'}>2022</MenuItem>
        <MenuItem value={'2021'}>2021</MenuItem>
        <MenuItem value={'2020'}>2020</MenuItem>
        <MenuItem value={'2019'}>2019</MenuItem>
      </Select>
    </FormControl>
  );
};
export const StartDate = ({ resetCounter, setResetState }) => {
  const [startDate, setStartDate] = useState(null);
  useEffect(() => {
    setStartDate(null);
    // setTimeout(() => {
    //   setStartDate(null);
    // }, 0);
  }, [resetCounter]);
  useEffect(() => {
    if (startDate !== null && startDate !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [startDate, setResetState]);

  const handleChange = (newValue) => {
    setStartDate(newValue);

    const newSearchParams = new URLSearchParams(window.location.search);
    if (newValue) {
      newSearchParams.set('startDate', newValue.format('YYYY-MM-DD'));
    } else {
      newSearchParams.delete('startDate');
    }

    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialStartDate = searchParams.get('startDate') || null;
    setStartDate(initialStartDate);
  }, []);
  StartDate.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired, // Add this prop type validation
  };
  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={<span className="work">Ngày bắt đầu</span>}
          value={startDate}
          onChange={handleChange}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </div>
  );
};

export const EndDate = ({ resetCounter, setResetState }) => {
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    setEndDate(null);
    // setTimeout(() => {
    //   setEndDate(null);
    // }, 0);
  }, [resetCounter]);
  useEffect(() => {
    if (endDate !== null && endDate !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [endDate, setResetState]);

  const handleChange = (newValue) => {
    setEndDate(newValue);

    const newSearchParams = new URLSearchParams(window.location.search);
    if (newValue) {
      newSearchParams.set('endDate', newValue.format('YYYY-MM-DD'));
    } else {
      newSearchParams.delete('endDate');
    }

    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialEndDate = searchParams.get('endDate') || null;
    setEndDate(initialEndDate);
  }, []);
  EndDate.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired,
  };

  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={<span className="work">Ngày kết thúc</span>}
          value={endDate}
          onChange={handleChange}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </div>
  );
};

export const Build = ({ resetCounter, setResetState }) => {
  const initialStudentID = '';
  const [Building, setBuilding] = useState(initialStudentID);

  useEffect(() => {
    setBuilding('');
    // setTimeout(() => {
    //   setBuilding(null);
    // }, 0);
  }, [resetCounter]);
  useEffect(() => {
    if (Building !== null && Building !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [Building, setResetState]);

  const handleChange = (event) => {
    const newStudentID = event.target.value;
    setBuilding(newStudentID);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('Building', newStudentID);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialStudentID = searchParams.get('Building');
    setBuilding(initialStudentID);
  }, []);
  Build.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired,
  };

  return (
    <div className="">
      <TextField
        id="justatee"
        label="Toà nhà  "
        variant="outlined"
        value={Building}
        onChange={handleChange}
        size="small"
      />
    </div>
  );
};
export const StatusState = ({ resetCounter, setResetState }) => {
  const [Status, setStatus] = useState('chưa chọn');

  useEffect(() => {
    setStatus('chưa chọn');
  }, [resetCounter]);
  useEffect(() => {
    if (Status !== 'chưa chọn' && Status !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [Status, setResetState]);

  const handleChange = (event) => {
    const newSize = event.target.value;
    setStatus(newSize);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('Status', newSize);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialBranchValue = searchParams.get('Status') || 'chưa chọn';
    setStatus(initialBranchValue);
  }, []);
  StatusState.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.func.isRequired,
  };
  return (
    <div className="">
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Status}
          label="Trạng thái"
          onChange={handleChange}
        >
          <MenuItem value={'chưa chọn'}>Chọn trạng thái</MenuItem>
          <MenuItem value={'enabled'}>Khả dụng</MenuItem>
          <MenuItem value={'disabled'}>Không khả dụng</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export const StudentID = ({ resetCounter, setResetState }) => {
  const initialStudentID = '';
  const [studentID, setStudentID] = useState(initialStudentID);

  useEffect(() => {
    setStudentID('');
    // setTimeout(() => {
    //   setStudentID(null);
    // }, 0);
  }, [resetCounter]);
  useEffect(() => {
    if (studentID !== null && studentID !== '') {
      setResetState(true);
    } else setResetState(false);
  }, [studentID, setResetState]);

  const handleChange = (event) => {
    const newStudentID = event.target.value;
    setStudentID(newStudentID);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('StudentID', newStudentID);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialStudentID = searchParams.get('StudentID');
    setStudentID(initialStudentID);
  }, []);
  StudentID.propTypes = {
    resetCounter: PropTypes.bool.isRequired,
    setResetState: PropTypes.bool.isRequired,
  };

  return (
    <div className="">
      <TextField
        id="justatee"
        label="MSSV"
        variant="outlined"
        value={studentID}
        onChange={handleChange}
        size="small"
      />
    </div>
  );
};

export const PrinterBuildingg = ({ errorState }) => {
  const initialStudentID = null;
  const [PrinterBuilding, setPrinterBuilding] = useState(initialStudentID);

  const handleChange = (event) => {
    const newStudentID = event.target.value;
    setPrinterBuilding(newStudentID);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('PrinterBuilding', newStudentID);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialStudentID = searchParams.get('PrinterBuilding');
    setPrinterBuilding(initialStudentID);
  }, []);
  PrinterBuildingg.propTypes = {
    errorState: PropTypes.bool.isRequired,
  };

  return (
    <div className="">
      <TextField
        error={errorState}
        id="justatee"
        label="Tòa nhà"
        variant="outlined"
        value={PrinterBuilding}
        onChange={handleChange}
        size="small"
      />
    </div>
  );
};

export const PrinterNamee = ({ errorState }) => {
  const initialStudentID = null;
  const [PrinterName, setPrinterName] = useState(initialStudentID);

  const handleChange = (event) => {
    const newStudentID = event.target.value;
    setPrinterName(newStudentID);

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('PrinterName', newStudentID);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialStudentID = searchParams.get('PrinterName');
    setPrinterName(initialStudentID);
  }, []);
  PrinterNamee.propTypes = {
    errorState: PropTypes.bool.isRequired,
  };
  console.log(errorState);

  return (
    <div className="">
      <TextField
        error={errorState}
        id="justatee"
        label="Tên máy in"
        variant="outlined"
        value={PrinterName}
        onChange={handleChange}
        size="small"
      />
    </div>
  );
};
