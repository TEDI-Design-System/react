// src/components/overlays/dropdown/dropdown-separator/dropdown-separator.spec.tsx

import { render, screen } from '@testing-library/react';

import Separator from '../../../misc/separator/separator';
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
    // The real Separator, not the mock, which always renders an hr.
    const actual = jest.requireActual('../../../misc/separator/separator');
    (Separator as unknown as jest.Mock).mockImplementationOnce(actual.default);
    render(<DropdownSeparator />);

    const separator = screen.getByRole('separator');
    expect(separator.tagName).toBe('HR');
    expect(separator).not.toHaveAttribute('data-testid');
  });

  it('passes className to the separator', () => {
    render(<DropdownSeparator className="custom-separator" />);
    expect(screen.getByRole('separator')).toHaveClass('custom-separator');
  });
});
