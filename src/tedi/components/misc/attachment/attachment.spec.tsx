import { fireEvent, render, screen } from '@testing-library/react';

import { Breakpoint } from '../../../helpers';
import { Button } from '../../buttons/button/button';
import { Attachment } from './attachment';

const mockUseBreakpoint = jest.fn<Breakpoint, []>(() => 'lg');

jest.mock('../../../helpers', () => ({
  __esModule: true,
  ...jest.requireActual('../../../helpers'),
  useBreakpoint: () => mockUseBreakpoint(),
}));

describe('Attachment component', () => {
  beforeEach(() => {
    mockUseBreakpoint.mockReturnValue('lg');
  });

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

  it('renders the pre-formatted fileSize string on the file-name line', () => {
    const { container } = render(<Attachment name="invoice.pdf" fileSize="1,4 MB" />);
    expect(container.querySelector('.tedi-attachment__file-size')).toHaveTextContent('1,4 MB');
  });

  it('keeps action buttons visible while loading so the upload can be cancelled', () => {
    const handleRemove = jest.fn();
    render(
      <Attachment
        name="invoice.pdf"
        isLoading
        actions={
          <Button icon="delete" onClick={handleRemove}>
            Eemalda invoice.pdf
          </Button>
        }
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Eemalda invoice.pdf' }));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('renders a progress bar while loading and reflects the progress value', () => {
    render(<Attachment name="invoice.pdf" isLoading progress={42} />);
    const bar = screen.getByRole('progressbar', { name: 'invoice.pdf' });
    expect(bar).toHaveAttribute('aria-valuenow', '42');
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
    render(<Attachment name="invoice.pdf" actions={<button type="button">Eemalda invoice.pdf</button>} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders multiple `actions` slot buttons', () => {
    render(
      <Attachment
        name="invoice.pdf"
        actions={
          <>
            <button type="button">Download invoice.pdf</button>
            <button type="button">Eemalda invoice.pdf</button>
          </>
        }
      />
    );
    expect(screen.getByRole('button', { name: 'Download invoice.pdf' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Eemalda invoice.pdf' })).toBeInTheDocument();
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

  it('applies the multi-line modifier while loading so the icon stays parallel with the name', () => {
    const { container } = render(<Attachment name="invoice.pdf" isLoading progress={10} />);
    expect(container.firstChild).toHaveClass('tedi-attachment--multi-line');
  });

  it('omits the multi-line modifier when not loading', () => {
    const { container } = render(<Attachment name="invoice.pdf" />);
    expect(container.firstChild).not.toHaveClass('tedi-attachment--multi-line');
  });

  it('auto-switches to vertical below `verticalBelow` (default sm)', () => {
    mockUseBreakpoint.mockReturnValue('xs');
    const { container } = render(<Attachment name="invoice.pdf" />);
    expect(container.firstChild).toHaveClass('tedi-attachment--vertical');
  });

  it('stays horizontal at or above the breakpoint, and honours a custom `verticalBelow`', () => {
    const { container, rerender } = render(<Attachment name="invoice.pdf" />);
    expect(container.firstChild).not.toHaveClass('tedi-attachment--vertical');

    rerender(<Attachment name="invoice.pdf" verticalBelow="xl" />);
    expect(container.firstChild).toHaveClass('tedi-attachment--vertical');
  });

  it('lets `direction` force the layout regardless of viewport', () => {
    mockUseBreakpoint.mockReturnValue('lg');
    const { container, rerender } = render(<Attachment name="invoice.pdf" direction="vertical" />);
    expect(container.firstChild).toHaveClass('tedi-attachment--vertical');

    mockUseBreakpoint.mockReturnValue('xs');
    rerender(<Attachment name="invoice.pdf" direction="horizontal" />);
    expect(container.firstChild).not.toHaveClass('tedi-attachment--vertical');
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
