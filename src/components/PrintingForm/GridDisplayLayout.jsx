import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function GridDisplayLayout({ data }) {
  return (
    <div className="flex w-full flex-col gap-2 pl-2">
      {data.map(({ label, value }) => (
        <div key={label} className="grid w-full grid-cols-3">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {label}
          </Typography>
          <Typography variant="body1">{value}</Typography>
        </div>
      ))}
    </div>
  );
}

GridDisplayLayout.propTypes = {
  data: PropTypes.array,
};
