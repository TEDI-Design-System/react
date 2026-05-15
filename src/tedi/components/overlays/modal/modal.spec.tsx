import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { Modal } from './modal';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => (key === 'close' ? 'Close' : `Mocked label: ${key}`)),
  })),
}));

describe('Modal', () => {
  it('opens on trigger click and renders body content', () => {
    render(
      <Modal>
        <Modal.Trigger>
          <button type="button">Open</button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header title="Hello" />
          <Modal.Body>Body content</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('wires title to aria-labelledby and description to aria-describedby', () => {
    render(
      <Modal defaultOpen>
        <Modal.Content>
          <Modal.Header title="Title text" description="Description text" />
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    const describedBy = dialog.getAttribute('aria-describedby');

    expect(labelledBy).toBeTruthy();
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toHaveTextContent('Title text');
    expect(document.getElementById(describedBy!)).toHaveTextContent('Description text');
  });

  it('closes when the header close button is clicked', () => {
    const onToggle = jest.fn();
    render(
      <Modal defaultOpen onToggle={onToggle}>
        <Modal.Content>
          <Modal.Header title="Title" />
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    fireEvent.click(screen.getByTitle('Close'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('Modal.Closer wraps its child and closes the modal on click', () => {
    const onToggle = jest.fn();
    render(
      <Modal defaultOpen onToggle={onToggle}>
        <Modal.Content>
          <Modal.Body>
            <Modal.Closer>
              <button type="button">Custom close</button>
            </Modal.Closer>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    fireEvent.click(screen.getByText('Custom close'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('does not close on Escape when closeOnEscape is false', () => {
    const onToggle = jest.fn();
    render(
      <Modal defaultOpen onToggle={onToggle} closeOnEscape={false}>
        <Modal.Content>
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders split footer when `left` is provided', () => {
    render(
      <Modal defaultOpen>
        <Modal.Content>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer left={<button type="button">Delete</button>}>
            <button type="button">Save</button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('uses aria-label as the accessible-name fallback when no header title is set', () => {
    render(
      <Modal defaultOpen>
        <Modal.Content aria-label="Confirm action">
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Confirm action');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('prefers aria-labelledby (from Modal.Header) over aria-label when both are present', () => {
    render(
      <Modal defaultOpen>
        <Modal.Content aria-label="Fallback name">
          <Modal.Header title="Real title" />
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).not.toHaveAttribute('aria-label');
  });

  it('sets role="alertdialog" when role="alertdialog" is passed to Modal', () => {
    render(
      <Modal defaultOpen role="alertdialog">
        <Modal.Content>
          <Modal.Header title="Confirm" />
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('applies mobile-first cascade for BreakpointSupport props (md override skipped at xs)', () => {
    // jest-mocks stubs matchMedia to always return `matches: false`, so useBreakpoint
    // resolves to 'xs'. With `position="right" md={{ position: 'center' }}`, the xs
    // base wins because the md override only kicks in at md and above.
    render(
      <Modal defaultOpen>
        <Modal.Content position="right" md={{ position: 'center' }}>
          <Modal.Body>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    expect(overlay?.className).toMatch(/position-right/);
    expect(overlay?.className).not.toMatch(/position-center/);
  });

  it('supports controlled open state', () => {
    function Wrapper() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            External open
          </button>
          <Modal open={open} onToggle={setOpen}>
            <Modal.Content>
              <Modal.Body>Controlled body</Modal.Body>
            </Modal.Content>
          </Modal>
        </>
      );
    }

    render(<Wrapper />);
    expect(screen.queryByText('Controlled body')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('External open'));
    expect(screen.getByText('Controlled body')).toBeInTheDocument();
  });
});
