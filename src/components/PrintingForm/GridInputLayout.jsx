import PropTypes from 'prop-types';

export default function GridInputLayout({ children, label }) {
  return (
    <div className="grid w-full grid-cols-3 items-start justify-start gap-4 pl-2">
      <div className="flex h-[40px] items-center">{label}</div>
      <div>{children}</div>
      {/* <div className="h-full w-full ">{label}</div>
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-center gap-4 rounded-lg bg-gray-300">
        {children}
      </div> */}
    </div>
  );
}

GridInputLayout.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
};
