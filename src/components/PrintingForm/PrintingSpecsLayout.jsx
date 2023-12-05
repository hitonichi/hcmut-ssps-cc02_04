import PropTypes from 'prop-types';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function PrintingSpecsLayout({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-between gap-4">
      <div className="scroll h-full w-full overflow-y-scroll">{children}</div>
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-center gap-4 rounded-lg bg-gray-300">
        <AccessAlarmIcon sx={{ color: 'gray', fontSize: '72px' }} />
        <p className=" text-gray-700">
          Document view feature will is will be available soon.
        </p>
      </div>
    </div>
  );
}

PrintingSpecsLayout.propTypes = {
  children: PropTypes.element,
};
