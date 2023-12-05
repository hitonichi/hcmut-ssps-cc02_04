import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function PillButton({ sx, children, ...restProps }) {
  return (
    <Button
      sx={{ ...sx, borderRadius: 9999, textTransform: 'none', px: 3 }}
      {...restProps}
    >
      {children}
    </Button>
  );
}

PillButton.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.element,
};
