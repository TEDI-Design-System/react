import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

import { Sheet } from './sheet';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => (key === 'close' ? 'Close' : `Mocked label: ${key}`)),
  })),
}));

describe('Sheet', () => {
  it('opens on trigger click and renders body content', () => {
    render(
      <Sheet>
        <Sheet.Trigger>
          <button type="button">Open</button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body content</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('wires the header title to the dialog via aria-labelledby', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Title text" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)).toHaveTextContent('Title text');
  });

  it('falls back to aria-label when no header title is set', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content aria-label="Themes">
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Themes');
  });

  it('closes when the header close button is clicked', async () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on Escape', async () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('renders the drag handle by default and hides it when showHandle is false', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[data-name="sheet-handle"]')).toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content showHandle={false}>
          <Sheet.Header title="Layers" />
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[data-name="sheet-handle"]')).not.toBeInTheDocument();
  });

  it('collapses the body and footer via the header toggle', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body content</Sheet.Body>
          <Sheet.Footer>Footer content</Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByText('Body content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    expect(screen.queryByText('Footer content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.expand' }));
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('closes via Sheet.Closer while calling the child onClick first', async () => {
    const onClick = jest.fn();
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body>Body</Sheet.Body>
          <Sheet.Footer>
            <Sheet.Closer>
              <button type="button" onClick={onClick}>
                Cancel
              </button>
            </Sheet.Closer>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('supports controlled open state', async () => {
    const ControlledSheet = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Sheet open={open} onToggle={setOpen}>
            <Sheet.Content>
              <Sheet.Header title="Layers" />
              <Sheet.Body>Body content</Sheet.Body>
            </Sheet.Content>
          </Sheet>
        </>
      );
    };
    render(<ControlledSheet />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('renders header slot content before the actions', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" slot={<span>Slot content</span>} />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByText('Slot content')).toBeInTheDocument();
  });

  it('applies the centre-title modifier only when centerTitle is set', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__header--center"]')).not.toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" centerTitle />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__header--center"]')).toBeInTheDocument();
  });

  it('removes the panel from the DOM while closed by default', () => {
    render(
      <Sheet>
        <Sheet.Content>
          <Sheet.Body>Persisted body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(document.querySelector('[class*="tedi-sheet__panel"]')).not.toBeInTheDocument();
  });

  it('keeps the panel mounted (hidden, inert) while closed when keepMounted is set', () => {
    render(
      <Sheet>
        <Sheet.Content keepMounted>
          <Sheet.Body>Persisted body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const panel = document.querySelector('[class*="tedi-sheet__panel"]');
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('hidden');
    expect(panel).toHaveTextContent('Persisted body');
  });

  it('sizes a bottom sheet to the tallest snap point when snapPoints is set', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content snapPoints={[0.4, 0.9]}>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const panel = document.querySelector<HTMLElement>('[class*="tedi-sheet__panel"]');
    expect(panel).toHaveStyle({ height: '90dvh' });
  });
});
