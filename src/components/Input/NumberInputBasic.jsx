import * as React from 'react';
import PropTypes from 'prop-types';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';
import './NumberInput.css';
// const NumberInputBasic = () => {
//   const [value, setValue] = React.useState();
//   return (
//     <NumberInput
//       aria-label="Demo number input"
//       placeholder="Nhập số trang..."
//       value={value}
//       onChange={(event, val) => setValue(val)}
//       min={0}
//       max={1000}
//     />
//   );
// };

const resolveSlotProps = (fn, args) =>
  typeof fn === 'function' ? fn(args) : fn;

const NumberInput = React.forwardRef(function NumberInput(props, ref) {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900  border border-solid  bg-white   hover:border-blue-400 focus-visible:outline-0 p-1',
              ownerState.focused ? 'border-blue-400  ' : 'border-slate-300 ',
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit]  px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        incrementButton: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.incrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▴',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-t-md border-slate-200 bg-slate-50  text-slate-900  transition-all duration-[120ms] hover:cursor-pointer hover:bg-blue-500 hover:text-slate-50   col-start-3 col-end-3 row-start-1 row-end-2',
              resolvedSlotProps?.className,
            ),
          };
        },
        decrementButton: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.decrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▾',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-b-md border-slate-200 border-t-0 bg-slate-50   transition-all duration-[120ms] hover:cursor-pointer hover:bg-blue-500 hover:text-slate-50   col-start-3 col-end-3 row-start-2 row-end-3',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

NumberInput.propTypes = {
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps: PropTypes.shape({
    decrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    incrementButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};

export default NumberInput;
