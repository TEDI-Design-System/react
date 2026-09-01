import { fireEvent, render, screen } from '@testing-library/react';

import { useIsTouchDevice } from '../../../helpers';
import ButtonContent, { ButtonContentProps } from './button-content';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useIsTouchDevice: jest.fn(),
}));

describe('ButtonContent component', () => {
  beforeEach(() => {
    // The icon-only tooltip defaults to hover on non-touch devices (see Overlay's isTouchDevice-aware default).
    (useIsTouchDevice as jest.Mock).mockReturnValue(false);
  });

  // eslint-disable-next-line @typescript-eslint/ban-types
  const defaultProps: ButtonContentProps<'button', {}, {}> = {
    children: 'Click Me',
  };

  it('renders button with default styles and children', () => {
    render(<ButtonContent {...defaultProps} />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tedi-btn tedi-btn--primary tedi-btn--default');
  });

  it('applies custom class names', () => {
    render(<ButtonContent {...defaultProps} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with icon only', () => {
    render(<ButtonContent {...defaultProps} icon="check" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-btn__icon tedi-btn__icon--center');
  });

  it('renders with left icon', () => {
    render(<ButtonContent {...defaultProps} iconLeft="left-icon" />);
    const leftIcon = screen.getByRole('img', { hidden: true });
    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon).toHaveClass('tedi-btn__icon tedi-btn__icon--left');
  });

  it('renders with right icon', () => {
    render(<ButtonContent {...defaultProps} iconRight="right-icon" />);
    const rightIcon = screen.getByRole('img', { hidden: true });
    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon).toHaveClass('tedi-btn__icon tedi-btn__icon--right');
  });

  it('renders underline when underline prop is true', () => {
    render(<ButtonContent {...defaultProps} underline />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-btn--underline');
  });

  it('renders in loading state with a decorative spinner and conveys loading via aria-busy', () => {
    render(<ButtonContent {...defaultProps} isLoading />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    const spinner = screen.getByTestId('tedi-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('tedi-btn__spinner');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(button).toHaveAccessibleName('Click Me');
  });

  it('renders with full width when fullWidth is true', () => {
    render(<ButtonContent {...defaultProps} fullWidth />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-btn--full-width');
  });

  it('does not trigger onClick when isLoading is true', () => {
    const handleClick = jest.fn();
    render(<ButtonContent {...defaultProps} onClick={handleClick} isLoading />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('triggers onClick when clicked and not loading', () => {
    const handleClick = jest.fn();
    render(<ButtonContent {...defaultProps} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows tooltip automatically when button is icon-only', async () => {
    render(<ButtonContent icon="search">Search</ButtonContent>);
    const tooltipContent = await screen.findByText('Search');
    expect(tooltipContent).toBeVisible();
  });

  it('uses children text as tooltip content for icon-only button', async () => {
    render(<ButtonContent icon="edit">Edit item</ButtonContent>);
    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);
    const tooltip = await screen.findByText('Edit item');
    expect(tooltip).toBeInTheDocument();
  });

  it('uses children text as tooltip content for icon-only button', async () => {
    render(<ButtonContent icon="edit">Edit item</ButtonContent>);
    const button = screen.getByRole('button');
    fireEvent.pointerEnter(button);
    await screen.findByText('Edit item');
    expect(screen.getByText('Edit item')).toBeVisible();
  });

  it('does not show tooltip when autoTooltip is false', () => {
    render(
      <ButtonContent icon="delete" showTooltip={false}>
        Delete
      </ButtonContent>
    );

    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    expect(document.querySelector('.tedi-overlay__content')).not.toBeInTheDocument();
  });

  it('renders the icon-only tooltip as visual-only so the name is not duplicated', async () => {
    render(
      <ButtonContent icon="delete" showTooltip>
        Delete
      </ButtonContent>
    );
    const button = screen.getByRole('button');
    // Name comes from the visually-hidden label — announced once.
    expect(button).toHaveAccessibleName('Delete');

    fireEvent.mouseEnter(button);
    const content = await screen.findByTestId('overlay-content');
    expect(content).toHaveAttribute('aria-hidden', 'true');
    expect(button).not.toHaveAttribute('aria-describedby');
  });
});
