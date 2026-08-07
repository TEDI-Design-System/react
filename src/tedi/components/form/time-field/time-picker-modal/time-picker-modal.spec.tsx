import { fireEvent, render, screen } from '@testing-library/react';

import { TimePickerModal, TimePickerModalProps } from './time-picker-modal';

import '@testing-library/jest-dom';

jest.mock('../../../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: (key: string) => key }),
}));

beforeAll(() => {
  Element.prototype.scrollTo = jest.fn();
});

const setup = (overrides: Partial<TimePickerModalProps> = {}) => {
  const onOpenChange = jest.fn();
  const onConfirm = jest.fn();
  render(<TimePickerModal open onOpenChange={onOpenChange} onConfirm={onConfirm} value="10:30" {...overrides} />);
  return { onOpenChange, onConfirm };
};

describe('TimePickerModal', () => {
  it('renders the dialog with confirm / cancel actions when open', () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'time-field.confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'time-field.cancel' })).toBeInTheDocument();
  });

  it('does not render the dialog when closed', () => {
    setup({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('falls back to the localised modal title', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'time-field.modal-title' })).toBeInTheDocument();
  });

  it('uses a custom title when provided', () => {
    setup({ title: 'Vali aeg' });
    expect(screen.getByRole('heading', { name: 'Vali aeg' })).toBeInTheDocument();
  });

  it('confirms the seeded value and closes', () => {
    const { onConfirm, onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'time-field.confirm' }));
    expect(onConfirm).toHaveBeenCalledWith('10:30');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('cancel closes without confirming (draft discarded)', () => {
    const { onConfirm, onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'time-field.cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('closes via the header close button', () => {
    const { onConfirm, onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('does not confirm an empty draft when there is no value', () => {
    const { onConfirm, onOpenChange } = setup({ value: undefined });
    fireEvent.click(screen.getByRole('button', { name: 'time-field.confirm' }));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('commits a time picked in the grid as the draft on confirm', () => {
    const { onConfirm } = setup({
      value: undefined,
      availableTimes: ['09:00', '09:30', '10:00'],
      gridVariant: 'button',
    });
    fireEvent.click(screen.getByText('09:30'));
    fireEvent.click(screen.getByRole('button', { name: 'time-field.confirm' }));
    expect(onConfirm).toHaveBeenCalledWith('09:30');
  });
});
