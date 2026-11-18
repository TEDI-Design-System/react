import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Alert } from './alert';

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
    const { container } = render(<Alert>Default Alert</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Default Alert');
    expect(container.firstChild).toHaveClass('tedi-alert tedi-alert--info');
  });

  it('renders a custom class name', () => {
    const { container } = render(<Alert className="custom-class">Custom Class Alert</Alert>);

    expect(container.firstChild).toHaveClass('tedi-alert custom-class');
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

  it('applies global styles when isGlobal is true', () => {
    const { container } = render(<Alert isGlobal>Global Alert</Alert>);

    expect(container.firstChild).toHaveClass('tedi-alert--global');
  });

  it('removes side borders when noSideBorders is true', () => {
    const { container } = render(<Alert noSideBorders>Alert without Side Borders</Alert>);

    expect(container.firstChild).toHaveClass('tedi-alert--no-side-borders');
  });

  it('renders a close button when onClose is provided', () => {
    const onCloseMock = jest.fn();
    render(<Alert onClose={onCloseMock}>Closable Alert</Alert>);

    const closeButton = screen.getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('describes the close button with the title', () => {
    render(
      <Alert title="Salvestatud" onClose={jest.fn()}>
        Content
      </Alert>
    );

    expect(screen.getByRole('button', { name: 'close' })).toHaveAccessibleDescription('Salvestatud');
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

  it.each(['alert', 'status'] as const)('sets role %s without a redundant aria-live', (role) => {
    render(<Alert role={role}>Message</Alert>);

    const region = screen.getByRole(role);
    expect(region).toHaveTextContent('Message');
    expect(region).not.toHaveAttribute('aria-live');
    expect(document.querySelector('[aria-live]')).toBeNull();
  });

  it('does not set a hardcoded aria-label', () => {
    const { container } = render(<Alert type="warning">Message</Alert>);

    expect(container.querySelector('[aria-label]')).toBeNull();
    expect(screen.getByRole('alert')).not.toHaveAccessibleName();
  });

  it('leaves the live region unnamed and announces title and message', () => {
    render(<Alert title="Salvestamine ebaõnnestus">Proovi uuesti.</Alert>);

    const region = screen.getByRole('alert');
    expect(region).not.toHaveAccessibleName();
    expect(region).toHaveTextContent('Salvestamine ebaõnnestusProovi uuesti.');
  });

  it('keeps the close button outside the live region', () => {
    render(
      <Alert title="Title" icon="info" onClose={jest.fn()}>
        Message
      </Alert>
    );

    const region = screen.getByRole('alert');
    expect(region).toHaveTextContent('TitleMessage');
    expect(region.querySelector('button')).toBeNull();
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
  });

  it('keeps the action outside the live region, after the message', () => {
    render(<Alert action={<button type="button">Open profile</button>}>Message</Alert>);

    const region = screen.getByRole('alert');
    const action = screen.getByRole('button', { name: 'Open profile' });
    expect(region).not.toContainElement(action);
    expect(region.compareDocumentPosition(action) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders with danger type and applies correct class', () => {
    const { container } = render(<Alert type="danger">Danger Alert</Alert>);

    expect(container.firstChild).toHaveClass('tedi-alert--danger');
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
    const { container } = render(<Alert size="small">Small Alert</Alert>);

    expect(container.firstChild).toHaveClass('tedi-alert--size-small');
  });

  it('renders danger alert with small size', () => {
    const { container } = render(
      <Alert type="danger" size="small">
        Danger Small Alert
      </Alert>
    );

    expect(container.firstChild).toHaveClass('tedi-alert--danger');
    expect(container.firstChild).toHaveClass('tedi-alert--size-small');
  });
});
