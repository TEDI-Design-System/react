import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { toast, ToastContainerProps } from 'react-toastify';

import { LabelProvider } from '../../../providers/label-provider';
import { sendNotification, ToastContainer } from './toast';

import 'react-toastify/dist/ReactToastify.css';

const liveRegionSelector = '[role="alert"], [role="status"], [aria-live]:not([aria-live="off"])';

const renderContainer = (props?: ToastContainerProps) =>
  render(
    <LabelProvider locale="et">
      <ToastContainer {...props} />
    </LabelProvider>
  );

describe('Toast Component', () => {
  describe('announcements', () => {
    afterEach(() => {
      act(() => {
        toast.dismiss();
      });
    });

    test.each(['alert', 'status'] as const)(
      'exposes only title and message in a single %s live region',
      async (role) => {
        const { container } = renderContainer();

        act(() => {
          sendNotification({ title: 'Saved', children: 'Changes stored', role, onClose: jest.fn() });
        });

        const closeButton = await screen.findByRole('button', { name: 'Sulge' });
        const liveRegions = container.querySelectorAll(liveRegionSelector);

        expect(liveRegions).toHaveLength(1);
        expect(liveRegions[0]).toHaveAttribute('role', role);
        expect(liveRegions[0]).toHaveTextContent('Saved');
        expect(liveRegions[0]).toHaveTextContent('Changes stored');
        expect(closeButton.closest(liveRegionSelector)).toBeNull();
      }
    );

    test('keeps a custom action outside the live region', async () => {
      const { container } = renderContainer();

      act(() => {
        sendNotification({ title: 'Saved', children: 'Changes stored', action: <button>Undo</button> });
      });

      const action = await screen.findByRole('button', { name: 'Undo' });

      expect(container.querySelectorAll(liveRegionSelector)).toHaveLength(1);
      expect(action.closest(liveRegionSelector)).toBeNull();
    });

    test('renders the toast wrapper as a focusable group instead of a live region', async () => {
      const { container } = renderContainer();

      act(() => {
        sendNotification({ title: 'Saved', children: 'Changes stored' });
      });

      await screen.findByText('Saved');

      expect(container.querySelector('section.Toastify')).toHaveAttribute('aria-live', 'off');
      expect(container.querySelector('.Toastify__toast')).toHaveAttribute('role', 'group');
      expect(container.querySelector('.Toastify__toast')).toHaveAttribute('tabindex', '0');
    });

    test('keeps toasts sent through toast() as a group, not a live region', async () => {
      const { container } = renderContainer();

      act(() => {
        toast('Plain toast');
      });

      await screen.findByText('Plain toast');

      expect(container.querySelector('.Toastify__toast')).toHaveAttribute('role', 'group');
      expect(container.querySelectorAll(liveRegionSelector)).toHaveLength(0);
    });
  });

  describe('container label', () => {
    test('names the container region with the translated label', () => {
      renderContainer();

      expect(screen.getByRole('region', { name: 'Teavitused' })).toBeInTheDocument();
    });

    test('lets a consumer aria-label override the translated label', () => {
      renderContainer({ 'aria-label': 'Custom' });

      expect(screen.getByRole('region', { name: 'Custom' })).toBeInTheDocument();
    });
  });
});
