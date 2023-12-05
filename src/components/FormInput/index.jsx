import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({ name, children, ...restProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...restProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? <>{errors[name].message}</> : ''}
        >
          {children}
        </TextField>
      )}
    />
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
  children: PropTypes.element,
};

export default FormInput;
