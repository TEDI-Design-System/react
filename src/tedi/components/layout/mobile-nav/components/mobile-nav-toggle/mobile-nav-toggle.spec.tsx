import { fireEvent, render, screen } from '@testing-library/react';

import { UnknownType } from '../../../../../../tedi/types/commonTypes';
import MobileNavToggle from './mobile-nav-toggle';

jest.mock('../../../../../../tedi/providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: jest.fn((key: string) => {
      if (key === 'header.toggle') return 'Toggle Menu';
      return '';
    }),
  }),
}));

describe('MobileNavToggle', () => {
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
    render(<MobileNavToggle {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(defaultProps.toggleMenu).not.toHaveBeenCalled();
  });

  test('calls toggleMenu when clicked', () => {
    render(<MobileNavToggle {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('renders toggle label', () => {
    render(<MobileNavToggle {...defaultProps} />);
    expect(screen.getByText('Toggle Menu')).toBeInTheDocument();
  });

  test('toggles on Enter key press', () => {
    render(<MobileNavToggle {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('toggles on Space key press', () => {
    render(<MobileNavToggle {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('does not toggle on other keys', () => {
    render(<MobileNavToggle {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(defaultProps.toggleMenu).not.toHaveBeenCalled();
  });

  test('toggles menuOpen from false to true on click', () => {
    render(<MobileNavToggle {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(true);
  });

  test('toggles menuOpen from true to false on click', () => {
    render(<MobileNavToggle {...defaultProps} menuOpen />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.toggleMenu).toHaveBeenCalledWith(false);
  });

  test('renders correct variant styles', () => {
    const { rerender } = render(<MobileNavToggle {...defaultProps} variant="collapse" menuOpen={true} />);

    let button = screen.getByRole('button');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();

    rerender(<MobileNavToggle {...defaultProps} variant="mobile" menuOpen={true} />);
    button = screen.getByRole('button');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();
  });

  test('applies referenceRef correctly', () => {
    const ref = jest.fn();
    render(<MobileNavToggle {...defaultProps} referenceRef={ref as UnknownType} />);

    expect(ref).toHaveBeenCalled();
  });

  test('uses getReferenceProps', () => {
    const mockGetRefProps = jest.fn(() => ({ 'data-testid': 'custom-prop' }));
    render(<MobileNavToggle {...defaultProps} getReferenceProps={mockGetRefProps} />);

    expect(mockGetRefProps).toHaveBeenCalled();
    expect(screen.getByTestId('custom-prop')).toBeInTheDocument();
  });

  test('applies open class when menuOpen is true', () => {
    render(<MobileNavToggle {...defaultProps} menuOpen />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('tedi-mobile-nav-toggle--open');
  });

  test('overrides the i18n label when a string `label` prop is passed', () => {
    render(<MobileNavToggle {...defaultProps} showLabel label="Menüü" />);
    const button = screen.getByRole('button', { name: 'Menüü' });
    expect(button.querySelector('.tedi-mobile-nav-toggle__label')).toHaveTextContent('Menüü');
  });

  test('label as a function receives menuOpen and returns the current label', () => {
    const { rerender } = render(
      <MobileNavToggle {...defaultProps} showLabel label={(open) => (open ? 'Sulge' : 'Ava')} />
    );
    expect(screen.getByRole('button').querySelector('.tedi-mobile-nav-toggle__label')).toHaveTextContent('Ava');
    rerender(<MobileNavToggle {...defaultProps} menuOpen showLabel label={(open) => (open ? 'Sulge' : 'Ava')} />);
    expect(screen.getByRole('button').querySelector('.tedi-mobile-nav-toggle__label')).toHaveTextContent('Sulge');
  });

  test('renders visible label below the icon when showLabel is true (mobile variant)', () => {
    render(<MobileNavToggle {...defaultProps} showLabel />);
    const button = screen.getByRole('button', { name: 'Toggle Menu' });
    expect(button).toHaveClass('tedi-mobile-nav-toggle--with-label');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    const label = button.querySelector('.tedi-mobile-nav-toggle__label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Toggle Menu');
  });

  test('ignores showLabel when variant is collapse', () => {
    render(<MobileNavToggle {...defaultProps} variant="collapse" showLabel />);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('tedi-mobile-nav-toggle--with-label');
  });

  test('applies custom className prop', () => {
    const customClass = 'my-special-toggle extra-class';

    render(<MobileNavToggle {...defaultProps} className={customClass} />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('my-special-toggle');
    expect(button).toHaveClass('extra-class');

    expect(button).toHaveClass('tedi-mobile-nav-toggle');
    expect(button).toHaveClass('tedi-mobile-nav-toggle--mobile');
    expect(button).not.toHaveClass('tedi-mobile-nav-toggle--open');
  });

  test('renders without crashing when `getReferenceProps` is not supplied (uses default)', () => {
    const toggleMenu = jest.fn();
    render(<MobileNavToggle menuOpen={false} toggleMenu={toggleMenu} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls toggleMenu when the labelled-layout button is clicked', () => {
    const toggleMenu = jest.fn();
    render(<MobileNavToggle {...defaultProps} toggleMenu={toggleMenu} showLabel />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleMenu).toHaveBeenCalledWith(true);
  });

  test('labelled-layout button toggles on Space and Enter', () => {
    const toggleMenu = jest.fn();
    render(<MobileNavToggle {...defaultProps} toggleMenu={toggleMenu} showLabel />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(toggleMenu).toHaveBeenCalledTimes(2);
    expect(toggleMenu).toHaveBeenNthCalledWith(1, true);
    expect(toggleMenu).toHaveBeenNthCalledWith(2, true);
  });

  test('renders the open icon on the labelled-layout button when menuOpen is true', () => {
    render(<MobileNavToggle {...defaultProps} menuOpen showLabel />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-mobile-nav-toggle--with-label');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();
  });

  test('renders the collapse-variant open icon when menuOpen is true', () => {
    render(<MobileNavToggle {...defaultProps} variant="collapse" menuOpen />);
    expect(screen.getByRole('button')).toHaveClass('tedi-mobile-nav-toggle--collapse');
    expect(screen.getByRole('button')).toHaveClass('tedi-mobile-nav-toggle--open');
  });
});
