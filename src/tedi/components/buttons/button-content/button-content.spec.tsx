import { fireEvent, render, screen } from '@testing-library/react';

import { useIsTouchDevice } from '../../../helpers';
import { AccessibilityContext } from '../../../providers/accessibility-provider/accessibility-provider';
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

  it('renders in loading state with a decorative spinner, an unchanged name and a loading description', () => {
    const { rerender } = render(<ButtonContent {...defaultProps} aria-describedby="hint" isLoading />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('aria-busy');
    const spinner = screen.getByTestId('tedi-spinner');
    expect(spinner).toHaveClass('tedi-btn__spinner');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(button).toHaveAccessibleName('Click Me');
    expect(button.getAttribute('aria-describedby')).toMatch(/^hint \S+$/);

    rerender(<ButtonContent {...defaultProps} aria-describedby="hint" />);
    expect(button).toHaveAttribute('aria-describedby', 'hint');
  });

  it('announces a switch into loading assertively, only on the focused button', () => {
    const addLoader = jest.fn();
    const removeLoader = jest.fn();
    const renderButton = (isLoading: boolean) => (
      <AccessibilityContext.Provider value={{ addLoader, removeLoader }}>
        <ButtonContent {...defaultProps} isLoading={isLoading} />
      </AccessibilityContext.Provider>
    );

    const { rerender } = render(renderButton(true));
    rerender(renderButton(false));
    rerender(renderButton(true));
    expect(addLoader).not.toHaveBeenCalled();

    rerender(renderButton(false));
    screen.getByRole('button').focus();
    rerender(renderButton(true));
    expect(addLoader).toHaveBeenCalledWith(
      expect.objectContaining({ mountLabel: 'button.loading', politeness: 'assertive' })
    );

    rerender(renderButton(false));
    expect(removeLoader).toHaveBeenCalledWith(addLoader.mock.calls[0][0].id);
  });

  it('uses loadingLabel for the description and the announcement', () => {
    const addLoader = jest.fn();
    const renderButton = (isLoading: boolean) => (
      <AccessibilityContext.Provider value={{ addLoader, removeLoader: jest.fn() }}>
        <ButtonContent {...defaultProps} loadingLabel="Saving" isLoading={isLoading} />
      </AccessibilityContext.Provider>
    );

    const { rerender } = render(renderButton(false));
    screen.getByRole('button').focus();
    rerender(renderButton(true));

    expect(screen.getByRole('button')).toHaveAccessibleDescription('Saving');
    expect(addLoader).toHaveBeenCalledWith(expect.objectContaining({ mountLabel: 'Saving' }));
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

  it('does not submit its form while loading', () => {
    const handleSubmit = jest.fn((event: React.FormEvent) => event.preventDefault());
    const { rerender } = render(
      <form onSubmit={handleSubmit}>
        <ButtonContent {...defaultProps} type="submit" isLoading />
      </form>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).not.toHaveBeenCalled();

    rerender(
      <form onSubmit={handleSubmit}>
        <ButtonContent {...defaultProps} type="submit" />
      </form>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('prevents link navigation while loading', () => {
    render(
      <ButtonContent {...defaultProps} as="a" href="/next" isLoading>
        Next
      </ButtonContent>
    );
    const link = screen.getByText('Next').closest('a') as HTMLAnchorElement;
    expect(fireEvent.click(link)).toBe(false);
  });

  it('blocks middle-clicks only while loading', () => {
    const handleAuxClick = jest.fn();
    const renderLink = (isLoading: boolean) => (
      <ButtonContent {...defaultProps} as="a" href="/next" isLoading={isLoading} onAuxClick={handleAuxClick}>
        Next
      </ButtonContent>
    );
    const { rerender } = render(renderLink(true));
    const link = screen.getByText('Next').closest('a') as HTMLAnchorElement;

    expect(fireEvent(link, new MouseEvent('auxclick', { bubbles: true, cancelable: true }))).toBe(false);
    expect(handleAuxClick).not.toHaveBeenCalled();

    rerender(renderLink(false));
    expect(fireEvent(link, new MouseEvent('auxclick', { bubbles: true, cancelable: true }))).toBe(true);
    expect(handleAuxClick).toHaveBeenCalledTimes(1);
  });

  it('keeps the button focusable while loading', () => {
    render(<ButtonContent {...defaultProps} isLoading />);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toBeDisabled();
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
