// src/components/overlays/dropdown/dropdown-separator/dropdown-separator.spec.tsx

import { render, screen } from '@testing-library/react';

import { DropdownSeparator } from './dropdown-separator';

jest.mock('../../../misc/separator/separator', () => ({
  __esModule: true,
  default: jest.fn(({ axis, className, ...props }) => (
    <hr data-testid="separator" data-axis={axis} className={className} {...props} />
  )),
}));

describe('DropdownSeparator', () => {
  it('renders without crashing', () => {
    render(<DropdownSeparator />);
    expect(screen.getByTestId('separator')).toBeInTheDocument();
  });

  it('renders a horizontal separator', () => {
    render(<DropdownSeparator />);
    const sep = screen.getByTestId('separator');
    expect(sep.tagName).toBe('HR');
    expect(sep).toHaveAttribute('data-axis', 'horizontal');
  });

  it('renders a semantic separator (hr)', () => {
    render(<DropdownSeparator />);

    const separator = screen.getByTestId('separator');
    expect(separator.tagName).toBe('HR');
  });
});
