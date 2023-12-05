import PropTypes from 'prop-types';
import { Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PrinterList from './PrinterList';
import axios from 'axios';
import PillButton from './PillButton';

export default function PrinterSelectionModal({
  selectedPrinter,
  setSelectedPrinter,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [printers, setPrinters] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + '/printers')
      .then((res) => {
        console.log('[AXIOS] got printers', res.data);
        setPrinters(res.data.data.sort((x, y) => y.enabled - x.enabled));
      })
      .catch((e) => console.log('[AXIOS ERROR]', e));
  }, []);

  useEffect(() => {
    setSelected(selectedPrinter);
  }, [selectedPrinter]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="grid w-full grid-cols-3 items-start justify-start gap-4">
        <Typography sx={{ fontWeight: 'bold' }} variant="h6">
          Máy in
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          Chọn máy in
        </Button>

        <Modal open={open} onClose={handleClose}>
          <div className="absolute inset-1/2 flex h-[70%] min-h-[400px] w-[60%] min-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-hidden rounded-lg bg-white">
            {/* Header */}
            <div className="flex justify-center bg-customBlue py-2">
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}
                className="text-white"
              >
                Chọn máy in
              </Typography>
            </div>

            {/* Body */}
            <PrinterList
              selectedPrinter={selected}
              setSelectedPrinter={setSelected}
              printers={printers}
            />

            {/* Footer */}
            <div className="flex justify-end gap-4 border-t-2 border-t-customBlue px-4 py-2">
              <PillButton
                color="primary"
                variant="outlined"
                sx={{ boxShadow: 0 }}
                onClick={() => {
                  setSelectedPrinter(null);
                  setSelected(null);
                  handleClose();
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Hủy
                </Typography>
              </PillButton>
              <PillButton
                color="primary"
                variant="contained"
                sx={{ boxShadow: 0 }}
                disabled={!selected}
                onClick={() => {
                  setSelectedPrinter(selected);
                  handleClose();
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', color: 'white' }}
                >
                  Xác nhận
                </Typography>
              </PillButton>
            </div>
          </div>
        </Modal>
      </div>
      {selectedPrinter && (
        <div className="my-2 ml-2 flex flex-col gap-2">
          <div className="grid grid-cols-3">
            <div>Tên</div>
            <div>{selectedPrinter.name}</div>
          </div>
          <div className="grid grid-cols-3">
            <div>Vị trí</div>
            <div>
              {selectedPrinter.location.branch},{' '}
              {selectedPrinter.location.building}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div>Khổ giấy tối đa</div>
            <div>{selectedPrinter.maxSize}</div>
          </div>
        </div>
      )}
    </>
  );
}

PrinterSelectionModal.propTypes = {
  selectedPrinter: PropTypes.object,
  setSelectedPrinter: PropTypes.func,
};
