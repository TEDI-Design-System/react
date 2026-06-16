import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../../buttons/button/button';
import { Attachment } from './attachment';

describe('Attachment component', () => {
  it('renders the file name', () => {
    render(<Attachment name="invoice.pdf" />);
    expect(screen.getByText('invoice.pdf')).toBeInTheDocument();
  });

  it('renders the file-type icon when `icon` is set', () => {
    const { container } = render(<Attachment name="invoice.pdf" icon="description" />);
    expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
  });

  it('omits the icon by default', () => {
    const { container } = render(<Attachment name="invoice.pdf" />);
    expect(container.querySelector('.tedi-attachment__icon')).not.toBeInTheDocument();
  });

  it('renders meta text below the name', () => {
    render(<Attachment name="invoice.pdf" meta="1.2 MB" />);
    expect(screen.getByText('1.2 MB')).toBeInTheDocument();
  });

  it('renders the inline remove button when `onRemove` is provided', () => {
    const handleRemove = jest.fn();
    render(<Attachment name="invoice.pdf" onRemove={handleRemove} />);

    const removeButton = screen.getByRole('button', { name: /invoice\.pdf/ });
    expect(removeButton).toHaveAttribute('data-name', 'attachment-remove');
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('formats fileSize using the default formatter', () => {
    render(<Attachment name="invoice.pdf" fileSize={1_500_000} />);
    expect(screen.getByText(/1,4\s+MB/)).toBeInTheDocument();
  });

  it('uses a fixed unit when `fileSizeUnit` is set', () => {
    render(<Attachment name="invoice.pdf" fileSize={1_500_000} fileSizeUnit="KB" />);
    expect(screen.getByText(/1\s?464,8\s+KB/)).toBeInTheDocument();
  });

  it('uses custom `formatFileSize` when provided', () => {
    render(<Attachment name="invoice.pdf" fileSize={1_500_000} formatFileSize={(b) => `${b} bytes`} />);
    expect(screen.getByText(/1500000 bytes/)).toBeInTheDocument();
  });

  it('renders fileSize next to the remove button (not inline with meta)', () => {
    const { container } = render(<Attachment name="invoice.pdf" fileSize={1024} meta="PDF" />);
    expect(container.querySelector('.tedi-attachment__file-size')).toHaveTextContent(/1,0\s+KB/);
    expect(container.querySelector('.tedi-attachment__meta')).toHaveTextContent('PDF');
    expect(container.querySelector('.tedi-attachment__meta')).not.toHaveTextContent('KB');
  });

  it('uses a custom `removeIcon`', () => {
    const { container } = render(<Attachment name="invoice.pdf" onRemove={() => undefined} removeIcon="delete" />);
    expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
  });

  it('keeps the remove button visible while loading so the upload can be cancelled', () => {
    const handleRemove = jest.fn();
    render(<Attachment name="invoice.pdf" isLoading onRemove={handleRemove} />);
    const removeButton = screen.getByRole('button', { name: /invoice\.pdf/ });
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('renders a progress bar while loading and reflects the progress value', () => {
    render(<Attachment name="invoice.pdf" isLoading progress={42} onRemove={() => undefined} />);
    const bar = screen.getByRole('progressbar', { name: 'invoice.pdf' });
    expect(bar).toHaveAttribute('aria-valuenow', '42');
  });

  it('uses meta as the progress bar feedback when both are provided while loading', () => {
    render(<Attachment name="invoice.pdf" isLoading progress={10} meta="Üleslaadimine…" />);
    expect(screen.getByText('Üleslaadimine…')).toBeInTheDocument();
    expect(screen.queryByText('Üleslaadimine…')?.closest('.tedi-attachment__meta')).toBeNull();
  });

  it('does not render a progress bar when not loading', () => {
    render(<Attachment name="invoice.pdf" />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('applies the invalid modifier when `isValid` is false', () => {
    const { container } = render(<Attachment name="invoice.pdf" isValid={false} />);
    expect(container.firstChild).toHaveClass('tedi-attachment--invalid');
  });

  it('never renders the row itself as a single clickable target', () => {
    render(<Attachment name="invoice.pdf" onRemove={() => undefined} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders `actions` slot content alongside the remove button', () => {
    render(
      <Attachment
        name="invoice.pdf"
        actions={<button type="button">Download invoice.pdf</button>}
        onRemove={() => undefined}
      />
    );
    expect(screen.getByRole('button', { name: 'Download invoice.pdf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove invoice\.pdf/i })).toBeInTheDocument();
  });

  it('renders the `actions` slot even without a remove button', () => {
    const { container } = render(<Attachment name="invoice.pdf" actions={<button type="button">View</button>} />);
    const slot = container.querySelector('[data-name="attachment-actions"]');
    expect(slot).toBeInTheDocument();
    expect(slot).toContainElement(screen.getByRole('button', { name: 'View' }));
  });

  it('defaults action `Button`s to the neutral visual type', () => {
    render(
      <Attachment
        name="invoice.pdf"
        actions={
          <Button icon="download" onClick={() => undefined}>
            Download invoice.pdf
          </Button>
        }
      />
    );
    expect(screen.getByRole('button', { name: 'Download invoice.pdf' })).toHaveClass('tedi-btn--neutral');
  });

  it('defaults fragment-grouped action `Button`s to the neutral visual type', () => {
    render(
      <Attachment
        name="invoice.pdf"
        actions={
          <>
            <Button icon="visibility" onClick={() => undefined}>
              View invoice.pdf
            </Button>
            <Button icon="download" onClick={() => undefined}>
              Download invoice.pdf
            </Button>
          </>
        }
      />
    );
    expect(screen.getByRole('button', { name: 'View invoice.pdf' })).toHaveClass('tedi-btn--neutral');
    expect(screen.getByRole('button', { name: 'Download invoice.pdf' })).toHaveClass('tedi-btn--neutral');
  });

  it('keeps an explicit `visualType` on an action `Button` (slot stays open)', () => {
    render(
      <Attachment
        name="invoice.pdf"
        actions={
          <Button visualType="primary" icon="check" onClick={() => undefined}>
            Confirm invoice.pdf
          </Button>
        }
      />
    );
    const confirm = screen.getByRole('button', { name: 'Confirm invoice.pdf' });
    expect(confirm).toHaveClass('tedi-btn--primary');
    expect(confirm).not.toHaveClass('tedi-btn--neutral');
  });

  it('appends consumer className', () => {
    const { container } = render(<Attachment name="invoice.pdf" className="custom-class" />);
    expect(container.firstChild).toHaveClass('tedi-attachment custom-class');
  });

  it('applies the multi-line modifier when meta is set so the icon stays parallel with the name', () => {
    const { container } = render(<Attachment name="invoice.pdf" meta="PDF" />);
    expect(container.firstChild).toHaveClass('tedi-attachment--multi-line');
  });

  it('omits the multi-line modifier when there is no meta', () => {
    const { container } = render(<Attachment name="invoice.pdf" />);
    expect(container.firstChild).not.toHaveClass('tedi-attachment--multi-line');
  });

  it('renders feedback below the card and wires aria-describedby', () => {
    const { container } = render(
      <Attachment name="invoice.pdf" feedback={{ text: 'Fail on liiga suur', type: 'error' }} />
    );
    const card = container.querySelector('.tedi-attachment');
    const feedbackId = card?.getAttribute('aria-describedby');
    expect(feedbackId).toBeTruthy();
    expect(screen.getByText('Fail on liiga suur')).toBeInTheDocument();
    expect(document.getElementById(feedbackId!)).toHaveTextContent('Fail on liiga suur');
  });

  it('does not set aria-describedby when feedback is omitted', () => {
    const { container } = render(<Attachment name="invoice.pdf" />);
    expect(container.firstChild).not.toHaveAttribute('aria-describedby');
  });

  it('does not put feedback text inside the card surface', () => {
    const { container } = render(
      <Attachment name="invoice.pdf" feedback={{ text: 'Fail on liiga suur', type: 'error' }} />
    );
    const card = container.querySelector('.tedi-attachment');
    expect(card).not.toHaveTextContent('Fail on liiga suur');
  });
});
