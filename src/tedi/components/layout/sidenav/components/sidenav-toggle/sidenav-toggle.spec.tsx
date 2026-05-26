import { fireEvent, render, screen } from '@testing-library/react';

import { UnknownType } from '../../../../../../tedi/types/commonTypes';
import SidenavToggle from './sidenav-toggle';

jest.mock('../../../../../../tedi/providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: jest.fn((key: string) => {
      if (key === 'header.toggle') return 'Toggle Menu';
      return '';
    }),
  }),
}));

describe('SidenavToggle', () => {
  const defaultProps = {
    menuOpen: false,
    toggleMenu: jest.fn(),
    referenceRef: undefined,
    getReferenceProps: () => ({}),
    variant: 'mobile' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(<SidenavToggle {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(defaultProps.toggleMenu).not.toHaveBeenCalled();
  });

  test('calls toggleMenu when clicked', () => {
    render(<SidenavToggle {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('renders toggle label', () => {
    render(<SidenavToggle {...defaultProps} />);
    expect(screen.getByText('Toggle Menu')).toBeInTheDocument();
  });

  test('toggles on Enter key press', () => {
    render(<SidenavToggle {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('toggles on Space key press', () => {
    render(<SidenavToggle {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('does not toggle on other keys', () => {
    render(<SidenavToggle {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(defaultProps.toggleMenu).not.toHaveBeenCalled();
  });

  test('toggles menuOpen from false to true on click', () => {
    render(<SidenavToggle {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('toggles menuOpen from true to false on click', () => {
    render(<SidenavToggle {...defaultProps} menuOpen />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(false);
  });

  test('renders correct variant styles', () => {
    const { rerender } = render(<SidenavToggle {...defaultProps} variant="collapse" menuOpen={true} />);

    let button = screen.getByRole('button');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();

    rerender(<SidenavToggle {...defaultProps} variant="mobile" menuOpen={true} />);
    button = screen.getByRole('button');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();
  });

  test('applies referenceRef correctly', () => {
    const ref = jest.fn();
    render(<SidenavToggle {...defaultProps} referenceRef={ref as UnknownType} />);

    expect(ref).toHaveBeenCalled();
  });

  test('uses getReferenceProps', () => {
    const mockGetRefProps = jest.fn(() => ({ 'data-testid': 'custom-prop' }));
    render(<SidenavToggle {...defaultProps} getReferenceProps={mockGetRefProps} />);

    expect(mockGetRefProps).toHaveBeenCalled();
    expect(screen.getByTestId('custom-prop')).toBeInTheDocument();
  });

  test('applies open class when menuOpen is true', () => {
    render(<SidenavToggle {...defaultProps} menuOpen />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('tedi-sidenav-toggle--open');
  });

  test('overrides the i18n label when a string `label` prop is passed', () => {
    render(<SidenavToggle {...defaultProps} showLabel label="Menüü" />);
    const button = screen.getByRole('button', { name: 'Menüü' });
    expect(button.querySelector('.tedi-sidenav-toggle__label')).toHaveTextContent('Menüü');
  });

  test('label as a function receives menuOpen and returns the current label', () => {
    const { rerender } = render(
      <SidenavToggle {...defaultProps} showLabel label={(open) => (open ? 'Sulge' : 'Ava')} />
    );
    expect(screen.getByRole('button').querySelector('.tedi-sidenav-toggle__label')).toHaveTextContent('Ava');
    rerender(<SidenavToggle {...defaultProps} menuOpen showLabel label={(open) => (open ? 'Sulge' : 'Ava')} />);
    expect(screen.getByRole('button').querySelector('.tedi-sidenav-toggle__label')).toHaveTextContent('Sulge');
  });

  test('renders visible label below the icon when showLabel is true (mobile variant)', () => {
    render(<SidenavToggle {...defaultProps} showLabel />);
    const button = screen.getByRole('button', { name: 'Toggle Menu' });
    expect(button).toHaveClass('tedi-sidenav-toggle--with-label');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    // The label text is visible (not screen-reader-only) — it lives in a dedicated label span.
    const label = button.querySelector('.tedi-sidenav-toggle__label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Toggle Menu');
  });

  test('ignores showLabel when variant is collapse', () => {
    render(<SidenavToggle {...defaultProps} variant="collapse" showLabel />);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('tedi-sidenav-toggle--with-label');
  });

  test('applies custom className prop', () => {
    const customClass = 'my-special-toggle extra-class';

    render(<SidenavToggle {...defaultProps} className={customClass} />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('my-special-toggle');
    expect(button).toHaveClass('extra-class');

    expect(button).toHaveClass('tedi-sidenav-toggle');
    expect(button).toHaveClass('tedi-sidenav-toggle--mobile');
    expect(button).not.toHaveClass('tedi-sidenav-toggle--open');
  });
});
