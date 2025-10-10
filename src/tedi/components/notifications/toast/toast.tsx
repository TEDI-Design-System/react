import { Slide, toast, ToastContainer, ToastOptions } from 'react-toastify';

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
      >
        {props.children}
      </Alert>
    ),
    mergedToastOptions
  );
};

export { ToastContainer };
