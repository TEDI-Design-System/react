import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Alert, AlertProps } from './alert';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
  useIsMounted: jest.fn(() => true),
}));

describe('Alert component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders the alert with default props', () => {
    render(<Alert>Default Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('tedi-alert tedi-alert--info');
  });

  it('renders a custom class name', () => {
    render(<Alert className="custom-class">Custom Class Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert custom-class');
  });

  it('renders with a title', () => {
    render(<Alert title="Alert Title">Alert Content</Alert>);

    const title = screen.getByText('Alert Title');
    const content = screen.getByText('Alert Content');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('renders an icon when provided', () => {
    const { container } = render(<Alert icon="info">Alert with Icon</Alert>);

    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon');
    expect(iconElement).toHaveClass('tedi-icon--size-18');
  });

  it('renders the icon alongside the title in the head row', () => {
    const { container } = render(
      <Alert icon="info" title="Alert Title">
        Alert Content
      </Alert>
    );

    const icon = container.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();

    const headRow = icon?.closest('.tedi-alert__content');
    expect(headRow).toContainElement(screen.getByText('Alert Title'));
    expect(headRow).not.toContainElement(screen.getByText('Alert Content'));
  });

  it('applies global styles when isGlobal is true', () => {
    render(<Alert isGlobal>Global Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--global');
  });

  it('removes side borders when noSideBorders is true', () => {
    render(<Alert noSideBorders>Alert without Side Borders</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--no-side-borders');
  });

  it('renders a close button when onClose is provided', () => {
    const onCloseMock = jest.fn();
    render(<Alert onClose={onCloseMock}>Closable Alert</Alert>);

    const closeButton = screen.getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when onClose is not provided', () => {
    render(<Alert>No Close Button</Alert>);

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('renders the `action` slot in place of the default close button', () => {
    const onCloseMock = jest.fn();
    render(
      <Alert onClose={onCloseMock} action={<button type="button">Open profile</button>}>
        Custom action
      </Alert>
    );

    expect(screen.getByRole('button', { name: 'Open profile' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('renders the `action` slot even without `onClose`', () => {
    render(<Alert action={<a href="/x">Read more</a>}>Custom action only</Alert>);
    expect(screen.getByRole('link', { name: 'Read more' })).toBeInTheDocument();
  });

  it('sets aria-live based on role prop', () => {
    render(<Alert role="status">Status Alert</Alert>);

    const alert = screen.getByRole('status');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('sets aria-live assertive for role="alert"', () => {
    render(<Alert role="alert">Alert</Alert>);

    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders presentational (role="none") without live-region or name semantics', () => {
    const { container } = render(
      <Alert role="none" title="Presentational">
        Body
      </Alert>
    );

    const alert = container.querySelector('[data-name="alert"]');
    expect(alert).toHaveAttribute('role', 'none');
    expect(alert).not.toHaveAttribute('aria-live');
    expect(alert).not.toHaveAttribute('aria-label');
    expect(alert).not.toHaveAttribute('aria-labelledby');
  });

  it('does not let forwarded aria-* props re-add live-region semantics to a presentational alert', () => {
    const injected = {
      role: 'none',
      'aria-live': 'assertive',
      'aria-label': 'Injected',
      'aria-labelledby': 'somewhere',
    } as unknown as AlertProps;

    const { container } = render(<Alert {...injected}>Body</Alert>);

    const alert = container.querySelector('[data-name="alert"]');
    expect(alert).not.toHaveAttribute('aria-live');
    expect(alert).not.toHaveAttribute('aria-label');
    expect(alert).not.toHaveAttribute('aria-labelledby');
  });

  it('names the alert via its title (aria-labelledby) and drops the fallback aria-label', () => {
    render(<Alert title="Payment failed">Body</Alert>);

    const alert = screen.getByRole('alert');
    const labelledBy = alert.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)).toHaveTextContent('Payment failed');
    expect(alert).not.toHaveAttribute('aria-label');
  });

  it('falls back to a generated aria-label when there is no title', () => {
    render(<Alert type="success">Body</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-label', 'success alert');
    expect(alert).not.toHaveAttribute('aria-labelledby');
  });

  it('renders with danger type and applies correct class', () => {
    render(<Alert type="danger">Danger Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--danger');
  });

  it('renders children without a title', () => {
    render(<Alert>Alert without Title</Alert>);
    expect(screen.getByText('Alert without Title')).toBeInTheDocument();
  });

  it('renders title with default h3 when titleElement is not provided', () => {
    render(<Alert title="Alert Title">Alert Content</Alert>);
    const title = screen.getByText('Alert Title');
    expect(title.tagName).toBe('H3');
  });

  const headingLevels: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  it.each(headingLevels)('renders title with %s when titleElement is %s', (level) => {
    const text = `Alert with ${level.toUpperCase()}`;
    render(
      <Alert title={text} titleElement={level}>
        Alert Content
      </Alert>
    );
    const title = screen.getByText(text);
    expect(title.tagName).toBe(level.toUpperCase());
  });

  it('renders with small size and applies correct size class', () => {
    render(<Alert size="small">Small Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--size-small');
  });

  it('renders danger alert with small size', () => {
    render(
      <Alert type="danger" size="small">
        Danger Small Alert
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--danger');
    expect(alert).toHaveClass('tedi-alert--size-small');
  });
});
