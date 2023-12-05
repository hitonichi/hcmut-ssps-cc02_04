import PropTypes from 'prop-types';
import { useState } from 'react';
import useTransition from 'react-transition-state';
import { ToastService } from '../../services/ToastService';
import { useEffect } from 'react';
import Toast from './Toast';

const Toaster = ({ className }) => {
  const twClasses = `fixed top-0 right-0 p-4 w-full max-w-[437px] z-10 pointer-events-none flex flex-col gap-2`;
  const classNames = [className, twClasses].join(' ');

  const [toasts, setToasts] = useState(ToastService.toasts);
  const [toast, setToast] = useState(undefined);
  const [transitionState, toggleTransitionState] = useTransition({
    timeout: 500,
    preEnter: true,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  // mount setToasts to ToastService to update local state whenever ToastService updates
  useEffect(() => {
    ToastService.setOnUpdate(() => {
      setToasts(ToastService.toasts);
    });
  }, []);

  useEffect(() => {
    if (toasts?.length) {
      setToast(toasts[0]);
      toggleTransitionState(true);
    } else {
      setToast(undefined);
    }
  }, [toasts]);

  useEffect(() => {
    if (transitionState.status == 'unmounted')
      ToastService.removeToast(toast?.id);
  }, [transitionState]);

  const onDismiss = () => {
    toggleTransitionState(false);
  };

  return (
    <div className={classNames}>
      {transitionState.isMounted && (
        <Toast
          title={toast.title}
          onDismiss={onDismiss}
          className={[toast?.className, transitionState.status].join(' ')}
        />
      )}
    </div>
  );
};

Toaster.propTypes = {
  className: PropTypes.string,
};

export default Toaster;
