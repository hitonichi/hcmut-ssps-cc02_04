import { Typography } from '@mui/material';
import PrintingForm from '../components/PrintingForm';

const Printing = () => {
  return (
    <div className="flex h-[100vh] flex-col justify-between gap-12 bg-primaryContainer p-10">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        In tài liệu
      </Typography>
      <PrintingForm />
    </div>
  );
};

export default Printing;
