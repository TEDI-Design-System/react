import { useEffect, useRef } from 'react';
import { Slide, toast, ToastContainer as ToastifyContainer, ToastContainerProps, ToastOptions } from 'react-toastify';

import { useLabels } from '../../../providers/label-provider';
import { Alert, AlertProps } from '../alert/alert';
import styles from './toast.module.scss';

import 'react-toastify/dist/ReactToastify.css';

const toastDefaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 6000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
  // The Alert inside owns the live region, so the focusable toast wrapper must not be one.
  role: 'group',
};

export const sendNotification = (props: AlertProps, toastOptions?: ToastOptions) => {
  const mergedToastOptions: ToastOptions = {
    ...toastDefaultOptions,
    ...toastOptions,
    progressClassName: `${styles['tedi-toast__progress']} ${styles[`tedi-toast__progress--${props.type}`]}`,
  };

  const id = toast(
    () => (
      <Alert
        data-name="toast"
        {...props}
        onClose={() => {
          props.onClose?.();
          toast.dismiss(id);
        }}
        className={styles['tedi-toast']}
      >
        {props.children}
      </Alert>
    ),
    mergedToastOptions
  );
};

export const ToastContainer = (props: ToastContainerProps) => {
  const { getLabel } = useLabels();
  const ref = useRef<HTMLDivElement>(null);

  // react-toastify hardcodes aria-live="polite" on its <section> with no prop to turn it off.
  // Left on, every added toast is announced with its button names on top of the Alert's own live region.
  useEffect(() => {
    ref.current?.querySelector('section.Toastify')?.setAttribute('aria-live', 'off');
  }, []);

  return (
    <div ref={ref} className={styles['tedi-toast-container']}>
      <ToastifyContainer aria-label={getLabel('toast.region')} role="group" {...props} />
    </div>
  );
};
