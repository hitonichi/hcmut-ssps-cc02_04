import PropTypes from 'prop-types';
import { useEffect } from 'react';

const TOAST_DURATION_MS = 1000;

const Toast = ({ title, onDismiss, className }) => {
  const twClasses = 'toast pointer-events-auto bg-blue-100';
  const classNames = [twClasses, className].join(' ');

  useEffect(() => {
    setTimeout(() => {
      onDismiss && onDismiss();
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <div className={classNames}>
      <div>{title}</div>
      <div>This is a toast</div>
      <button onClick={() => onDismiss()} className="btn-primary">
        X
      </button>
    </div>
  );
};

Toast.propTypes = {
  title: PropTypes.string,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
};

export default Toast;
