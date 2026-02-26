import { fireEvent, render, screen } from '@testing-library/react';

import { ClosingButton } from './closing-button';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: jest.fn().mockReturnValue('Close'),
  }),
}));

describe('ClosingButton component', () => {
  it('renders the ClosingButton with default props', () => {
    render(<ClosingButton />);

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tedi-closing-button tedi-closing-button--default tedi-closing-button--color-primary');

    const icon = button.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon--size-24');
  });

  it('renders with the correct small size class and icon size', () => {
    render(<ClosingButton size="small" />);

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toHaveClass('tedi-closing-button tedi-closing-button--small tedi-closing-button--color-primary');
    render(
      <ClosingButton
        onClick={() => {
          console.log('Button pressed');
        }}
      />
    );

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tedi-closing-button');
    expect(button).toHaveClass('tedi-closing-button--small');

    const icon = button.querySelector('span[data-name="icon"]');
    expect(icon).toHaveClass('tedi-icon--size-24');
  });

  it('forces small size when iconSize is 18', () => {
    render(<ClosingButton iconSize={18} />);

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toHaveClass('tedi-closing-button--small');

    const icon = button.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon--size-18');
  });

  it('applies custom class names', () => {
    render(<ClosingButton className="custom-class" />);

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toHaveClass(
      'tedi-closing-button tedi-closing-button--default tedi-closing-button--color-primary custom-class'
    );
    const customButton = screen.getByRole('button', { name: /Close/i });
    expect(customButton).toHaveClass('tedi-closing-button');
    expect(customButton).toHaveClass('tedi-closing-button--default');
    expect(customButton).toHaveClass('custom-class');
  });

  it('triggers onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<ClosingButton onClick={onClickMock} />);

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('uses fallback label from label provider when title is not provided', () => {
    render(<ClosingButton />);

    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toHaveAttribute('title', 'Close');
    expect(button).toHaveAttribute('aria-label', 'Close');
  });

  it('uses custom title if provided', () => {
    render(<ClosingButton title="Custom Close" />);

    const button = screen.getByRole('button', { name: /Custom Close/i });
    expect(button).toHaveAttribute('title', 'Custom Close');
    expect(button).toHaveAttribute('aria-label', 'Custom Close');
  });

  it('applies the correct color classes', () => {
    const colors: Array<'primary' | 'brand' | 'white'> = ['primary', 'brand', 'white'];

    colors.forEach((color) => {
      const { container } = render(<ClosingButton color={color} />);
      const button = container.querySelector('button[data-name="closing-button"]');
      expect(button).toHaveClass(`tedi-closing-button--color-${color}`);
    });
  });
});
