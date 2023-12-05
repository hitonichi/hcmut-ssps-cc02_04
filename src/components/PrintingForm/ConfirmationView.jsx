import PropTypes from 'prop-types';
import { Divider, Typography } from '@mui/material';
import GridDisplayLayout from './GridDisplayLayout';
import { useFormContext } from 'react-hook-form';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect } from 'react';
// import { useEffect } from 'react';

const DEFAULT_BALANCE = 100;
const DEFAULT_PAGES = 24;

export default function ConfirmationView({ document, selectedPrinter }) {
  const { getValues, watch, setValue } = useFormContext();

  const copies = watch('printCount');
  const paperSize = watch('paperSize');
  const sizeScale = paperSize === 'A5' ? 0.5 : paperSize === 'A3' ? 2 : 1;

  const toltalCost = copies * 24 * sizeScale;
  const remainingBalance = DEFAULT_BALANCE - toltalCost;

  const _canPurchase = watch('canPurchase');
  const canPurchase = remainingBalance >= 0;
  useEffect(() => {
    console.log('[CONFIRMATION]', canPurchase, _canPurchase);
    if (_canPurchase !== canPurchase) setValue('canPurchase', canPurchase);
  }, [_canPurchase, copies, paperSize]);

  // useEffect(() => {
  //   setValue('canPurchase', remainingBalance >= 0);
  // }, []);
  // setValue('canPurchase', canPurchase);

  if (!document || !selectedPrinter) {
    return <div> huhu no info</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-between gap-4">
      <div className="scroll h-full w-full overflow-y-scroll">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Tệp
        </Typography>
        <Typography variant="body1" sx={{ pl: 1 }}>
          {document ? document.path : 'not uploaded'}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
          Máy in
        </Typography>
        <GridDisplayLayout
          data={[
            { label: 'Tên', value: selectedPrinter.name },
            {
              label: 'Vị trí',
              value:
                selectedPrinter.location.branch +
                ', ' +
                selectedPrinter.location.building,
            },
            { label: 'Khổ giấy tối đa', value: selectedPrinter.maxSize },
          ]}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
          Thông số in
        </Typography>
        <GridDisplayLayout
          data={[
            { label: 'Khổ in', value: paperSize },
            {
              label: 'Kiểu in',
              value: getValues('oneSided') ? 'Một mặt' : 'Hai mặt',
            },
            { label: 'Chiều giấy', value: getValues('orientation') },
            { label: 'Số bản sao', value: copies },
            {
              label: 'Trang in',
              value: getValues('pages') === '' ? 'Toàn bộ' : getValues('pages'),
            },
          ]}
        />
      </div>
      <div className="flex h-full w-full max-w-[800px] flex-col items-center justify-start gap-4 rounded-lg bg-primaryContainer px-2 ">
        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
          Chi phí
        </Typography>
        <div className="flex w-full items-center justify-between">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Hiện có
          </Typography>
          <div className="flex items-center gap-1">
            <Typography variant="h6">{DEFAULT_BALANCE}</Typography>
            <MonetizationOnIcon />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Hao phí
          </Typography>
          <div className="flex items-center gap-1">
            <Typography variant="h6">{`${copies} bản sao x ${DEFAULT_PAGES} trang x ${sizeScale} khổ in (${paperSize}) = ${toltalCost}`}</Typography>
            <MonetizationOnIcon />
          </div>
        </div>
        <Divider flexItem />
        <div
          className={`flex w-full items-center justify-between ${
            canPurchase ? 'text-green-700' : 'text-red-700'
          }`}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Còn lại
          </Typography>
          <div className="flex items-center gap-1">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {remainingBalance}
            </Typography>
            <MonetizationOnIcon />
          </div>
        </div>
        {!canPurchase && (
          <div className="w-full rounded-lg bg-red-100 text-red-700">
            <div className="flex items-center gap-2 px-4 py-2">
              <InfoIcon />
              <Typography variant="h6">
                Không đủ số dư, vui lòng thay đổi thông số in hoặc{' '}
                <a
                  className="cursor-pointer font-bold underline"
                  onClick={() => {
                    alert(
                      'Chức năng đang trong quá trình phát triển, xin thứ lỗi.',
                    );
                  }}
                >
                  mua thêm giấy.
                </a>
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ConfirmationView.propTypes = {
  document: PropTypes.object,
  selectedPrinter: PropTypes.object,
};
