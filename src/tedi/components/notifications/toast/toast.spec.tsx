import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { sendNotification } from './toast';

import 'react-toastify/dist/ReactToastify.css';

describe('Toast Component', () => {
  test('renders a toast notification when sendNotification is called', async () => {
    render(<ToastContainer />);

    act(() => {
      toast('Default Toast Message');
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Default Toast Message')).toBeInTheDocument();
    });
  });

  test('closes the toast notification when close button is clicked', async () => {
    render(<ToastContainer />);

    act(() => {
      toast('Default Toast');
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: 'close' });
    act(() => {
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});

describe('sendNotification', () => {
  afterEach(() => {
    act(() => {
      toast.dismiss();
    });
    jest.restoreAllMocks();
  });

  test('renders the title and body through the Alert', async () => {
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'success', title: 'Saved', children: 'Everything worked' });
    });

    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
      expect(screen.getByText('Everything worked')).toBeInTheDocument();
    });
  });

  test('renders the inner alert as presentational so it is not a competing live region', async () => {
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'success', title: 'Saved', children: 'ok' });
    });

    await waitFor(() => {
      const alert = document.querySelector('[data-name="toast"]');
      expect(alert).toHaveAttribute('role', 'none');
      expect(alert).not.toHaveAttribute('aria-live');
    });
  });

  test('maps a non-danger severity to a polite status region', async () => {
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'info', title: 'Heads up', children: 'text' });
    });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  test('maps a danger severity to an assertive alert region', async () => {
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'danger', title: 'Error', children: 'text' });
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  test('lets an explicit role prop override the severity mapping', async () => {
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'danger', title: 'Error', children: 'text', role: 'status' });
    });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  test('calls the consumer onClose and dismisses the toast when closed', async () => {
    const onClose = jest.fn();
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'success', title: 'Saved', children: 'ok', onClose });
    });

    const closeButton = await screen.findByRole('button', { name: 'close' });
    act(() => {
      fireEvent.click(closeButton);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('takes the toast container out of the tab order so it is not focusable itself', async () => {
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'info', title: 'Heads up', children: 'ok' });
    });

    await waitFor(() => {
      const container = document.querySelector('.Toastify__toast');
      expect(container).not.toBeNull();
      expect(container).toHaveAttribute('tabindex', '-1');
    });
  });

  test('pauses the timer on keyboard focus and resumes when focus leaves the toast', async () => {
    const pauseSpy = jest.spyOn(toast, 'pause');
    const playSpy = jest.spyOn(toast, 'play');
    render(<ToastContainer />);

    act(() => {
      sendNotification({ type: 'info', title: 'Heads up', children: 'ok' });
    });

    const closeButton = await screen.findByRole('button', { name: 'close' });

    act(() => {
      fireEvent.focusIn(closeButton);
    });
    expect(pauseSpy).toHaveBeenCalled();

    act(() => {
      fireEvent.focusOut(closeButton, { relatedTarget: closeButton.parentElement });
    });
    const playCallsWhileInside = playSpy.mock.calls.length;

    act(() => {
      fireEvent.focusOut(closeButton, { relatedTarget: document.body });
    });
    expect(playSpy.mock.calls.length).toBeGreaterThan(playCallsWhileInside);
  });
});
