import { render, screen } from '@testing-library/react';

import { SheetModal } from './sheet-modal';

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => (key === 'close' ? 'Close' : `Mocked label: ${key}`)),
  })),
}));

describe('SheetModal', () => {
  it('names the dialog from the rendered title', () => {
    render(
      <SheetModal defaultOpen title="Steps">
        Body
      </SheetModal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Steps');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(document.getElementById(labelledBy as string)).toHaveTextContent('Steps');
  });

  it('keeps an accessible name from aria-label when the title renders empty', () => {
    render(
      <SheetModal defaultOpen title={false && 'Steps'} ariaLabel="Steps">
        Body
      </SheetModal>
    );

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Steps');
  });
});
