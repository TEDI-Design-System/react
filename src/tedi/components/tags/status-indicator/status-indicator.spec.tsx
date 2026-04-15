import { render } from '@testing-library/react';

import { StatusIndicator } from './status-indicator';

describe('StatusIndicator', () => {
  it('renders with default props', () => {
    const { container } = render(<StatusIndicator />);
    const indicator = container.querySelector('[data-name="status-indicator"]');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with danger type', () => {
    const { container } = render(<StatusIndicator type="danger" />);
    const indicator = container.querySelector('[data-name="status-indicator"]');
    expect(indicator).toHaveClass('tedi-status-indicator--danger');
  });

  it('renders with large size', () => {
    const { container } = render(<StatusIndicator size="lg" />);
    const indicator = container.querySelector('[data-name="status-indicator"]');
    expect(indicator).toHaveClass('tedi-status-indicator--lg');
  });

  it('renders with border', () => {
    const { container } = render(<StatusIndicator hasBorder />);
    const indicator = container.querySelector('[data-name="status-indicator"]');
    expect(indicator).toHaveClass('tedi-status-indicator--bordered');
  });

  it('applies custom className', () => {
    const { container } = render(<StatusIndicator className="custom" />);
    const indicator = container.querySelector('[data-name="status-indicator"]');
    expect(indicator).toHaveClass('custom');
  });
});
