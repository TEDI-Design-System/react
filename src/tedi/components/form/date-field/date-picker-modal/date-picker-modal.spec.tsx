import { fireEvent, render, screen } from '@testing-library/react';

import { DatePickerModal, DatePickerModalProps } from './date-picker-modal';

import '@testing-library/jest-dom';

jest.mock('../../../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: (key: string) => key }),
}));

const JUNE_15 = new Date(2026, 5, 15);
const monthLabel = (date: Date): string => date.toLocaleString('et-EE', { month: 'long' });

const setup = (overrides: Partial<DatePickerModalProps> = {}) => {
  const onOpenChange = jest.fn();
  const onConfirm = jest.fn();
  render(<DatePickerModal open onOpenChange={onOpenChange} onConfirm={onConfirm} value={JUNE_15} {...overrides} />);
  return { onOpenChange, onConfirm };
};

describe('DatePickerModal', () => {
  it('renders the dialog with confirm / cancel actions when open', () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'date-field.confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'date-field.cancel' })).toBeInTheDocument();
  });

  it('does not render the dialog when closed', () => {
    setup({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('falls back to the localised modal title', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'date-field.modal-title' })).toBeInTheDocument();
  });

  it('uses a custom title when provided', () => {
    setup({ title: 'Vali kuupäev' });
    expect(screen.getByRole('heading', { name: 'Vali kuupäev' })).toBeInTheDocument();
  });

  it('confirms the seeded value and closes', () => {
    const { onConfirm, onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'date-field.confirm' }));
    expect(onConfirm).toHaveBeenCalledWith(JUNE_15);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables confirm and blocks closing when required with no selection', () => {
    const { onConfirm, onOpenChange } = setup({ required: true, value: undefined });
    const confirm = screen.getByRole('button', { name: 'date-field.confirm' });
    expect(confirm).toBeDisabled();
    fireEvent.click(confirm);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('cancel closes without confirming (draft discarded)', () => {
    const { onConfirm, onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'date-field.cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('commits the day picked in the calendar as the draft on confirm', () => {
    const { onConfirm } = setup();
    fireEvent.click(screen.getByText('10'));
    fireEvent.click(screen.getByRole('button', { name: 'date-field.confirm' }));
    const picked = onConfirm.mock.calls[0][0] as Date;
    expect(picked).toBeInstanceOf(Date);
    expect(picked.getDate()).toBe(10);
    expect(picked.getMonth()).toBe(5);
  });

  it('seeds the initial month from a range value (the `from` date)', () => {
    setup({ mode: 'range', value: { from: new Date(2026, 2, 3), to: new Date(2026, 2, 20) } });
    expect(screen.getByText(monthLabel(new Date(2026, 2, 1)))).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('seeds the initial month from the earliest date in an array value', () => {
    setup({ mode: 'multiple', value: [new Date(2026, 1, 20), new Date(2026, 1, 4)] });
    expect(screen.getByText(monthLabel(new Date(2026, 1, 1)))).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('falls back to initialMonth when there is no value', () => {
    setup({ value: undefined, initialMonth: new Date(2025, 0, 1) });
    expect(screen.getByText(monthLabel(new Date(2025, 0, 1)))).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });
});
