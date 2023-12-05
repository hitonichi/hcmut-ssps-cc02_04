import { Chip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function PrinterCard({
  printer,
  selectedPrinter,
  setSelectedPrinter,
}) {
  return (
    <div
      className={`flex w-full flex-col gap-2 rounded-lg p-2 ${
        printer.enabled
          ? 'cursor-pointer bg-primaryContainer hover:bg-secondaryContainer'
          : 'bg-gray-300'
      }
      ${
        selectedPrinter && selectedPrinter._id === printer._id
          ? 'bg-blue-300'
          : ''
      }
      `}
      onClick={() => {
        setSelectedPrinter(printer);
      }}
    >
      <div className="flex w-full items-center justify-between">
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {printer.name || 'Unamed'}
        </Typography>
        <Chip
          label={printer.enabled ? 'Khả dụng' : 'Không khả dụng'}
          color={printer.enabled ? 'success' : 'error'}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <Typography variant="body2">Vị trí</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {printer.location.branch}, {printer.location.building}
        </Typography>
      </div>
      <div className="flex w-full items-center justify-between">
        <Typography variant="body2">Khổ giấy tối đa</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {printer.maxSize}
        </Typography>
      </div>
    </div>
  );
}

PrinterCard.propTypes = {
  printer: PropTypes.object,
  selectedPrinter: PropTypes.object,
  setSelectedPrinter: PropTypes.func,
};
