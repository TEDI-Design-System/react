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
  pauseOnFocusLoss: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
};

export const sendNotification = (props: AlertProps, toastOptions?: ToastOptions) => {
  const toastRole =
    props.role === 'alert' || props.role === 'status' ? props.role : props.type === 'danger' ? 'alert' : 'status';

  const mergedToastOptions: ToastOptions = {
    ...toastDefaultOptions,
    role: toastRole,
    ...toastOptions,
    progressClassName: `${styles['tedi-toast__progress']} ${styles[`tedi-toast__progress--${props.type}`]}`,
  };

  const id = toast(
    () => (
      <div
        className={styles['tedi-toast__focus-wrapper']}
        onFocus={() => toast.pause({ id })}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            toast.play({ id });
          }
        }}
      >
        <Alert
          data-name="toast"
          {...props}
          role="none"
          onClose={() => {
            props.onClose?.();
            toast.dismiss(id);
          }}
          className={styles['tedi-toast']}
        >
          {props.children}
        </Alert>
      </div>
    ),
    mergedToastOptions
  );
};

export { ToastContainer };
