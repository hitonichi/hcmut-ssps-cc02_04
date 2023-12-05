import PropTypes from 'prop-types';

export default function FormContentContainer({ children }) {
  return (
    <div className="flex h-full w-full justify-start">
      <div className="w-full">{children}</div>
    </div>
  );
}

FormContentContainer.propTypes = {
  children: PropTypes.element,
};
